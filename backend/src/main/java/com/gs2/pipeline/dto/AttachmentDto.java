package com.gs2.pipeline.dto;

import java.util.Date;

public class AttachmentDto {
	
	
	
	/**
	 * Id of persistence system . It is the id of the table in persistent database
	 * It is null until is not being saved
	 * It is unique
	 */
	Long persistenceId;
    Date lastModified;
    Date lastModifiedDate;
    String originalFileName;
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
	 * The form is of the type file-1 file-2 file-n
     */
    String fileId;
    
    String sizeReadeable;
    
    
    
    public AttachmentDto() {

    }
    
    public AttachmentDto(Long persistenceId, Long ideaId, String fileId, String originalFileName, Long size) {
    	this(ideaId,fileId,originalFileName,size);
    	this.persistenceId= persistenceId;
    }

    public AttachmentDto(Long ideaId, String fileId, String originalFileName, Long size) {
    	this.ideaId = ideaId;
    	this.fileId = fileId;
    	this.originalFileName = originalFileName;
    	this.size=size;
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
    
	
	
	public String getOriginalFileName() {
		return originalFileName;
	}

	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}

	public Long getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(Long ideaId) {
		this.ideaId = ideaId;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
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

	
    
	

}
