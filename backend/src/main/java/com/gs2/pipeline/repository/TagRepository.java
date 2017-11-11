package com.gs2.pipeline.repository;

import com.gs2.pipeline.domain.Tag;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findByNameIgnoreCase(String name);
    List<Tag> findFirst20ByUsesGreaterThan(Long uses, Sort sort);
}
