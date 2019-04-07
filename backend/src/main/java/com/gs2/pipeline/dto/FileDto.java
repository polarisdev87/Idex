package com.gs2.pipeline.dto;

import java.util.Date;

public class FileDto {
	
	public FileDto(Long id, Date end) {
		this.id=id;
		this.end=end;
	}
	
	Long id;
	Date end;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getEnd() {
		return end;
	}
	public void setEnd(Date end) {
		this.end = end;
	}
	
	

}
