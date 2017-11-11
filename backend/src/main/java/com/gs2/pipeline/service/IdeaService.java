package com.gs2.pipeline.service;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.IdeaNotFoundException;

import java.util.List;

public interface IdeaService {

    List<IdeaDto> getIdeas(GetIdeasDto getIdeasDto);
    IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy);
    IdeaDto vote(VoteDto voteDto, Account submittedBy) throws IdeaNotFoundException;
    List<TagDto> getPopularTags();
    IdeaDto comment(CommentDto commentDto, Account requester) throws IdeaNotFoundException;
}
