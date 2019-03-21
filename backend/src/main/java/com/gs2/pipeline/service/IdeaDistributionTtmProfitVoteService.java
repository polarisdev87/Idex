package com.gs2.pipeline.service;

import com.gs2.pipeline.dto.GetIdeasDto;
import com.gs2.pipeline.dto.IdeaDistributionTtmProfitVoteDto;

public interface IdeaDistributionTtmProfitVoteService {
    
    IdeaDistributionTtmProfitVoteDto getIdeasSummaryTTMProfitVotes(GetIdeasDto getIdeasDto);

}
