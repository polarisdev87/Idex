package com.gs2.pipeline.dto;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Comment;
import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.domain.Tag;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class IdeaDto {

    private static final String SUBMITTED_BY_FORMAT = "%s <%s %s>";

    private Long id;
    private String title;
    private String description;
    private String stage;
    private String submittedBy;
    private Date submittedAt;
    private Date updatedAt;
    private Long expectedCostInCents;
    private Long actualCostInCents;
    private Long expectedTtm;
    private Long actualTtm;
    private List<String> tags;
    /**
     * main tag
     */
    private String category;
    private Long votes;
    private Long expectedProfitInCents;
    private Long actualProfitInCents;
    private List<CommentDto> comments;

    public IdeaDto() {

    }

    public IdeaDto(Idea idea) {
        this.id = idea.getId();
        this.title = idea.getTitle();
        this.description = idea.getDescription();
        this.stage = idea.getStage();
        this.submittedBy = getSubmittedBy(idea);
        this.submittedAt = idea.getSubmittedAt();
        this.updatedAt = idea.getUpdatedAt();
        this.expectedCostInCents = idea.getExpectedCostInCents();
        this.actualCostInCents = idea.getActualCostInCents();
        this.expectedTtm = idea.getExpectedTtm();
        this.actualTtm = idea.getActualTtm();
        this.expectedProfitInCents = idea.getExpectedProfitInCents();
        this.actualProfitInCents = idea.getActualProfitInCents();
        // TODO: Make sure an order to make the first tag the first in the list. 
        this.tags = idea.getTags().stream().map(Tag::getName).collect(Collectors.toList());
        this.category = idea.getCategory()!=null ? idea.getCategory().getName():null;
        this.votes = idea.getVotes();
        this.comments = getCommentDtos(idea.getComments(), idea);
    }

    public Idea toDao(Set<Tag> tags, Tag category, Account submittedBy) {
        Idea idea = new Idea();

        idea.setId(id);
        idea.setTitle(title);
        idea.setDescription(description);
        idea.setStage(stage);
        idea.setSubmittedAt(submittedAt);
        idea.setSubmittedBy(submittedBy);
        idea.setUpdatedAt(updatedAt);
        idea.setExpectedCostInCents(expectedCostInCents);
        idea.setActualCostInCents(actualCostInCents);
        idea.setExpectedTtm(expectedTtm);
        idea.setActualTtm(actualTtm);
        idea.setTags(tags);
        idea.setCategory(category);
        idea.setVotes(votes);
        idea.setExpectedProfitInCents(expectedProfitInCents);
        idea.setActualProfitInCents(actualProfitInCents);

        return idea;
    }

    private String getSubmittedBy(Idea idea) {

        Account submittedby = idea.getSubmittedBy();
        String firstName = submittedby.getFirstName();
        String lastName = submittedby.getLastName();
        String username = submittedby.getUsername();
        return String.format(SUBMITTED_BY_FORMAT, username, firstName, lastName);
    }

    
    /**
     * Get formatted 
     * @param comment
     * @return
     */
    private String getSubmittedBy(Account submittedby) {
        String firstName = submittedby.getFirstName();
        String lastName = submittedby.getLastName();
        String username = submittedby.getUsername();
        return String.format(SUBMITTED_BY_FORMAT, username, firstName, lastName);
    }

    
    
    private List<CommentDto> getCommentDtos(Set<Comment> comments, Idea idea) {

        List<CommentDto> commentDtos = new ArrayList<>(comments.size());

        for(Comment comment: comments) {
        	Account authorComment=comment.getSubmittedBy();
            commentDtos.add(
            		new CommentDto(
            				comment, 
            				idea.getId(), 
            				getSubmittedBy(authorComment), 
            				new AccountDto(authorComment,true,comment.getAnonymous()), 
            				comment.getSubmittedAt().getTime()));
        }
        
        Collections.sort(commentDtos);

        return commentDtos;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public Date getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Date submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getExpectedCostInCents() {
        return expectedCostInCents;
    }

    public void setExpectedCostInCents(Long expectedCostInCents) {
        this.expectedCostInCents = expectedCostInCents;
    }

    public Long getActualCostInCents() {
        return actualCostInCents;
    }

    public void setActualCostInCents(Long actualCostInCents) {
        this.actualCostInCents = actualCostInCents;
    }

    public Long getExpectedTtm() {
        return expectedTtm;
    }

    public void setExpectedTtm(Long expectedTtm) {
        this.expectedTtm = expectedTtm;
    }

    public Long getActualTtm() {
        return actualTtm;
    }

    public void setActualTtm(Long actualTtm) {
        this.actualTtm = actualTtm;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVotes() {
        return votes;
    }

    public void setVotes(Long votes) {
        this.votes = votes;
    }

    public Long getExpectedProfitInCents() {
        return expectedProfitInCents;
    }

    public void setExpectedProfitInCents(Long expectedProfitInCents) {
        this.expectedProfitInCents = expectedProfitInCents;
    }

    public Long getActualProfitInCents() {
        return actualProfitInCents;
    }

    public void setActualProfitInCents(Long actualProfitInCents) {
        this.actualProfitInCents = actualProfitInCents;
    }

    public List<CommentDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
    
    
}
