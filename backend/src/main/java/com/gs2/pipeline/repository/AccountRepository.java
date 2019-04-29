package com.gs2.pipeline.repository;


import com.gs2.pipeline.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByLowerCaseUsername(String username);
    Account findByEmail(String email);
    Account findByResetString(String resetString);
}
