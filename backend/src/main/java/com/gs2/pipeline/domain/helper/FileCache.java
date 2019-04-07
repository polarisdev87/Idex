package com.gs2.pipeline.domain.helper;

import java.util.Date;

/**
 * Information to keep in session about files being uploaded during edition 
 * 
 * @author Jose Alberto Guastavino for idex
 *
 */
public class FileCache {

	Long id;
	Date uploaded;
	
	public FileCache() {
		super();
	}
	
	public FileCache(Long id) {
		this.id=id;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getUploaded() {
		return uploaded;
	}
	public void setUploaded(Date uploaded) {
		this.uploaded = uploaded;
	}
	
	
}
