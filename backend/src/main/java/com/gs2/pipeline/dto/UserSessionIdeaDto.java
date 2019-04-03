package com.gs2.pipeline.dto;

import java.util.List;

import com.gs2.pipeline.domain.Idea;

public class UserSessionIdeaDto {
	Boolean liked;
	Boolean anonymousComment;
    List<AttachmentDto> filesToAdd;
    List<AttachmentDto> filesToRemove;
	
	public UserSessionIdeaDto() {
		this.liked=false;
		this.anonymousComment = false;
	}

	public UserSessionIdeaDto(Idea idea) {
		this();
		
	}

	public Boolean getLiked() {
		return liked;
	}

	public void setLiked(Boolean liked) {
		this.liked = liked;
	}

	public Boolean getAnonymousComment() {
		return anonymousComment;
	}

	public void setAnonymousComment(Boolean anonymousComment) {
		this.anonymousComment = anonymousComment;
	}

	public List<AttachmentDto> getFilesToAdd() {
		return filesToAdd;
	}

	public void setFilesToAdd(List<AttachmentDto> filesToAdd) {
		this.filesToAdd = filesToAdd;
	}

	public List<AttachmentDto> getFilesToRemove() {
		return filesToRemove;
	}

	public void setFilesToRemove(List<AttachmentDto> filesToRemove) {
		this.filesToRemove = filesToRemove;
	}

	
	
}
