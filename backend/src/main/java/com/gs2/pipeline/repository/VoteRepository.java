package com.gs2.pipeline.repository;


import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Long countByIdea(Idea idea);
}
