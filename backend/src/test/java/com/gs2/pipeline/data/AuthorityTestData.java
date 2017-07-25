package com.gs2.pipeline.data;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Authority;
import com.gs2.pipeline.domain.AuthorityName;

import static java.util.Arrays.asList;

public class AuthorityTestData {

    public static Authority anAuthorityWithNameAndAccount(AuthorityName authorityName, Account account) {
        Authority authority = new Authority();

        authority.setId(123L);
        authority.setAccounts(asList(account));
        authority.setName(authorityName);

        return authority;
    }
}
