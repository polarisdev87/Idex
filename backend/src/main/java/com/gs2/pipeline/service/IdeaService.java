package com.gs2.pipeline.service;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.IdeaNotFoundException;

import java.util.List;
import java.util.Map;

public interface IdeaService {

    List<IdeaDto> getIdeas(GetIdeasDto getIdeasDto, Account requester);
    List<IdeaDto> getIdeasSummary(GetIdeasDto getIdeasDto);
    IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy);
    IdeaDto vote(VoteDto voteDto, Account submittedBy) throws IdeaNotFoundException;
    List<TagDto> getPopularTags();
    IdeaDto comment(CommentDto commentDto, Account requester) throws IdeaNotFoundException;
    Long upload(AttachmentDto fileDto, Account uploadedBy);
	List<AttachmentDto> checkUploadFilesStatus(List<AttachmentDto> files, Map<String, Long> mapFilesId);
	boolean areUploadededFilesReady(List<AttachmentDto> files);
}
