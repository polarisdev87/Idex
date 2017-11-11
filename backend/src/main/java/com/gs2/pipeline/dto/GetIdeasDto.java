package com.gs2.pipeline.dto;

import org.apache.commons.lang3.StringUtils;

import java.util.HashSet;
import java.util.Set;

public class GetIdeasDto {

    private static final Set<String> ALL_STAGES = new HashSet<String>() {{
        add("Incubation");
        add("Prototyping");
        add("Launched");
        add("Cancelled");
    }};

    private String filter;
    private Set<String> stages;
    private Long submittedAtMsMin;
    private Long submittedAtMsMax;
    private Long votesMin;
    private Long votesMax;
    private Long profitMin;
    private Long profitMax;
    private Long implementationTimeMsMin;
    private Long implementationTimeMsMax;
    private Set<String> tags;

    public GetIdeasDto() {

    }

    public GetIdeasDto(String filter, Set<String> stages, Long submittedAtMsMin,
                       Long submittedAtMsMax, Long votesMin, Long votesMax, Long profitMin,
                       Long profitMax, Long implementationTimeMsMin, Long implementationTimeMsMax,
                       Set<String> tags) {

        this.filter = filter;
        this.stages = stages;
        this.submittedAtMsMin = submittedAtMsMin;
        this.submittedAtMsMax = submittedAtMsMax;
        this.votesMin = votesMin;
        this.votesMax = votesMax;
        this.profitMin = profitMin;
        this.profitMax = profitMax;
        this.implementationTimeMsMin = implementationTimeMsMin;
        this.implementationTimeMsMax = implementationTimeMsMax;
        this.tags = tags;
    }

    public String getFilter() {
        return StringUtils.isNotBlank(filter) ? filter : "Top";
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public Set<String> getStages() {
        return stages != null && stages.size() > 0 ? stages : ALL_STAGES;
    }

    public void setStages(Set<String> stages) {
        this.stages = stages;
    }

    public Long getSubmittedAtMsMin() {
        return submittedAtMsMin != null ? submittedAtMsMin : 0;
    }

    public void setSubmittedAtMsMin(Long submittedAtMsMin) {
        this.submittedAtMsMin = submittedAtMsMin;
    }

    public Long getSubmittedAtMsMax() {
        return submittedAtMsMax != null ? submittedAtMsMax : System.currentTimeMillis();
    }

    public void setSubmittedAtMsMax(Long submittedAtMsMax) {
        this.submittedAtMsMax = submittedAtMsMax;
    }

    public Long getVotesMin() {
        return votesMin != null ? votesMin : 0;
    }

    public void setVotesMin(Long votesMin) {
        this.votesMin = votesMin;
    }

    public Long getVotesMax() {
        return votesMax != null ? votesMax : Integer.MAX_VALUE;
    }

    public void setVotesMax(Long votesMax) {
        this.votesMax = votesMax;
    }

    public Long getProfitMin() {
        return profitMin != null ? profitMin : 0;
    }

    public void setProfitMin(Long profitMin) {
        this.profitMin = profitMin;
    }

    public Long getProfitMax() {
        return profitMax != null ? profitMax : Integer.MAX_VALUE;
    }

    public void setProfitMax(Long profitMax) {
        this.profitMax = profitMax;
    }

    public Long getImplementationTimeMsMin() {
        return implementationTimeMsMin != null ? implementationTimeMsMin : 0;
    }

    public void setImplementationTimeMsMin(Long implementationTimeMsMin) {
        this.implementationTimeMsMin = implementationTimeMsMin;
    }

    public Long getImplementationTimeMsMax() {
        return implementationTimeMsMax != null ? implementationTimeMsMax : Integer.MAX_VALUE;
    }

    public void setImplementationTimeMsMax(Long implementationTimeMsMax) {
        this.implementationTimeMsMax = implementationTimeMsMax;
    }

    public Set<String> getTags() {
        return tags == null ? new HashSet<>() : tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
}
