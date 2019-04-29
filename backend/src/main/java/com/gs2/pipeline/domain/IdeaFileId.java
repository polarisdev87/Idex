package com.gs2.pipeline.domain;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class IdeaFileId implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    @ManyToOne
	private Idea idea;
    @ManyToOne
	private File file;

    public Idea getIdea() {
        return idea;
    }

	public void setIdea(Idea idea) {
		this.idea = idea;
	}	

    public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}
}
