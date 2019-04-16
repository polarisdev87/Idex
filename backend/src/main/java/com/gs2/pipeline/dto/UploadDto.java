package com.gs2.pipeline.dto;

public class UploadDto {
	
	
	
	
	String md5;
	String storeDestination;
	
	
	public UploadDto() {
	}

	public UploadDto(String md5, String storeDestination) {
		super();
		this.md5 = md5;
		this.storeDestination = storeDestination;
	}
	
	public String getMd5() {
		return md5;
	}
	public void setMd5(String md5) {
		this.md5 = md5;
	}
	public String getStoreDestination() {
		return storeDestination;
	}
	public void setStoreDestination(String storeDestination) {
		this.storeDestination = storeDestination;
	}
	
	

}
