package com.gs2.pipeline.repository;


import com.gs2.pipeline.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
