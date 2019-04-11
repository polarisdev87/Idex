package com.gs2.pipeline.repository;

import com.gs2.pipeline.domain.File;
import com.gs2.pipeline.domain.IdeaFile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaFileRepository extends JpaRepository<IdeaFile, Long> {
    List<IdeaFile> findByPrimaryKeyFile(File file);
}
