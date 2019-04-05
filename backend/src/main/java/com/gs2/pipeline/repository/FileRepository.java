package com.gs2.pipeline.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gs2.pipeline.domain.File;


public interface FileRepository extends JpaRepository<File, Long> {

}
