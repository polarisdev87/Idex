package com.gs2.pipeline.service;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.AttachmentsNotUploadedException;
import com.gs2.pipeline.exception.IdeaNotFoundException;

import java.io.InputStream;
import java.util.List;

public interface IdeaService {

	public static final int MAX_ATTACHMENT_SIZE = 3145728;
	
	
    List<IdeaDto> getIdeas(GetIdeasDto getIdeasDto, Account requester);
    List<IdeaDto> getIdeasSummary(GetIdeasDto getIdeasDto);
    IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy) throws AttachmentsNotUploadedException;
    IdeaDto vote(VoteDto voteDto, Account submittedBy) throws IdeaNotFoundException;
    List<TagDto> getPopularTags();
    IdeaDto comment(CommentDto commentDto, Account requester) throws IdeaNotFoundException, AttachmentsNotUploadedException;
    /**
     * Creates persistent record in database and returns an attachmentDto with the persistenceId
     * @param fileDto
     * @param uploadedBy
     * @return
     */
    AttachmentDto prepareUpload(AttachmentDto fileDto, Account uploadedBy);
	List<AttachmentDto> checkUploadFilesStatus(List<AttachmentDto> files);
	boolean areUploadededFilesReady(List<AttachmentDto> files);
	AttachmentDto uploadContent( AttachmentDto initialAttachment,InputStream inputStream, Account requester);
	FilesToRemoveDto removeUploadingFile(FilesToRemoveDto attachmentDto, Account requester);
	InputStream getAttachment(Long ideaId, Long persistenceId);
	
	/**
	 * Gets content type of the selected file
	 * @param persistenceId
	 * @return
	 */
	String getFileContentType(Long persistenceId);
	
	
	InputStream getAttachmentOnComment(Long ideaId, Long commentId, Long persistenceId, Account requester);
	FilesToRemoveDto removeUploadingFileOnComment(FilesToRemoveDto filesToRemoveDto, Account requester);
	AttachmentDto prepareUploadOnNewComment(AttachmentDto attachmentDto, Account requester);
	AttachmentDto uploadContentOnNewComment(AttachmentDto attachmentDto, InputStream inputStream, Account requester);
}
