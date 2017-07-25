package com.gs2.pipeline.config.security.jwt;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(JwtUserDetailsServiceImpl.class);
    private final AccountRepository accountRepository;

    @Autowired
    public JwtUserDetailsServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Account account = accountRepository.findByLowerCaseUsername(username.toLowerCase());

        if (account == null) {
            logger.info(String.format("No account found with username '%s'.", username));

            throw new UsernameNotFoundException(String.format("No account found with username '%s'.", username));
        } else {
            return JwtUserFactory.create(account);
        }
    }
}