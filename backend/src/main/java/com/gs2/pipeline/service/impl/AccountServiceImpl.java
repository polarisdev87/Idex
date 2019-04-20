package com.gs2.pipeline.service.impl;

import com.gs2.pipeline.dao.MailDao;
import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Authority;
import com.gs2.pipeline.domain.AuthorityName;
import com.gs2.pipeline.dto.AccountCreationDto;
import com.gs2.pipeline.dto.AccountDto;
import com.gs2.pipeline.dto.AccountUpdateDto;
import com.gs2.pipeline.dto.ForgotPasswordDto;
import com.gs2.pipeline.dto.ResetPasswordDto;
import com.gs2.pipeline.exception.AccountNotFoundException;
import com.gs2.pipeline.exception.DuplicateUsernameException;
import com.gs2.pipeline.exception.UnauthorizedException;
import com.gs2.pipeline.repository.AccountRepository;
import com.gs2.pipeline.repository.AuthorityRepository;
import com.gs2.pipeline.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountServiceImpl implements AccountService {

	
	private static String MAIL_FROM;
	
	
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final AuthorityRepository authorityRepository;
	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private final MailDao mailDao;

    @Autowired
    public AccountServiceImpl(PasswordEncoder passwordEncoder,
                              AccountRepository accountRepository,
                              AuthorityRepository authorityRepository,
                              MailDao mailDao) {

        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
        this.authorityRepository = authorityRepository;
        this.mailDao = mailDao;
    }

    @Override
    public Account findById(Long id) {

        return accountRepository.findOne(id);
    }
    
    
    
    
    @Value("${pipeline.ses.mail.from}")
    private void setMailFrom(String mailFrom) {
    	MAIL_FROM = mailFrom;
    }    

    @Override
    public Account findByUsername(String username) {

        return accountRepository.findByLowerCaseUsername(username.toLowerCase());
    }

    @Override
    public Account createAccount(AccountCreationDto accountCreationDto, List<AuthorityName> authorityNames) throws DuplicateUsernameException {

        Account existingAccount = accountRepository.findByLowerCaseUsername(accountCreationDto.getUsername().toLowerCase());
        if(existingAccount != null) {
            throw new DuplicateUsernameException("Username already in use.");
        }

        Account account = new Account();

        account.setEmail(accountCreationDto.getEmail());
        account.setEnabled(true);
        account.setFirstName(accountCreationDto.getFirstName());
        account.setLastName(accountCreationDto.getLastName());
        account.setLastPasswordResetDate(new Date());
        account.setUsername(accountCreationDto.getUsername());
        account.setPassword(passwordEncoder.encode(accountCreationDto.getPassword()));

        Set<Authority> authorities = new HashSet<>(authorityNames.size());
        for(AuthorityName authorityName : authorityNames) {
            authorities.add(authorityRepository.findByName(authorityName));
        }

        account.setAuthorities(authorities);

        return accountRepository.save(account);
    }

    @Override
    public List<AccountDto> findAll() {

        List<Account> accounts = accountRepository.findAll();

        List<AccountDto> dtos = new ArrayList<>(accounts.size());
        for(Account account : accounts) {
            dtos.add(new AccountDto(account));
        }

        return dtos;
    }

    @Override
    public Account update(AccountUpdateDto accountUpdateDto, Account updateRequester)
            throws AccountNotFoundException, UnauthorizedException, DuplicateUsernameException {

        if(!updateRequester.hasAuthority(AuthorityName.ROLE_ADMIN) && !updateRequester.hasAuthority(AuthorityName.ROLE_USER_MANAGER)) {
            throw new UnauthorizedException("Only admins and user managers can update accounts.");
        }

        Account existingAccountWithUsername = accountRepository.findByLowerCaseUsername(accountUpdateDto.getUsername().toLowerCase());
        if(existingAccountWithUsername != null && !existingAccountWithUsername.getId().equals(accountUpdateDto.getId())) {
            throw new DuplicateUsernameException("Username in use");
        }

        Account accountUpdating = accountRepository.findOne(accountUpdateDto.getId());
        if(accountUpdating == null) {
            throw new AccountNotFoundException("Could not find account with id {" + accountUpdateDto.getId() + "}");
        }

        accountUpdating.setUsername(accountUpdateDto.getUsername());
        accountUpdating.setFirstName(accountUpdateDto.getFirstName());
        accountUpdating.setLastName(accountUpdateDto.getLastName());
        accountUpdating.setEmail(accountUpdateDto.getEmail());
        accountUpdating.setEnabled(accountUpdateDto.isEnabled());
        accountUpdating.setAuthorities(getAuthorities(accountUpdateDto, updateRequester, accountUpdating));

        return accountRepository.save(accountUpdating);
    }

    @Override
    public void delete(Set<Long> userIds, Account deletionRequester) throws UnauthorizedException {

        if(!deletionRequester.hasAuthority(AuthorityName.ROLE_ADMIN)) {
            throw new UnauthorizedException("Only admins may delete accounts");
        }

        for(Long userId : userIds) {
            if(!deletionRequester.getId().equals(userId)) {
                accountRepository.delete(userId);
            }
        }
    }

    private Set<Authority> getAuthorities(AccountUpdateDto accountUpdateDto, Account updateRequester, Account accountUpdating)
            throws UnauthorizedException {

        Set<Authority> authorities = new HashSet<>();
        authorities.add(authorityRepository.findByName(AuthorityName.ROLE_USER));

        // Only admins can make others admins... However if the user is already an admin, we don't want to erase that authority.
        if(accountUpdateDto.isAdmin() &&
                ( updateRequester.hasAuthority(AuthorityName.ROLE_ADMIN) || accountUpdating.hasAuthority(AuthorityName.ROLE_ADMIN))) {
            authorities.add(authorityRepository.findByName(AuthorityName.ROLE_ADMIN));
        } else if(accountUpdateDto.isAdmin()){
            throw new UnauthorizedException("Only admins can make others admins.");
        }

        if(accountUpdateDto.isUserManager()) {
            authorities.add(authorityRepository.findByName(AuthorityName.ROLE_USER_MANAGER));
        }

         return authorities;
    }


    public static String generateRandomResetCode(int count) {
    	StringBuilder builder = new StringBuilder();
    	while (count-- != 0) {
    		int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
    		builder.append(ALPHA_NUMERIC_STRING.charAt(character));
    	}
    	return builder.toString();
    }
    
    
	@Override
	public ForgotPasswordDto askForResetPasswordCode(ForgotPasswordDto forgotPasswordDto) throws UnauthorizedException {
		Account account = findByUsername(forgotPasswordDto.getUsername());
		if (account != null) {
			if (account.getEmail().equals(forgotPasswordDto.getEmail())) {
				String resetCode = generateRandomResetCode(8).toLowerCase();
				account.setResetCode(resetCode);
				account.setResetCodeDate(new Date());
				this.accountRepository.save(account);
				sendResetPasswordMail(account.getFirstName(), account.getEmail(), resetCode);
				
				

				forgotPasswordDto.setSent(true);
				return forgotPasswordDto;
			}
		}
		throw new UnauthorizedException("email and username don't match");
	}

	private boolean passwordIsValid(String password) {
		return password!=null && password.length()>=4 && password.length()<=100;
	}
	
	@Override
	public ResetPasswordDto resetPassword(ResetPasswordDto resetPasswordDto) throws UnauthorizedException {
		Account account = findByUsername(resetPasswordDto.getUsername());
		if (account != null) {
			if (account.getResetCodeDate()!= null) {
				long startTime = account.getResetCodeDate().getTime();
				long endTime = (new Date()).getTime();
				long diffTime = endTime - startTime;
				long diffDays = diffTime / (1000 * 60 * 60 * 24);				
				if (diffDays <=1) {
					String newPassword = resetPasswordDto.getPassword();
					if (passwordIsValid(newPassword)) {
						if (newPassword.equals(resetPasswordDto.getConfirmPassword())) {
							if (account.getResetCode()!=null) {
								if (account.getResetCode().equals(resetPasswordDto.getCode())) {
									
									
									
									
									
									account.setResetCode("");
									account.setResetCodeDate(null);
							        account.setPassword(passwordEncoder.encode(newPassword));
									this.accountRepository.save(account);
									
									
									
									
									
									resetPasswordDto.setConfirmed(true);
									return resetPasswordDto;
								} else {
									throw new UnauthorizedException("Wrong code. Send the last received reset code");
								}
							} else {
								throw new UnauthorizedException("Internal error on reset code. Please, submit forgot password form");
							}
						} else {
							throw new UnauthorizedException("'Passwords don't match.");
						}
					} else {
						throw new UnauthorizedException("'Password must be between 4-100 characters.");
					}
				} else {
					throw new UnauthorizedException("Please, Submit forgot password form again - reset code too old");
				}
			} else {
				throw new UnauthorizedException("You should first submit forgot password form");
			}
		}
		throw new UnauthorizedException("Invalid credentials");
		
	}

	private void sendResetPasswordMail(String firstName, String email, String code) {
		
		String from = MAIL_FROM;
		
		System.out.println("mail from "+MAIL_FROM);
		String to = email;
		String subject = "IDEX - Reset your password";
		String htmlBody = "";
		String textBody = "Hi "+firstName+":\n"+
				"You recently requested to reset your pipeline password.\n "+
				"This is the code to enter in the reset password form: "+code+"\n"+
				"After insertint the code type your new password.\n"+
				"This code will be active only 24 hours\n";
		
		this.mailDao.sendMail(from, to, subject, htmlBody, textBody);
		
	}
}
