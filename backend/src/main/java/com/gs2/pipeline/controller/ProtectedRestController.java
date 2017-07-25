package com.gs2.pipeline.controller;

import com.gs2.pipeline.config.security.jwt.JwtUser;
import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.AccountUpdateDto;
import com.gs2.pipeline.exception.AccountNotFoundException;
import com.gs2.pipeline.exception.DuplicateUsernameException;
import com.gs2.pipeline.exception.UnauthorizedException;
import com.gs2.pipeline.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@PreAuthorize("hasAnyRole('ADMIN', 'USER_MANAGER')")
@RestController
public class ProtectedRestController {

    private final AccountService accountService;

    @Autowired
    public ProtectedRestController(AccountService accountService) {

        this.accountService = accountService;
    }

    @RequestMapping(value = "/manage/users", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {

        return ResponseEntity.ok(accountService.findAll());
    }

    @RequestMapping(value = "/manage/user", method = RequestMethod.POST)
    public ResponseEntity<?> updateUser(@RequestBody AccountUpdateDto accountUpdateDto)
            throws DuplicateUsernameException, AccountNotFoundException, UnauthorizedException {

        JwtUser userDetails = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account updateRequester = accountService.findById(userDetails.getId());

        accountService.update(accountUpdateDto, updateRequester);
        return ResponseEntity.ok(accountService.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/admin/user", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUsers(@RequestBody Set<Long> userIds) throws UnauthorizedException {

        JwtUser userDetails = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Account deletionRequester = accountService.findById(userDetails.getId());

        accountService.delete(userIds, deletionRequester);

        return getAllUsers();
    }
}
