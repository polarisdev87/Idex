package com.gs2.pipeline.domain;

import com.gs2.pipeline.dto.IdeaDto;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "idea")
public class Idea {

	
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idea_seq")
    @SequenceGenerator(name = "idea_seq", sequenceName = "idea_seq", allocationSize = 1)
    private Long id;

    @Column(name = "title", length = 255)
    @NotNull
    @Size(min = 1, max = 255)
    private String title;

    @Column(name = "description")
    @NotNull
    @Size(min = 1, max = 32767)
    private String description;

    @Column(name = "stage", length = 50)
    @NotNull
    @Size(min = 1, max = 50)
    private String stage;

    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = false)
    private Account submittedBy;

    @Column(name = "submitted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Column(name = "expected_cost_in_cents")
    private Long expectedCostInCents;

    @Column(name = "actual_cost_in_cents")
    private Long actualCostInCents;

    @Column(name = "expected_profit_in_cents")
    private Long expectedProfitInCents;

    @Column(name = "actual_profit_in_cents")
    private Long actualProfitInCents;

    @Column(name = "expected_ttm")
    private Long expectedTtm;

    @Column(name = "actual_ttm")
    private Long actualTtm;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "idea_tag",
            joinColumns = {@JoinColumn(name = "idea_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id", referencedColumnName = "id")})
    private Set<Tag> tags;
    
    @OneToMany(mappedBy = "primaryKey.idea")    
    private Set<IdeaFile> ideaFiles = new HashSet<IdeaFile>();
    
    public Set<IdeaFile> getIdeaFiles() {
        return ideaFiles;
    }    
    
    public void setIdeaFiles(Set<IdeaFile> ideaFiles) {
		this.ideaFiles = ideaFiles;
	}

    public void addIdeaFile(IdeaFile ideaFile) {
    	this.ideaFiles.add(ideaFile);
    }

	@ManyToOne
    @JoinColumn(name = "category")
    private Tag category;

    @Column(name = "votes")
    private Long votes;

    @OneToMany(mappedBy = "idea", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Comment> comments;

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

    public Account getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(Account submittedBy) {
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

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public IdeaDto toDto(Boolean liked, Account requester) {
        return new IdeaDto(this,liked,this.isEditable(requester));
    }

    public void setVotes(Long votes) {
        this.votes = votes;
    }

    public Long getVotes() {
        return votes;
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

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

	public Tag getCategory() {
		return category;
	}

	public void setCategory(Tag category) {
		this.category = category;
	}
	
	
	

	/**
	 * requester is allowed to edit Idea
	 * 
	 * @param requester
	 * @return
	 */
	public Boolean isEditable(Account requester) {
		Boolean returnValue = false;
		if (requester!=null) {
			returnValue = requester.equals(this.getSubmittedBy());
			if (!returnValue) {
				returnValue=requester.hasAuthority(AuthorityName.ROLE_ADMIN);
			}
		}
		return returnValue;
	}
    
    
    
}