package com.gs2.pipeline.service.impl;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.domain.Tag;
import com.gs2.pipeline.dto.IdeaDto;
import com.gs2.pipeline.repository.IdeaRepository;
import com.gs2.pipeline.repository.TagRepository;
import com.gs2.pipeline.repository.VoteRepository;
import com.gs2.pipeline.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class IdeaServiceImpl implements IdeaService {

    private final IdeaRepository ideaRepository;
    private final TagRepository tagRepository;
    private final VoteRepository voteRepository;

    @Autowired
    public IdeaServiceImpl(IdeaRepository ideaRepository,
                           TagRepository tagRepository,
                           VoteRepository voteRepository) {
        this.ideaRepository = ideaRepository;
        this.tagRepository = tagRepository;
        this.voteRepository = voteRepository;
    }

    @Override
    public List<IdeaDto> getIdeas() {
        return ideaRepository
                .findAll()
                .stream()
                .map((idea) -> idea.toDto(voteRepository.countByIdea(idea)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy) {

        Set<Tag> tags = getTagsFromStrings(ideaDto.getTags());

        Idea existing = null;

        if(ideaDto.getId() != null) {
            existing = ideaRepository.findOne(ideaDto.getId());
        }

        return existing != null ? update(existing, ideaDto, upsertedBy, tags) : insert(ideaDto, upsertedBy, tags);
    }

    private Set<Tag> getTagsFromStrings(Set<String> tagNames) {

        Set<Tag> tags = new HashSet<>(tagNames.size());

        for(String tagName : tagNames) {
            Tag tag = tagRepository.findByNameIgnoreCase(tagName);

            if(tag == null) {
                tag = new Tag();
                tag.setName(tagName);
                tag.setUses(1L);

                tagRepository.save(tag);
            }

            tags.add(tag);
        }

        return tags;
    }

    private IdeaDto insert(IdeaDto ideaDto, Account insertedBy, Set<Tag> tags) {

        Idea idea = ideaDto.toDao(tags, insertedBy);

        Date currentTime = new Date();
        idea.setSubmittedAt(currentTime);
        idea.setUpdatedAt(currentTime);
        idea.setStage("Incubation");

        return ideaRepository.save(idea).toDto(0L);
    }

    private IdeaDto update(Idea existing, IdeaDto ideaDto, Account updatedBy, Set<Tag> tags) {

        //TODO Implement
        return ideaDto;
    }
}
