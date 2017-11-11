package com.gs2.pipeline.dto;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Comment;
import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.domain.Vote;

public class CommentDto {

    private Long ideaId;
    private String text;
    private String submittedBy;
    private Long submittedAt;

    public CommentDto() {
    }

    public CommentDto(Comment comment, Long ideaId, String submittedBy, Long submittedAt) {

        this.ideaId = ideaId;
        this.text = comment.getText();
        this.submittedBy = submittedBy;
        this.submittedAt = submittedAt;
    }

    public Long getIdeaId() {
        return ideaId;
    }

    public void setIdeaId(Long ideaId) {
        this.ideaId = ideaId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public Long getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Long submittedAt) {
        this.submittedAt = submittedAt;
    }
}
