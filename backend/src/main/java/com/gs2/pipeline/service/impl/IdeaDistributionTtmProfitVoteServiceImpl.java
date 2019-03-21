package com.gs2.pipeline.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gs2.pipeline.dto.GetIdeasDto;
import com.gs2.pipeline.dto.IdeaDistributionTtmProfitVoteDto;
import com.gs2.pipeline.dto.IdeaDto;
import com.gs2.pipeline.service.IdeaDistributionTtmProfitVoteService;
import com.gs2.pipeline.service.IdeaService;

@Service
public class IdeaDistributionTtmProfitVoteServiceImpl implements IdeaDistributionTtmProfitVoteService {

    private final IdeaService ideaService;
    
    @Autowired
    public IdeaDistributionTtmProfitVoteServiceImpl(IdeaService ideaService) {
    	this.ideaService=ideaService;
    }
	
	
	@Override
	public IdeaDistributionTtmProfitVoteDto getIdeasSummaryTTMProfitVotes(GetIdeasDto getIdeasDto) {
        List<IdeaDto> ideas = this.ideaService.getIdeasSummary(getIdeasDto);
        IdeaDistributionTtmProfitVoteDto result = new IdeaDistributionTtmProfitVoteDto(ideas,getIdeasDto);
        return result;
	}

}
