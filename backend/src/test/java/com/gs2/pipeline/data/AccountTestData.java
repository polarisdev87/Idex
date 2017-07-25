package com.gs2.pipeline.data;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Authority;
import com.gs2.pipeline.domain.AuthorityName;

import java.util.Date;
import java.util.HashSet;

import static java.util.Arrays.asList;

public class AccountTestData {

    public static Account anAccount(Long id, AuthorityName authorityName) {
        Account account = new Account();
        account.setId(id);
        account.setFirstName(id + "first_name");
        account.setLastName(id + "last_name");
        account.setEnabled(true);
        account.setEmail(id + "@example.com");
        account.setUsername(id + "username");
        account.setLastPasswordResetDate(new Date());
        account.setPassword(id + "password");

        setAuthority(id, account, authorityName);

        return account;
    }

    private static void setAuthority(Long id, Account account, AuthorityName authorityName) {
        Authority authority = new Authority();

        authority.setName(authorityName);
        authority.setAccounts(asList(account));
        authority.setId(id);

        account.setAuthorities(new HashSet<>(asList(authority)));
    }
}
