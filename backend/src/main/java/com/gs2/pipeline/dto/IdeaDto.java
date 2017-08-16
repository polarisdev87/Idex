package com.gs2.pipeline.dto;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.domain.Tag;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

public class IdeaDto {

    private String title;
    private String description;
    private String stage;
    private String submittedByFormat = "%s <%s %s>";
    private String submittedBy;
    private Date submittedAt;
    private Date updatedAt;
    private Long expectedCostInCents;
    private Long actualCostInCents;
    private Long expectedTtm;
    private Long actualTtm;
    private Set<String> tags;

    public IdeaDto() {
    }

    public IdeaDto(Idea idea) {
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
        this.tags = idea.getTags().stream().map(Tag::getName).collect(Collectors.toSet());
    }

    private String getSubmittedBy(Idea idea) {
        Account submittedby = idea.getSubmittedBy();
        String firstName = submittedby.getFirstName();
        String lastName = submittedby.getLastName();
        String username = submittedby.getUsername();
        return String.format(submittedByFormat, username, firstName, lastName);
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

    public String getSubmittedByFormat() {
        return submittedByFormat;
    }

    public void setSubmittedByFormat(String submittedByFormat) {
        this.submittedByFormat = submittedByFormat;
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

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
}
