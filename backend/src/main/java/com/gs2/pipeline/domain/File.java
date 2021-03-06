package com.gs2.pipeline.domain;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "file")
public class File {
	
	public File() {
		this.start = new Date();
	}

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "file_seq")
    @SequenceGenerator(name = "file_seq", sequenceName = "file_seq", allocationSize = 1)
    private Long id;


    @Column(name = "name", length = 300, unique = false)
    @NotNull
    private String name;


    @Column(name = "sha", length = 300, unique = false)
    private String sha;
    
    @Column(name = "address", length = 500, unique = false)
    private String address;
    
    
    @Column(name = "size", unique = false)
    @NotNull
    private Long size;
    
    
    /**
     * Initial upload time
     */
    @Column(name = "start", unique = false)
    @NotNull
    private Date start;

    /**
     * Final upload time
     */
    @Column(name = "uploaded_at", unique = false)
    private Date uploadedAt;

    
    /**
     * Cancelled at - null if not cancelled
     */
    @Column(name = "cancelled_at", unique = false)
    private Date cancelledAt;
    
    
    @ManyToOne
    @JoinColumn(name = "submitted_by", nullable = false)
    private Account submittedBy;
    
    
    @Column(name = "original_name", unique = false)
    String originalName;
    
    @Column
    String extension;

    
    @Column
    String contentType;
    
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSha() {
		return sha;
	}

	public void setSha(String sha) {
		this.sha = sha;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String storeUrl) {
		this.address = storeUrl;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}
	
	
	

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}


	public Date getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(Date uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

	public Account getSubmittedBy() {
		return submittedBy;
	}

	public void setSubmittedBy(Account submittedBy) {
		this.submittedBy = submittedBy;
	}
	
	public Date getCancelledAt() {
		return cancelledAt;
	}

	public void setCancelledAt(Date cancelledAt) {
		this.cancelledAt = cancelledAt;
	}
	
	

	public String getOriginalName() {
		return originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}


	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((sha == null) ? 0 : sha.hashCode());
		result = prime * result + ((size == null) ? 0 : size.hashCode());
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		File other = (File) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (sha == null) {
			if (other.sha != null)
				return false;
		} else if (!sha.equals(other.sha))
			return false;
		if (size == null) {
			if (other.size != null)
				return false;
		} else if (!size.equals(other.size))
			return false;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "File [id=" + id + ", name=" + name + ", sha=" + sha + ", address=" + address + ", size=" + size + "]";
	}

	


}






