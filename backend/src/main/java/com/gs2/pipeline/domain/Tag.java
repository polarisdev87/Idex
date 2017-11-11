package com.gs2.pipeline.domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tag_seq")
    @SequenceGenerator(name = "tag_seq", sequenceName = "tag_seq", allocationSize = 1)
    private Long id;

    @Column(name = "name", length = 50, unique = true)
    @NotNull
    private String name;

    @Column(name = "uses")
    @NotNull
    private Long uses;

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

    public Long getUses() {
        return uses;
    }

    public void setUses(Long uses) {
        this.uses = uses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Tag tag = (Tag) o;

        if (!id.equals(tag.id)) return false;
        if (!name.equals(tag.name)) return false;
        return uses.equals(tag.uses);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + name.hashCode();
        result = 31 * result + uses.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "" + id;
    }
}