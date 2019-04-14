package com.gs2.pipeline.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.gs2.pipeline.domain.File;
import com.gs2.pipeline.domain.IdeaFile;

public class AttachmentDto {
	
	/**
	 * Id of persistence system . It is the id of the table in persistent database
	 * It is null until is not being saved
	 * It is unique
	 */
	Long persistenceId;
    Date lastModified;
    Date lastModifiedDate;
    String originalName;
    Long size;
    String extension;
    /**
     * public url of the file
     * 
     */
    String url;
    Long ideaId;
    /**
     * initial uploading time
     */
    Date start;
    /**
     * Final successful uploading time
     */
    Date uploadedAt;
    
    /**
     * If cancelled the time at it was cancelled the upload
     */
    Date cancelledAt;
    
    /**
     * client temporal file id
     * This is the initial id When it is received from the client
	 * id unique per session
	 * It is the temporal id frontend assigns when adding the attachment
	 * The form is of the type files-1 files-2 files-n
     */
    String viewId;
    
    String sizeReadeable;
    
    AttachmentPreviewDto preview;
    
    /**
     * ContentType of multipartFile when content is uploaded from web in controller.
     */
    String contentType;
    
    public AttachmentDto() {
    	
    }
    
    public AttachmentDto(IdeaFile ideaFile) {
    	/**
    	 * Id of persistence system . It is the id of the table in persistent database
    	 * It is null until is not being saved
    	 * It is unique
    	 */
    	
    	File file = ideaFile.getFile();
        this.viewId = ideaFile.getViewId();
        this.ideaId=ideaFile.getIdea().getId();
    	this.persistenceId=file.getId();
        this.originalName=file.getOriginalName();
        this.size= file.getSize();
        this.extension= file.getExtension();
        this.url = file.getUrl();
        this.start = file.getStart();
        this.uploadedAt = file.getUploadedAt();
        this.cancelledAt = file.getCancelledAt();
        this.sizeReadeable = file.getSizeReadeable();
        this.preview = new AttachmentPreviewDto(ideaFile.getType(),ideaFile.getUrl());
    }
    
    
    public AttachmentDto(Long persistenceId, Long ideaId, String fileId, String originalName, String contentType, Long size) {
    	this(ideaId,fileId,originalName,contentType, size);
    	this.persistenceId= persistenceId;
    }

    public AttachmentDto(Long ideaId, String viewId, String originalName, String contentType, Long size) {
    	this.ideaId = ideaId;
    	this.viewId = viewId;
    	this.originalName = originalName;
    	this.size=size;
    	this.contentType = contentType;
    }
    
    
    public static Set<AttachmentDto> toDto(Set<IdeaFile> ideaFiles) {
    	Set<AttachmentDto> attachments=new HashSet<AttachmentDto>();
    	for (IdeaFile ideaFile:ideaFiles) {
    		AttachmentDto attachmentDto = new AttachmentDto(ideaFile);
    		attachments.add(attachmentDto);
    	}
    	return attachments;
    }
    
	public Date getLastModified() {
		return lastModified;
	}
	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}
	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public Long getSize() {
		return size;
	}
	public void setSize(Long size) {
		this.size = size;
	}
	public String getExtension() {
		return extension;
	}
	public void setExtension(String extension) {
		this.extension = extension;
	}

	public Long getPersistenceId() {
		return persistenceId;
	}

	public void setPersistenceId(Long id) {
		this.persistenceId = id;
	}
    
	
	
	public String getOriginalName() {
		return originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

	public Long getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(Long ideaId) {
		this.ideaId = ideaId;
	}

	public String getViewId() {
		return viewId;
	}

	public void setViewId(String viewId) {
		this.viewId = viewId;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Date getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(Date uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

	public Date getCancelledAt() {
		return cancelledAt;
	}

	public void setCancelledAt(Date cancelledAt) {
		this.cancelledAt = cancelledAt;
	}

	public String getSizeReadeable() {
		return sizeReadeable;
	}

	public void setSizeReadeable(String sizeReadeable) {
		this.sizeReadeable = sizeReadeable;
	}

	public AttachmentPreviewDto getPreview() {
		return preview;
	}

	public void setPreview(AttachmentPreviewDto preview) {
		this.preview = preview;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	
    
	

}
