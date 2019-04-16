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

import com.gs2.pipeline.dto.AttachmentDto;
import com.gs2.pipeline.dto.IdeaDto;


/**
 * Relation between idea and file
 * each record identifies an upload a user made for a specific idea or comment.
 * 
 * 
 * 
 * @author Jose Guastavino for idex
 *
 */
@Entity
@Table(name = "idea_file")
@AssociationOverrides({
    @AssociationOverride(name = "primaryKey.idea",
        joinColumns = @JoinColumn(name = "idea_id")),
    @AssociationOverride(name = "primaryKey.file",
        joinColumns = @JoinColumn(name = "file_id")) })
public class IdeaFile {

	
	
	@EmbeddedId
	private IdeaFileId primaryKey = new IdeaFileId();

    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = true)
    private Account submittedBy;

    @Column(name = "submitted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

    
    /**
     * Frontend session id : TODO:Analyze to remove from backend model 
     */
    @Column(name = "view_id")
    private String viewId;
    
    
    @Column
    private String type;
    @Column
    private String url;
    
    @Column
    String sizeReadable;
    
	
    public IdeaFileId getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(IdeaFileId primaryKey) {
		this.primaryKey = primaryKey;
	}

	@Transient
	public Idea getIdea() {
		return this.primaryKey.getIdea();
	}
	
	public void setIdea(Idea idea) {
		this.primaryKey.setIdea(idea);
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

	public String getViewId() {
		return viewId;
	}

	public void setViewId(String viewId) {
		this.viewId = viewId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSizeReadable() {
		return sizeReadable;
	}

	public void setSizeReadable(String sizeReadable) {
		this.sizeReadable = sizeReadable;
	}
    

	
	
}
