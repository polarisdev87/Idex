package com.gs2.pipeline.dao;

import java.io.InputStream;
import java.util.Set;

import com.gs2.pipeline.domain.IdeaFile;
import com.gs2.pipeline.dto.UploadDto;

public interface AttachmentDao {
	UploadDto upload(Long ideaId, Long fileId, String originalFileName, InputStream inputStream, String contentType, Long size );

	/**
	 * Remove or suspends the uploading of attachment from s3
	 * @param ideaId
	 * @param persistenceId
	 * @param originalName
	 * @return
	 */
	Boolean remove(Long ideaId, Long persistenceId, String originalName);

	void remove(Set<IdeaFile> ideaFilesToDelete);

	
	InputStream getAttachmentFile(Long id, String originalName);
	InputStream download(Long fileId, String originalFileName);



}
