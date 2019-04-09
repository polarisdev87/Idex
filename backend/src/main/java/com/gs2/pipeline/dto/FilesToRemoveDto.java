package com.gs2.pipeline.dto;

import java.util.List;

public class FilesToRemoveDto {
	Long ideaId;
	List<AttachmentDto> files;
	public Long getIdeaId() {
		return ideaId;
	}
	public void setIdeaId(Long ideaId) {
		this.ideaId = ideaId;
	}
	public List<AttachmentDto> getFiles() {
		return files;
	}
	public void setFiles(List<AttachmentDto> files) {
		this.files = files;
	}
	
	
}
