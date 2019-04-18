package com.gs2.pipeline.dto;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Comment;
import com.gs2.pipeline.domain.CommentFile;
import com.gs2.pipeline.domain.File;
import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.domain.IdeaFile;

public class CommentDto implements Comparable<CommentDto>  {

    private Long ideaId;
    private String text;
    private String submittedBy;
    private Long submittedAt;
    private Boolean anonymous;
    private Boolean authorComment;
    private List<AttachmentDto> files;    
    
    /**
     * submittedBy could be deduced from account
     */
    private AccountDto account;

    public CommentDto() {
    }

    public CommentDto(Comment comment, Long ideaId, String submittedBy, AccountDto account, Long submittedAt, Boolean authorComment, List<AttachmentDto> files) {

        this.ideaId = ideaId;
        this.text = comment.getText();
        this.submittedBy = submittedBy;
        this.submittedAt = submittedAt;
        this.account = account;
        this.anonymous = comment.getAnonymous();
        this.authorComment = authorComment;
        this.files = files;
        
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
	
	
	
	
	public List<AttachmentDto> getFiles() {
		return files;
	}

	public void setFiles(List<AttachmentDto> files) {
		this.files = files;
	}

	@Override
	public int compareTo(CommentDto comment) {
		return this.getSubmittedAt().compareTo(comment.getSubmittedAt());
	}

	public Comment toDao(Idea idea, Account requester, Set<File> files, Map<Long, AttachmentDto> mapAttachments) {

		Comment comment = new Comment(this.getText(), this.getAnonymous(), idea, requester);
        for (File file:files) {
        	CommentFile commentFile = new CommentFile();
        	commentFile.setComment(comment);
        	commentFile.setFile(file);
        	commentFile.setType(mapAttachments.get(file.getId()).getPreview().getType());
        	comment.addCommentFile(commentFile);
        }
		
		// TODO Auto-generated method stub
		return comment;
	}

}
