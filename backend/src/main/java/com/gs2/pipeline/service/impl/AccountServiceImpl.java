package com.gs2.pipeline.service.impl;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Authority;
import com.gs2.pipeline.domain.AuthorityName;
import com.gs2.pipeline.dto.AccountCreationDto;
import com.gs2.pipeline.dto.AccountDto;
import com.gs2.pipeline.dto.AccountUpdateDto;
import com.gs2.pipeline.exception.AccountNotFoundException;
import com.gs2.pipeline.exception.DuplicateUsernameException;
import com.gs2.pipeline.exception.UnauthorizedException;
import com.gs2.pipeline.repository.AccountRepository;
import com.gs2.pipeline.repository.AuthorityRepository;
import com.gs2.pipeline.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountServiceImpl implements AccountService {

    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public AccountServiceImpl(PasswordEncoder passwordEncoder,
                              AccountRepository accountRepository,
                              AuthorityRepository authorityRepository) {

        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
        this.authorityRepository = authorityRepository;
    }

    @Override
    public Account findById(Long id) {

        return accountRepository.findOne(id);
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
}
