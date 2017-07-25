package com.gs2.pipeline.data;

import com.gs2.pipeline.dto.AccountCreationDto;

public class AccountCreationDtoTestData {
    public static AccountCreationDto anAccountCreationDto() {
        AccountCreationDto accountCreationDto = new AccountCreationDto();

        accountCreationDto.setUsername("aUsernameWithMixedCASE");
        accountCreationDto.setConfirmEmail("a@a.com");
        accountCreationDto.setEmail("a@a.com");
        accountCreationDto.setPassword("password");
        accountCreationDto.setConfirmPassword("password");
        accountCreationDto.setFirstName("firstname");
        accountCreationDto.setLastName("lastname");

        return accountCreationDto;
    }
}
