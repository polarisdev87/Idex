package com.gs2.pipeline.dto;

import java.util.ArrayList;
import java.util.List;

public class TtmProfitVoteDto {
	/*
	 * 	horizontal axis :  Implementation Months - expected ttm
	 *  vertical axis : profit range : expected profit
	 *  size : votes
	 *  color (type) : first tag
	*/

	Long expectedTtm;
	Long expectedProfitInCents;
	Long votes;
	String firstTag;
	/**
	 * idea id
	 */
	Long id; 
	
	List<IdeaDto> ideas;
	
	
	static TtmProfitVoteDto create(IdeaDto ideaDto) {
		TtmProfitVoteDto result = new TtmProfitVoteDto();
		result.expectedTtm = ideaDto.getExpectedTtm();
		result.expectedProfitInCents = ideaDto.getExpectedProfitInCents();
		result.votes = ideaDto.getVotes();
		if (ideaDto.getTags()!=null && ideaDto.getTags().size()>0) {
			result.firstTag = ideaDto.getTags().get(0);
		}
		result.ideas = new ArrayList<IdeaDto>();
		result.ideas.add(ideaDto);
		result.id = ideaDto.getId();
		return result;
	}


	public Long getExpectedTtm() {
		return expectedTtm;
	}


	public void setExpectedTtm(Long expectedTtm) {
		this.expectedTtm = expectedTtm;
	}


	public Long getExpectedProfitInCents() {
		return expectedProfitInCents;
	}


	public void setExpectedProfitInCents(Long expectedProfitInCents) {
		this.expectedProfitInCents = expectedProfitInCents;
	}


	public Long getVotes() {
		return votes;
	}


	public void setVotes(Long votes) {
		this.votes = votes;
	}


	public String getFirstTag() {
		return firstTag;
	}


	public void setFirstTag(String firstTag) {
		this.firstTag = firstTag;
	}


	public List<IdeaDto> getIdeas() {
		return ideas;
	}


	public void setIdeas(List<IdeaDto> ideas) {
		this.ideas = ideas;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	} 
	
	
	
	
}
