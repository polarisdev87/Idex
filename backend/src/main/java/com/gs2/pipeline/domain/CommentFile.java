package com.gs2.pipeline.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "comment_file")
public class CommentFile {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_file_seq")
    @SequenceGenerator(name = "comment_file_seq", sequenceName = "comment_file_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;
    
    @ManyToOne
    @JoinColumn(name = "file_id")
    private File file;
    
    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = false)
    private Account submittedBy;

    @Column(name = "submitted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
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
