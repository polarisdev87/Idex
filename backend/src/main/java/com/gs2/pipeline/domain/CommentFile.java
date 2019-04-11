package com.gs2.pipeline.domain;

import java.util.Date;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "comment_file")
@AssociationOverrides({
    @AssociationOverride(name = "primaryKey.comment",
        joinColumns = @JoinColumn(name = "comment_id")),
    @AssociationOverride(name = "primaryKey.file",
        joinColumns = @JoinColumn(name = "file_id")) })
public class CommentFile {
	
	@EmbeddedId
	private CommentFileId primaryKey = new CommentFileId();

    
    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = true)
    private Account submittedBy;

    @Column(name = "submitted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

	
    public CommentFileId getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(CommentFileId primaryKey) {
		this.primaryKey = primaryKey;
	}

	@Transient
	public Comment getComment() {
		return primaryKey.getComment();
	}

	public void setComment(Comment comment) {
		this.primaryKey.setComment(comment); 
	}

	@Transient
	public File getFile() {
		return primaryKey.getFile();
	}

	public void setFile(File file) {
		this.primaryKey.setFile(file);
	}


	public Account getSubmittedBy() {
		return submittedBy;
	}

	public void setSubmittedBy(Account submittedBy) {
		this.submittedBy = submittedBy;
	}

	public Date getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(Date submittedAt) {
		this.submittedAt = submittedAt;
	}
    
    
}
