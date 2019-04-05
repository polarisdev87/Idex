package com.gs2.pipeline.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * Relation between idea and file
 * each record identifies an upload a user made for a specific idea or comment.
 * On each record comment is null xor idea is null 
 * 
 * 
 * 
 * @author Jose Guastavino for idex
 *
 */
@Entity
@Table(name = "idea_file")
public class IdeaFile {
	
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idea_file_seq")
    @SequenceGenerator(name = "idea_file_seq", sequenceName = "idea_file_seq", allocationSize = 1)
    private Long id;

    /*
    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;
    */
    @ManyToOne
    @JoinColumn(name = "idea_id")
    private Idea idea;
    
    @ManyToOne
    @JoinColumn(name = "file_id")
    private File file;
    
    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = false)
    private Account submittedBy;

    @Column(name = "submitted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;
    
}
