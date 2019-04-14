package com.gs2.pipeline.dao;

import java.io.InputStream;

public interface AttachmentDao {
	String upload(Long ideaId, Long fileId, String originalFileName, InputStream inputStream, String contentType, Long size );
}
