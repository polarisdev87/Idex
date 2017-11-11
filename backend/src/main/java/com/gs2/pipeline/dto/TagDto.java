package com.gs2.pipeline.dto;

import com.gs2.pipeline.domain.Tag;

public class TagDto {

    private String name;
    private Long uses;

    public TagDto() {
    }

    public TagDto(Tag tag) {
        this.name = tag.getName();
        this.uses = tag.getUses();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUses() {
        return uses;
    }

    public void setUses(Long uses) {
        this.uses = uses;
    }
}
