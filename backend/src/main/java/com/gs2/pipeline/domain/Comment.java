package com.gs2.pipeline.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gs2.pipeline.dto.CommentDto;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_seq")
    @SequenceGenerator(name = "comment_seq", sequenceName = "comment_seq", allocationSize = 1)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "idea")
    private Idea idea;

    @Column(name = "name", length = 16383, unique = true)
    @NotNull
    private String text;

    @Column(name = "submitted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = false)
    private Account submittedBy;

    public Comment() {
    }

    public Comment(String text, Idea idea, Account submittedBy) {

        this.idea = idea;
        this.submittedBy = submittedBy;
        this.submittedAt = new Date();
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Idea getIdea() {
        return idea;
    }

    public void setIdea(Idea idea) {
        this.idea = idea;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Date submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Account getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(Account submittedBy) {
        this.submittedBy = submittedBy;
    }
}