package com.gs2.pipeline.service.impl;

import com.gs2.pipeline.domain.*;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.IdeaNotFoundException;
import com.gs2.pipeline.repository.CommentRepository;
import com.gs2.pipeline.repository.IdeaRepository;
import com.gs2.pipeline.repository.TagRepository;
import com.gs2.pipeline.repository.VoteRepository;
import com.gs2.pipeline.service.IdeaService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class IdeaServiceImpl implements IdeaService {

    private static final String TOP_FILTER = "Top";

    private final IdeaRepository ideaRepository;
    private final TagRepository tagRepository;
    private final VoteRepository voteRepository;
    private final CommentRepository commentRepository;
    
    @Autowired
    public IdeaServiceImpl(IdeaRepository ideaRepository,
                           TagRepository tagRepository,
                           VoteRepository voteRepository,
                           CommentRepository commentRepository) {

        this.ideaRepository = ideaRepository;
        this.tagRepository = tagRepository;
        this.voteRepository = voteRepository;
        this.commentRepository = commentRepository;
    }


    
    private Set<String> getNormalizedTags(Set<String> tags)  {
        Set<String> lowercaseTagNames = new HashSet<>(tags.size());
        for(String tag : tags) {
            lowercaseTagNames.add(tag.toLowerCase());
        }
        return lowercaseTagNames;
    }
    
    
    /**
     * fetch the ideas according to filters defined in getIdeasDto
     * 
     */
    @Override
    public List<IdeaDto> getIdeas(GetIdeasDto getIdeasDto, Account requester) {

        Collection<Idea> ideas;

        Date submittedAtMin = new Date(getIdeasDto.getSubmittedAtMsMin());
        Date submittedAtMax = new Date(getIdeasDto.getSubmittedAtMsMax());

        Set<String> lowercaseTagNames = getNormalizedTags(getIdeasDto.getTags()); 
        
        // It has specified tags in filters
        if(getIdeasDto.getTags() != null && getIdeasDto.getTags().size() != 0) {
        	if (getIdeasDto.getTags().size()==1 || getIdeasDto.getPartialFullSwitch()) {
                if (StringUtils.equalsIgnoreCase(getIdeasDto.getFilter(), TOP_FILTER)) {
                    ideas = ideaRepository.findWithParamsAndTagsOrderByVotes(
                            lowercaseTagNames,
                            submittedAtMin, submittedAtMax,
                            getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                            getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                            getIdeasDto.getImplementationTimeMsMax(),
                            getIdeasDto.getStages());
                } else {
                    ideas = ideaRepository.findWithParamsAndTagsOrderBySubmittedAt(
                            lowercaseTagNames,
                            submittedAtMin, submittedAtMax,
                            getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                            getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                            getIdeasDto.getImplementationTimeMsMax(),
                            getIdeasDto.getStages());
                }
        	} else {  // apply AND to Tags
                if (StringUtils.equalsIgnoreCase(getIdeasDto.getFilter(), TOP_FILTER)) {
                    ideas = ideaRepository.findWithParamsAndFullTagsOrderByVotes(
                            lowercaseTagNames,
                            lowercaseTagNames.size(),
                            submittedAtMin, submittedAtMax,
                            getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                            getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                            getIdeasDto.getImplementationTimeMsMax(),
                            getIdeasDto.getStages());
                } else {
                    ideas = ideaRepository.findWithParamsAndFullTagsOrderBySubmittedAt(
                            lowercaseTagNames,
                            lowercaseTagNames.size(),
                            submittedAtMin, submittedAtMax,
                            getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                            getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                            getIdeasDto.getImplementationTimeMsMax(),
                            getIdeasDto.getStages());
                }
        	}

        } else { // it does not have specified tags in filters

            if (StringUtils.equalsIgnoreCase(getIdeasDto.getFilter(), TOP_FILTER)) {
                ideas = ideaRepository.findWithParamsOrderByVotes(
                        submittedAtMin, submittedAtMax,
                        getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                        getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                        getIdeasDto.getImplementationTimeMsMax(),
                        getIdeasDto.getStages());
            } else {
                ideas = ideaRepository.findWithParamsOrderBySubmittedAt(
                        submittedAtMin, submittedAtMax,
                        getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                        getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                        getIdeasDto.getImplementationTimeMsMax(),
                        getIdeasDto.getStages());
            }
        }

        return ideas.stream().map(
        		idea -> 
        		idea.toDto(
        				getVote((Idea) idea,requester )!=null,
        				requester))
        .collect(Collectors.toList());

    }

    /**
     * fetch summary of ideas according to filters defined in getIdeasDto for specified reports
     * TODO: It does not need to use the repository methods OrderByVotes but does not have side effects to use it
     */
    @Override
    public List<IdeaDto> getIdeasSummary(GetIdeasDto getIdeasDto) {

        Collection<Idea> ideas;

        Date submittedAtMin = new Date(getIdeasDto.getSubmittedAtMsMin());
        Date submittedAtMax = new Date(getIdeasDto.getSubmittedAtMsMax());
        
        Set<String> lowercaseTagNames = getNormalizedTags(getIdeasDto.getTags()); 

        // It has specified tags in filters
        if(getIdeasDto.getTags() != null && getIdeasDto.getTags().size() != 0) {
        	if (getIdeasDto.getTags().size()==1 || getIdeasDto.getPartialFullSwitch()) {
                    ideas = ideaRepository.findWithParamsAndTagsOrderByVotes(
                            lowercaseTagNames,
                            submittedAtMin, submittedAtMax,
                            getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                            getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                            getIdeasDto.getImplementationTimeMsMax(),
                            getIdeasDto.getStages());
        	} else {  // apply AND to Tags
                    ideas = ideaRepository.findWithParamsAndFullTagsOrderByVotes(
                            lowercaseTagNames,
                            lowercaseTagNames.size(),
                            submittedAtMin, submittedAtMax,
                            getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                            getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                            getIdeasDto.getImplementationTimeMsMax(),
                            getIdeasDto.getStages());
        	}

        } else { // it does not have specified tags in filters

                ideas = ideaRepository.findWithParamsOrderByVotes(
                        submittedAtMin, submittedAtMax,
                        getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
                        getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
                        getIdeasDto.getImplementationTimeMsMax(),
                        getIdeasDto.getStages());
        }

        return ideas
                .stream()
                .map(idea -> idea.toDto(null,null))
                .collect(Collectors.toList());
    }



    /**
     * Insert or updates an idea
     * To update the idea the user should be authorized
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy) {

        Set<Tag> tags = upsertInitialTagsFromStrings(ideaDto.getTags());

        Idea existing = null;

        if(ideaDto.getId() != null) {
            existing = ideaRepository.findOne(ideaDto.getId());
        }
        
        if (existing != null) {
        	if (existing.isEditable(upsertedBy)) {
            	return update(existing, ideaDto, upsertedBy, tags);
        	} else {
        		// Not authorized user
        		return null;
        	}
        } else {
        	return insert(ideaDto, upsertedBy, tags);
        }
    }


    
    
    private Vote getVote(Idea idea, Account submittedBy) {
        return voteRepository.findByIdeaAndSubmittedBy(idea, submittedBy);
    }
    
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public IdeaDto vote(VoteDto voteDto, Account submittedBy) throws IdeaNotFoundException {

        Idea idea = getIdeaFromVoteDto(voteDto);

        Vote existing = getVote(idea, submittedBy);

        if(existing == null) {
            saveNewVote(submittedBy, idea);
            idea.setVotes(idea.getVotes() + 1L);
        } else {
            voteRepository.delete(existing);
            idea.setVotes(idea.getVotes() - 1L);
        }

        ideaRepository.save(idea);
        boolean VotedAfterChange = existing == null;

        return idea.toDto(VotedAfterChange, submittedBy);
    }

    @Override
    public List<TagDto> getPopularTags() {

        Sort sort = new Sort(Sort.Direction.DESC, "uses");
        List<Tag> tags = tagRepository.findFirst20ByUsesGreaterThan(0L, sort);

        List<TagDto> tagDtos = new ArrayList<>(tags.size());

        for(Tag tag : tags) {
            tagDtos.add(new TagDto(tag));
        }

        return tagDtos;
    }


    /**
     * Add a comment to an idea
     * 
     * Returns exception if idea id does not exist
     * 
     * On success. returns the idea in IdeaDto format with the added comment
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public IdeaDto comment(CommentDto commentDto, Account requester) throws IdeaNotFoundException {

        if(commentDto == null || commentDto.getIdeaId() == null || commentDto.getIdeaId() <= 0) {
            throw new IdeaNotFoundException("Unable to comment because no Idea id specified.");
        }

        Idea idea = ideaRepository.findOne(commentDto.getIdeaId());

        if(idea == null) {
            throw new IdeaNotFoundException("Unable to find idea with id: " + commentDto.getIdeaId());
        }

        Comment comment = new Comment(commentDto.getText(), commentDto.getAnonymous(),  idea, requester);

        commentRepository.save(comment);

        idea.getComments().add(comment);

        
        return idea.toDto(getVote(idea,requester)!=null,requester);
    }


    private void saveNewVote(Account submittedBy, Idea idea) {
        Vote vote = new Vote();

        vote.setIdea(idea);
        vote.setSubmittedBy(submittedBy);
        vote.setSubmittedAt(new Date());

        voteRepository.save(vote);
    }


    private Idea getIdeaFromVoteDto(VoteDto voteDto) throws IdeaNotFoundException {

        if(voteDto == null || voteDto.getIdeaId() == null || voteDto.getIdeaId() <= 0) {
            throw new IdeaNotFoundException("Unable to vote because not Idea id specified.");
        }

        Idea idea = ideaRepository.findOne(voteDto.getIdeaId());

        if(idea == null) {
            throw new IdeaNotFoundException("Unable to find idea with id: " + voteDto.getIdeaId());
        }

        return idea;
    }


    private Set<Tag> upsertInitialTagsFromStrings(List<String> tagNames) {

        Set<Tag> tags = new HashSet<>(tagNames.size());

        for(String tagName : tagNames) {

            Tag tag = tagRepository.findByNameIgnoreCase(tagName);

            if(tag == null) {
                tag = createTagWithName(tagName);
            }

            tags.add(tag);
        }

        return tags;
    }


    private Tag createTagWithName(String tagName) {

        Tag tag = new Tag();

        tag.setName(tagName);
        tag.setUses(0L);
        tagRepository.save(tag);

        return tag;
    }


    /**
     * Adds a new idea
     * @param ideaDto
     * @param insertedBy
     * @param tags
     * @return
     */
    
    private IdeaDto insert(IdeaDto ideaDto, Account insertedBy, Set<Tag> tags) {

        for(Tag tag : tags) {
            tag.setUses(tag.getUses() + 1);
        }
        tagRepository.save(tags);
        Tag category = null;
        if (ideaDto.getCategory()!=null) {
        	category =tagRepository.findByNameIgnoreCase(ideaDto.getCategory()); 
        }

        Idea idea = ideaDto.toDao(tags, category, insertedBy);

        Date currentTime = new Date();
        idea.setSubmittedAt(currentTime);
        idea.setUpdatedAt(currentTime);
        idea.setStage("Incubation");
        idea.setVotes(0L);
        idea.setComments(new HashSet<>());

        return ideaRepository.save(idea).toDto(false,insertedBy);
    }

    
    private IdeaDto update(Idea existing, IdeaDto updatedIdeaDto, Account updatedBy, Set<Tag> tags) {

        updateTags(existing.getTags(), tags);
        
        Tag category = null;
        if (updatedIdeaDto.getCategory()!=null) {
        	category =tagRepository.findByNameIgnoreCase(updatedIdeaDto.getCategory()); 
        }        

        existing.setTitle(updatedIdeaDto.getTitle());
        existing.setDescription(updatedIdeaDto.getDescription());
        existing.setCategory(category);
        
        // Only admins can change stage
        for(Authority authority : updatedBy.getAuthorities()) {
            if(authority.getName().equals(AuthorityName.ROLE_ADMIN)) {
                existing.setStage(updatedIdeaDto.getStage());
            }
        }

        existing.setTags(tags);

        existing.setExpectedCostInCents(updatedIdeaDto.getExpectedCostInCents());
//         existing.setActualCostInCents(updatedIdeaDto.getActualCostInCents());

        existing.setExpectedProfitInCents(updatedIdeaDto.getExpectedProfitInCents());
//        existing.setActualProfitInCents(updatedIdeaDto.getActualProfitInCents());

        existing.setExpectedTtm(updatedIdeaDto.getExpectedTtm());
//         existing.setActualTtm(updatedIdeaDto.getActualTtm());

        existing.setUpdatedAt(new Date());

        ideaRepository.save(existing);

        // Don't let votes change here. That should be done via call to vote endpoint
        updatedIdeaDto.setVotes(existing.getVotes());
        updatedIdeaDto.updateComments(existing);
        updatedIdeaDto.setUserSession(new UserSessionIdeaDto());
        updatedIdeaDto.getUserSession().setLiked(getVote(existing,updatedBy)!=null);
        updatedIdeaDto.getUserSession().setEditable(existing.isEditable(updatedBy));
        return updatedIdeaDto;
    }


    /**
     * This method should only be used when updating an existing idea,
     * not when inserting a new one.
     *
     */
    private void updateTags(Set<Tag> existingTags, Set<Tag> updatedTags) {

        // Add any new tag uses
        Set<Tag> tagsToSave = new HashSet<>();
        for(Tag updatedTag : updatedTags) {
            if(!existingTags.contains(updatedTag)) {
                updatedTag.setUses(updatedTag.getUses() + 1L);
                tagsToSave.add(updatedTag);
            }
        }

        // Remove any existing tag uses that are no longer used
        Set<Tag> tagsToDelete = new HashSet<>();
        for(Tag existingTag : existingTags) {
            if(!updatedTags.contains(existingTag)) {
                existingTag.setUses(existingTag.getUses() - 1L);

                if(existingTag.getUses().equals(0L)) {
                    tagsToDelete.add(existingTag);
                } else {
                    tagsToSave.add(existingTag);
                    tagRepository.save(existingTag);
                }
            }
        }

        tagRepository.delete(tagsToDelete);
        tagRepository.save(tagsToSave);
    }
}
