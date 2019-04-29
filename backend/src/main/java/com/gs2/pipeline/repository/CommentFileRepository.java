package com.gs2.pipeline.repository;

import com.gs2.pipeline.domain.CommentFile;
import com.gs2.pipeline.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentFileRepository extends JpaRepository<CommentFile, Long> {
    List<CommentFile> findByPrimaryKeyFile(File file);
}
