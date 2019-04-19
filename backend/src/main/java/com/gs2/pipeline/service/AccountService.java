package com.gs2.pipeline.service;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.AuthorityName;
import com.gs2.pipeline.dto.AccountCreationDto;
import com.gs2.pipeline.dto.AccountDto;
import com.gs2.pipeline.dto.AccountUpdateDto;
import com.gs2.pipeline.dto.ForgotPasswordDto;
import com.gs2.pipeline.dto.ResetPasswordDto;
import com.gs2.pipeline.exception.AccountNotFoundException;
import com.gs2.pipeline.exception.DuplicateUsernameException;
import com.gs2.pipeline.exception.UnauthorizedException;

import java.util.List;
import java.util.Set;

public interface AccountService {

    Account findById(Long id);
    Account findByUsername(String username);
    Account createAccount(AccountCreationDto accountCreationDto, List<AuthorityName> authorityNames) throws DuplicateUsernameException;
    List<AccountDto> findAll();
    Account update(AccountUpdateDto accountUpdateDto, Account updateRequester) throws AccountNotFoundException, UnauthorizedException, DuplicateUsernameException;
    void delete(Set<Long> userIds, Account deletionRequester) throws UnauthorizedException;
	ForgotPasswordDto forgotPassword(ForgotPasswordDto forgotPasswordDto);
	ResetPasswordDto resetPassword(ResetPasswordDto resetPasswordDto);
}
