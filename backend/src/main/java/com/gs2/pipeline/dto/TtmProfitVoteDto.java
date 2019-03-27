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
	String category;
	String title;
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
			result.category = ideaDto.getCategory();
		}
		result.ideas = new ArrayList<IdeaDto>();
		result.ideas.add(ideaDto);
		result.id = ideaDto.getId();
		result.title = ideaDto.getTitle();
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


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
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


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	} 
	
	
	
	
}
