package com.gs2.pipeline.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "file")
public class File {

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
    
    @Column(name = "store_url", length = 500, unique = false)
    private String storeUrl;
    
    
    @Column(name = "size", unique = false)
    @NotNull
    private Long size;
    
    
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

	public String getStoreUrl() {
		return storeUrl;
	}

	public void setStoreUrl(String storeUrl) {
		this.storeUrl = storeUrl;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((sha == null) ? 0 : sha.hashCode());
		result = prime * result + ((size == null) ? 0 : size.hashCode());
		result = prime * result + ((storeUrl == null) ? 0 : storeUrl.hashCode());
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
		if (storeUrl == null) {
			if (other.storeUrl != null)
				return false;
		} else if (!storeUrl.equals(other.storeUrl))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "File [id=" + id + ", name=" + name + ", sha=" + sha + ", storeUrl=" + storeUrl + ", size=" + size + "]";
	}



}






