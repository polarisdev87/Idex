package com.gs2.pipeline.service;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.IdeaDto;

import java.util.List;

public interface IdeaService {

    List<IdeaDto> getIdeas();
    IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy);
}
