package com.gs2.pipeline.service;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.IdeaNotFoundException;

import java.util.List;

public interface IdeaService {

    List<IdeaDto> getIdeas(GetIdeasDto getIdeasDto, Account requester);
    List<IdeaDto> getIdeasSummary(GetIdeasDto getIdeasDto);
    IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy);
    IdeaDto vote(VoteDto voteDto, Account submittedBy) throws IdeaNotFoundException;
    List<TagDto> getPopularTags();
    IdeaDto comment(CommentDto commentDto, Account requester) throws IdeaNotFoundException;
    Long upload(AttachmentDto fileDto, Account uploadedBy);
	List<AttachmentDto> checkUploadFilesStatus(List<AttachmentDto> files);
	boolean areUploadededFilesReady(List<AttachmentDto> files);
	AttachmentDto upload(Long fileId,byte[] bytes, AttachmentDto initialAttachment);
	FilesToRemoveDto removeUploadingFile(FilesToRemoveDto attachmentDto, Account requester);
}
