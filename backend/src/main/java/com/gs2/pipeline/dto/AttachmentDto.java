package com.gs2.pipeline.dto;

import java.util.Date;

public class AttachmentDto {
	
	Long id;
    Date lastModified;
    Date lastModifiedDate;
    String name;
    String originalFileName;
    Long size;
    String type;
    Long ideaId;
    /**
     * client temporal file id
     */
    String fileId;
    
    public AttachmentDto() {

    }
    
    public AttachmentDto(Long ideaId, String fileId,String name, String originalFileName, Long size) {
    	this.ideaId = ideaId;
    	this.fileId = fileId;
    	this.name=name;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getSize() {
		return size;
	}
	public void setSize(Long size) {
		this.size = size;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	/**
	 * Calculated field combining ideaId + fileId to be kept in map session
	 * @return
	 */
	public String getIdeaFileId() {
    	return Long.toString(this.getIdeaId())+":"+this.getFileId();
	}
    

}
