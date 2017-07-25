package com.gs2.pipeline.data;

import com.gs2.pipeline.dto.AccountUpdateDto;

public class AccountUpdateDtoTestData {

    public static AccountUpdateDto anAccountUpdateDto() {
        AccountUpdateDto accountUpdateDto = new AccountUpdateDto();

        accountUpdateDto.setAdmin(false);
        accountUpdateDto.setEmail("a@a.com");
        accountUpdateDto.setFirstName("firstname");
        accountUpdateDto.setLastName("lastname");
        accountUpdateDto.setEnabled(true);
        accountUpdateDto.setId(123L);
        accountUpdateDto.setUserManager(false);
        accountUpdateDto.setUsername("aUsername");

        return accountUpdateDto;
    }
}
