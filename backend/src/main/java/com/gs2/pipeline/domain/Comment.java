package com.gs2.pipeline.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_seq")
    @SequenceGenerator(name = "comment_seq", sequenceName = "comment_seq", allocationSize = 1)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "idea")
    private Idea idea;

    @Column(name = "name", length = 16383, unique = false)
    @NotNull
    private String text;

    @Column(name = "submitted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

    
    @Column(name = "anonymous")
    private Boolean anonymous;
    
    
    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = false)
    private Account submittedBy;

    public Comment() {
    }

    public Comment(String text, Boolean anonymous, Idea idea, Account submittedBy) {

        this.idea = idea;
        this.submittedBy = submittedBy;
        this.submittedAt = new Date();
        this.text = text;
        this.anonymous = anonymous;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Idea getIdea() {
        return idea;
    }

    public void setIdea(Idea idea) {
        this.idea = idea;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Date submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Account getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(Account submittedBy) {
        this.submittedBy = submittedBy;
    }

	public Boolean getAnonymous() {
		return anonymous;
	}

	public void setAnonymous(Boolean anonymous) {
		this.anonymous = anonymous;
	}

    @OneToMany(mappedBy = "primaryKey.comment")    
    private Set<CommentFile> commentFiles = new HashSet<CommentFile>();
    
    public Set<CommentFile> getCommentFiles() {
        return commentFiles;
    }    
    
    public void setCommentFiles(Set<CommentFile> commentFiles) {
		this.commentFiles = commentFiles;
	}

    public void addCommentFile(CommentFile commentFile) {
    	this.commentFiles.add(commentFile);
    }

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((anonymous == null) ? 0 : anonymous.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((idea == null) ? 0 : idea.hashCode());
		result = prime * result + ((submittedAt == null) ? 0 : submittedAt.hashCode());
		result = prime * result + ((submittedBy == null) ? 0 : submittedBy.hashCode());
		result = prime * result + ((text == null) ? 0 : text.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Comment other = (Comment) obj;
		if (anonymous == null) {
			if (other.anonymous != null)
				return false;
		} else if (!anonymous.equals(other.anonymous))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (idea == null) {
			if (other.idea != null)
				return false;
		} else if (!idea.equals(other.idea))
			return false;
		if (submittedAt == null) {
			if (other.submittedAt != null)
				return false;
		} else if (!submittedAt.equals(other.submittedAt))
			return false;
		if (submittedBy == null) {
			if (other.submittedBy != null)
				return false;
		} else if (!submittedBy.equals(other.submittedBy))
			return false;
		if (text == null) {
			if (other.text != null)
				return false;
		} else if (!text.equals(other.text))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", idea=" + idea + ", text=" + text + ", submittedAt=" + submittedAt
				+ ", anonymous=" + anonymous + ", submittedBy=" + submittedBy +  "]";
	}
    
    
    
    
}