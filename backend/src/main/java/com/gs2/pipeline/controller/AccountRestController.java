package com.gs2.pipeline.controller;

import com.gs2.pipeline.config.security.jwt.JwtAuthenticationRequest;
import com.gs2.pipeline.config.security.jwt.JwtAuthenticationResponse;
import com.gs2.pipeline.config.security.jwt.JwtTokenUtil;
import com.gs2.pipeline.config.security.jwt.JwtUser;
import com.gs2.pipeline.domain.AuthorityName;
import com.gs2.pipeline.dto.AccountCreationDto;
import com.gs2.pipeline.dto.ForgotPasswordDto;
import com.gs2.pipeline.dto.ResetPasswordDto;
import com.gs2.pipeline.exception.DuplicateUsernameException;
import com.gs2.pipeline.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import static java.util.Arrays.asList;

@RestController
public class AccountRestController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    private final AccountService accountService;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    public AccountRestController(AuthenticationManager authenticationManager,
                                 JwtTokenUtil jwtTokenUtil,
                                 UserDetailsService userDetailsService,
                                 AccountService accountService) {

        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.accountService = accountService;
    }

    @RequestMapping(value="${account.creation.path}", method = RequestMethod.POST)
    public ResponseEntity<?> createAccount(@Valid @RequestBody AccountCreationDto accountCreationDto, Device device)
            throws DuplicateUsernameException {

        accountService.createAccount(accountCreationDto, asList(AuthorityName.ROLE_USER));


        JwtAuthenticationRequest jwtAuthenticationRequest = new JwtAuthenticationRequest();
        jwtAuthenticationRequest.setUsername(accountCreationDto.getUsername());
        jwtAuthenticationRequest.setPassword(accountCreationDto.getPassword());

        return createAuthenticationToken(jwtAuthenticationRequest, device);
    }

    @RequestMapping(value = "${jwt.route.authentication.path}", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
                                                       Device device) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails, device);

        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "${jwt.route.authentication.refresh}", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {

        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @RequestMapping(value = "${account.forgot.path}", method = RequestMethod.POST)
    
    public ForgotPasswordDto forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) throws AuthenticationException {

    	ForgotPasswordDto result = accountService.forgotPassword(forgotPasswordDto);
    	
        return result;
    }
    
    @RequestMapping(value = "${account.reset.path}", method = RequestMethod.POST)
    public ResetPasswordDto resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) throws AuthenticationException {

    	ResetPasswordDto result = accountService.resetPassword(resetPasswordDto);
    	
        return result;
    }
    
    
    
    		
    		
    		
    		

}
