package com.gs2.pipeline.service.impl;

import com.gs2.pipeline.dao.MailDao;
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
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.gs2.pipeline.data.AccountCreationDtoTestData.anAccountCreationDto;
import static com.gs2.pipeline.data.AccountTestData.anAccount;
import static com.gs2.pipeline.data.AccountUpdateDtoTestData.anAccountUpdateDto;
import static com.gs2.pipeline.data.AuthorityTestData.anAuthorityWithNameAndAccount;
import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class AccountServiceImplTests {

    private AccountServiceImpl accountService;
    private String encryptedPassword;
    private Account userAccount;
    private Account userManagerAccount;
    private Account adminAccount;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private AuthorityRepository authorityRepository;

    @Mock
    private Account mockAccount;

    @Mock
    private MailDao mailDao;
    
    
    @Before
    public void setup() {

        this.accountService = new AccountServiceImpl(passwordEncoder, accountRepository, authorityRepository, mailDao);
        this.encryptedPassword = RandomStringUtils.randomAlphanumeric(20);

        Long id = Math.abs(Long.parseLong(RandomStringUtils.randomNumeric(5)));
        this.userAccount = anAccount(id, AuthorityName.ROLE_USER);
        this.userManagerAccount = anAccount(id + 1L, AuthorityName.ROLE_USER_MANAGER);
        this.adminAccount = anAccount(id + 2L, AuthorityName.ROLE_ADMIN);

        when(passwordEncoder.encode(anyString())).thenReturn(encryptedPassword);

        when(accountRepository.findByLowerCaseUsername(userAccount.getUsername().toLowerCase())).thenReturn(userAccount);
        when(accountRepository.findByLowerCaseUsername(userManagerAccount.getUsername().toLowerCase())).thenReturn(userManagerAccount);
        when(accountRepository.findByLowerCaseUsername(adminAccount.getUsername().toLowerCase())).thenReturn(adminAccount);

        when(accountRepository.findOne(userAccount.getId())).thenReturn(userAccount);
        when(accountRepository.findOne(userManagerAccount.getId())).thenReturn(userManagerAccount);
        when(accountRepository.findOne(adminAccount.getId())).thenReturn(adminAccount);
    }

    @Test
    public void findById_shouldReturnOneAccountIfExistsWithId() {

        assertEquals(adminAccount, accountService.findById(adminAccount.getId()));
        assertEquals(userAccount, accountService.findById(userAccount.getId()));
        assertEquals(userManagerAccount, accountService.findById(userManagerAccount.getId()));
    }

    @Test
    public void findById_shouldReturnNullIfNoAccountExistsWithId() {

        assertNull(accountService.findById(-1L));
    }

    @Test
    public void findByUsername_shouldReturnOneAccountIfExistsWithUsername() {

        assertEquals(adminAccount, accountService.findByUsername(adminAccount.getUsername()));
        assertEquals(userAccount, accountService.findByUsername(userAccount.getUsername()));
        assertEquals(userManagerAccount, accountService.findByUsername(userManagerAccount.getUsername()));
    }

    @Test
    public void findByUsername_shouldReturnNullIfNoAccountExistsWithUsername() {

        assertNull(accountService.findByUsername("NONEXISTANT"));
    }

    @Test(expected = DuplicateUsernameException.class)
    public void createAccount_shouldThrowExceptionIfUsernameExists() throws Exception {

        AccountCreationDto accountCreationDto = anAccountCreationDto();
        when(accountRepository.findByLowerCaseUsername(accountCreationDto.getUsername().toLowerCase())).thenReturn(new Account());

        accountService.createAccount(accountCreationDto, asList(AuthorityName.ROLE_USER));
    }

    @Test
    public void createAccount_shouldEncryptPassword() throws Exception {

        AccountCreationDto accountCreationDto = anAccountCreationDto();

        accountService.createAccount(accountCreationDto, asList(AuthorityName.ROLE_USER));

        verify(passwordEncoder).encode(accountCreationDto.getPassword());
    }

    @Test
    public void createAccount_shouldSetAllValuesFromDto() throws Exception {

        AccountCreationDto accountCreationDto = anAccountCreationDto();
        when(accountRepository.save(any(Account.class))).then(returnsFirstArg());

        Account created = accountService.createAccount(accountCreationDto, asList(AuthorityName.ROLE_USER));

        assertEquals(accountCreationDto.getEmail(), created.getEmail());
        assertEquals(accountCreationDto.getFirstName(), created.getFirstName());
        assertEquals(accountCreationDto.getLastName(), created.getLastName());
        assertEquals(accountCreationDto.getUsername(), created.getUsername());
    }

    @Test
    public void createAccount_shouldSetAllAuthoritiesGiven() throws Exception {

        AccountCreationDto accountCreationDto = anAccountCreationDto();
        when(accountRepository.save(any(Account.class))).then(returnsFirstArg());
        when(authorityRepository.findByName(AuthorityName.ROLE_USER))
                .thenReturn(anAuthorityWithNameAndAccount(AuthorityName.ROLE_USER, anAccount(123L, AuthorityName.ROLE_ADMIN)));
        when(authorityRepository.findByName(AuthorityName.ROLE_USER_MANAGER))
                .thenReturn(anAuthorityWithNameAndAccount(AuthorityName.ROLE_USER_MANAGER, anAccount(123L, AuthorityName.ROLE_ADMIN)));
        when(authorityRepository.findByName(AuthorityName.ROLE_ADMIN))
                .thenReturn(anAuthorityWithNameAndAccount(AuthorityName.ROLE_ADMIN, anAccount(123L, AuthorityName.ROLE_ADMIN)));

        Account created = accountService.createAccount(accountCreationDto,
                asList(AuthorityName.ROLE_USER,
                        AuthorityName.ROLE_USER_MANAGER,
                        AuthorityName.ROLE_ADMIN));

        Set<AuthorityName> authorityNamesSeen = new HashSet<>();
        for(Authority authority : created.getAuthorities()) {
            authorityNamesSeen.add(authority.getName());
        }
        assertEquals(3, authorityNamesSeen.size());
    }

    @Test
    public void findAll_shouldReturnAllAccounts() throws Exception {

        List<Account> expecteds = asList(userAccount, userManagerAccount, adminAccount);
        when(accountRepository.findAll()).thenReturn(expecteds);

        Set<AccountDto> actuals = new HashSet<>(accountService.findAll());

        Set<Long> matchedIds = new HashSet<>();
        for(AccountDto actual : actuals) {
            for(Account expected : expecteds) {
                if(actual.getId().equals(expected.getId())) {
                    matchedIds.add(actual.getId());
                }
            }
        }
        assertEquals(expecteds.size(), matchedIds.size());
    }

    @Test(expected = UnauthorizedException.class)
    public void update_shouldThrowExceptionIfNotAdminOrUserManager() throws Exception {

        accountService.update(new AccountUpdateDto(), userAccount);
    }

    @Test(expected = AccountNotFoundException.class)
    public void update_shouldThrowExceptionIfAccountNotFound() throws Exception {

        accountService.update(anAccountUpdateDto(), adminAccount);
    }

    @Test(expected = DuplicateUsernameException.class)
    public void update_shouldThrowExceptionIfUsernameTakenBySomeoneElse() throws Exception {

        AccountUpdateDto accountUpdateDto = anAccountUpdateDto();
        when(accountRepository.findOne(accountUpdateDto.getId()))
                .thenReturn(anAccount(accountUpdateDto.getId(), AuthorityName.ROLE_USER));
        when(accountRepository.findByLowerCaseUsername(accountUpdateDto.getUsername().toLowerCase()))
                .thenReturn(anAccount(accountUpdateDto.getId() + 1L, AuthorityName.ROLE_USER));

        accountService.update(accountUpdateDto, userManagerAccount);
    }

    @Test
    public void update_shouldNotThrowExceptionIfUsernameTakenByAccountBeingUpdated() throws Exception {

        AccountUpdateDto accountUpdateDto = anAccountUpdateDto();
        Account accountBeingUpdated = anAccount(accountUpdateDto.getId(), AuthorityName.ROLE_USER);
        when(accountRepository.findOne(accountUpdateDto.getId()))
                .thenReturn(accountBeingUpdated);
        when(accountRepository.findByLowerCaseUsername(accountUpdateDto.getUsername().toLowerCase()))
                .thenReturn(accountBeingUpdated);

        accountService.update(accountUpdateDto, userManagerAccount);
    }

    @Test
    public void update_shouldSetAllFieldsFromDtoAndSaveIt() throws Exception {

        AccountUpdateDto accountUpdateDto = anAccountUpdateDto();
        when(accountRepository.findOne(accountUpdateDto.getId()))
                .thenReturn(mockAccount);
        Authority expectedAuthority = anAuthorityWithNameAndAccount(AuthorityName.ROLE_USER, mockAccount);
        when(authorityRepository.findByName(AuthorityName.ROLE_USER)).thenReturn(expectedAuthority);

        accountService.update(accountUpdateDto, userManagerAccount);

        verify(mockAccount).setEmail(accountUpdateDto.getEmail());
        verify(mockAccount).setUsername(accountUpdateDto.getUsername());
        verify(mockAccount).setFirstName(accountUpdateDto.getFirstName());
        verify(mockAccount).setLastName(accountUpdateDto.getLastName());
        verify(mockAccount).setEnabled(accountUpdateDto.isEnabled());
        verify(mockAccount).setAuthorities(new HashSet(asList(expectedAuthority)));
        verify(accountRepository).save(mockAccount);
    }

    @Test(expected = UnauthorizedException.class)
    public void delete_shouldThrowExceptionIfNotAdmin() throws Exception {

        accountService.delete(new HashSet<>(asList(1L, 2L, 3L)), userAccount);
    }

    @Test
    public void delete_shouldNotAllowDeletionOfRequestersAccount() throws Exception {

        accountService.delete(new HashSet<>(asList(adminAccount.getId())), adminAccount);

        verify(accountRepository, never()).delete(adminAccount.getId());
    }

    @Test
    public void delete_shouldCallDeleteForAllValidIdsPassed() throws Exception {

        accountService.delete(new HashSet<>(asList(
                                            adminAccount.getId() + 1L,
                                            adminAccount.getId() + 2L,
                                            adminAccount.getId() + 3L)), adminAccount);

        verify(accountRepository).delete(adminAccount.getId() + 1L);
        verify(accountRepository).delete(adminAccount.getId() + 2L);
        verify(accountRepository).delete(adminAccount.getId() + 3L);
    }

    @Test
    public void delete_shouldStillDeleteOtherIdsIfOnlyOneIsRequestersAccount() throws Exception {

        accountService.delete(new HashSet<>(asList(
                adminAccount.getId(),
                adminAccount.getId() + 1L,
                adminAccount.getId() + 2L,
                adminAccount.getId() + 3L)), adminAccount);

        verify(accountRepository, never()).delete(adminAccount.getId());
        verify(accountRepository).delete(adminAccount.getId() + 1L);
        verify(accountRepository).delete(adminAccount.getId() + 2L);
        verify(accountRepository).delete(adminAccount.getId() + 3L);
    }
}
