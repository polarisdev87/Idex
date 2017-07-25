package com.gs2.pipeline.repository;

import com.gs2.pipeline.domain.Authority;
import com.gs2.pipeline.domain.AuthorityName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(AuthorityName name);
}