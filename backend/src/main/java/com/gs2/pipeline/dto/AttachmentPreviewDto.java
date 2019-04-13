package com.gs2.pipeline.dto;

public class AttachmentPreviewDto {
	
	
	public AttachmentPreviewDto() {
		
	}
	
	public AttachmentPreviewDto(String type, String url) {
		this.type = type;
		this.url = url;
		this.remote = true;
	}
	
	/**
	 * The url of the preview . Before uploading is the blob local file of the form
	 * That blob should not be persisted. But it should be changed to the definitive url 
	 */
	String url;
	/**
	 * The server side url of the preview after uploading
	 * 
	 */
	String type;
	/**
	 * All uploaded images with remote url should be TRUE
	 * it is false only before (or during) uploading
	 */
	Boolean remote;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Boolean getRemote() {
		return remote;
	}
	public void setRemote(Boolean remote) {
		this.remote = remote;
	}
	
	
	
}
