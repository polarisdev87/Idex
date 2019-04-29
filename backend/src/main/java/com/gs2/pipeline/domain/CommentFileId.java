package com.gs2.pipeline.domain;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class CommentFileId implements Serializable  {

	private static final long serialVersionUID = 1L;
    @ManyToOne
	private Comment comment;
    @ManyToOne
	private File file;
	
	

	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}

    public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}
	
	
}




