package com.gs2.pipeline.dto;

import com.gs2.pipeline.domain.Comment;

public class CommentDto implements Comparable<CommentDto>  {

    private Long ideaId;
    private String text;
    private String submittedBy;
    private Long submittedAt;
    private Boolean anonymous;
    private Boolean authorComment;
    
    /**
     * submittedBy could be deduced from account
     */
    private AccountDto account;

    public CommentDto() {
    }

    public CommentDto(Comment comment, Long ideaId, String submittedBy, AccountDto account, Long submittedAt, Boolean authorComment) {

        this.ideaId = ideaId;
        this.text = comment.getText();
        this.submittedBy = submittedBy;
        this.submittedAt = submittedAt;
        this.account = account;
        this.anonymous = comment.getAnonymous();
        this.authorComment = authorComment;
        
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
    
	public AccountDto getAccount() {
		return account;
	}

	public void setAccount(AccountDto account) {
		this.account = account;
	}

	public Boolean getAnonymous() {
		return anonymous;
	}

	public void setAnonymous(Boolean anonymous) {
		this.anonymous = anonymous;
	}

	public Boolean getAuthorComment() {
		return authorComment;
	}

	public void setAuthorComment(Boolean authorComment) {
		this.authorComment = authorComment;
	}
	
	@Override
	public int compareTo(CommentDto comment) {
		return this.getSubmittedAt().compareTo(comment.getSubmittedAt());
	}

}
