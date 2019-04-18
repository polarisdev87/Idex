package com.gs2.pipeline.service.impl;

import com.gs2.pipeline.dao.AttachmentDao;
import com.gs2.pipeline.domain.*;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.AttachmentsNotUploadedException;
import com.gs2.pipeline.exception.IdeaNotFoundException;
import com.gs2.pipeline.repository.CommentFileRepository;
import com.gs2.pipeline.repository.CommentRepository;
import com.gs2.pipeline.repository.FileRepository;
import com.gs2.pipeline.repository.IdeaFileRepository;
import com.gs2.pipeline.repository.IdeaRepository;
import com.gs2.pipeline.repository.TagRepository;
import com.gs2.pipeline.repository.VoteRepository;
import com.gs2.pipeline.service.IdeaService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.expression.spel.ast.ValueRef.NullValueRef;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class IdeaServiceImpl implements IdeaService {

	private static final String TOP_FILTER = "Top";

	private static final String UPLOADED_FOLDER = "/files/upload/";
	

	private final IdeaRepository ideaRepository;
	private final TagRepository tagRepository;
	private final VoteRepository voteRepository;
	private final CommentRepository commentRepository;
	private final FileRepository fileRepository;
	private final IdeaFileRepository ideaFileRepository;
	private final CommentFileRepository commentFileRepository;
	private final AttachmentDao attachmentDao;
	
	
	@Autowired
	public IdeaServiceImpl(
			IdeaRepository ideaRepository, TagRepository tagRepository, VoteRepository voteRepository,
			CommentRepository commentRepository, FileRepository fileRepository, IdeaFileRepository ideaFileRepository, 
			CommentFileRepository commentFileRepository,
			AttachmentDao attachmentDao) {

		this.ideaRepository = ideaRepository;
		this.tagRepository = tagRepository;
		this.voteRepository = voteRepository;
		this.commentRepository = commentRepository;
		this.fileRepository = fileRepository;
		this.ideaFileRepository = ideaFileRepository;
		this.commentFileRepository = commentFileRepository;
		this.attachmentDao = attachmentDao;
	}

	private Set<String> getNormalizedTags(Set<String> tags) {
		Set<String> lowercaseTagNames = new HashSet<>(tags.size());
		for (String tag : tags) {
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
		if (getIdeasDto.getTags() != null && getIdeasDto.getTags().size() != 0) {
			if (getIdeasDto.getTags().size() == 1 || getIdeasDto.getPartialFullSwitch()) {
				if (StringUtils.equalsIgnoreCase(getIdeasDto.getFilter(), TOP_FILTER)) {
					ideas = ideaRepository.findWithParamsAndTagsOrderByVotes(lowercaseTagNames, submittedAtMin,
							submittedAtMax, getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(),
							getIdeasDto.getProfitMin(), getIdeasDto.getProfitMax(),
							getIdeasDto.getImplementationTimeMsMin(), getIdeasDto.getImplementationTimeMsMax(),
							getIdeasDto.getStages());
				} else {
					ideas = ideaRepository.findWithParamsAndTagsOrderBySubmittedAt(lowercaseTagNames, submittedAtMin,
							submittedAtMax, getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(),
							getIdeasDto.getProfitMin(), getIdeasDto.getProfitMax(),
							getIdeasDto.getImplementationTimeMsMin(), getIdeasDto.getImplementationTimeMsMax(),
							getIdeasDto.getStages());
				}
			} else { // apply AND to Tags
				if (StringUtils.equalsIgnoreCase(getIdeasDto.getFilter(), TOP_FILTER)) {
					ideas = ideaRepository.findWithParamsAndFullTagsOrderByVotes(lowercaseTagNames,
							lowercaseTagNames.size(), submittedAtMin, submittedAtMax, getIdeasDto.getVotesMin(),
							getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(), getIdeasDto.getProfitMax(),
							getIdeasDto.getImplementationTimeMsMin(), getIdeasDto.getImplementationTimeMsMax(),
							getIdeasDto.getStages());
				} else {
					ideas = ideaRepository.findWithParamsAndFullTagsOrderBySubmittedAt(lowercaseTagNames,
							lowercaseTagNames.size(), submittedAtMin, submittedAtMax, getIdeasDto.getVotesMin(),
							getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(), getIdeasDto.getProfitMax(),
							getIdeasDto.getImplementationTimeMsMin(), getIdeasDto.getImplementationTimeMsMax(),
							getIdeasDto.getStages());
				}
			}

		} else { // it does not have specified tags in filters

			if (StringUtils.equalsIgnoreCase(getIdeasDto.getFilter(), TOP_FILTER)) {
				ideas = ideaRepository.findWithParamsOrderByVotes(submittedAtMin, submittedAtMax,
						getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
						getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
						getIdeasDto.getImplementationTimeMsMax(), getIdeasDto.getStages());
			} else {
				ideas = ideaRepository.findWithParamsOrderBySubmittedAt(submittedAtMin, submittedAtMax,
						getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(),
						getIdeasDto.getProfitMax(), getIdeasDto.getImplementationTimeMsMin(),
						getIdeasDto.getImplementationTimeMsMax(), getIdeasDto.getStages());
			}
		}

		return ideas.stream().map(idea -> idea.toDto(getVote((Idea) idea, requester) != null, requester))
				.collect(Collectors.toList());

	}

	/**
	 * fetch summary of ideas according to filters defined in getIdeasDto for
	 * specified reports TODO: It does not need to use the repository methods
	 * OrderByVotes but does not have side effects to use it
	 */
	@Override
	public List<IdeaDto> getIdeasSummary(GetIdeasDto getIdeasDto) {

		Collection<Idea> ideas;

		Date submittedAtMin = new Date(getIdeasDto.getSubmittedAtMsMin());
		Date submittedAtMax = new Date(getIdeasDto.getSubmittedAtMsMax());

		Set<String> lowercaseTagNames = getNormalizedTags(getIdeasDto.getTags());

		// It has specified tags in filters
		if (getIdeasDto.getTags() != null && getIdeasDto.getTags().size() != 0) {
			if (getIdeasDto.getTags().size() == 1 || getIdeasDto.getPartialFullSwitch()) {
				ideas = ideaRepository.findWithParamsAndTagsOrderByVotes(lowercaseTagNames, submittedAtMin,
						submittedAtMax, getIdeasDto.getVotesMin(), getIdeasDto.getVotesMax(),
						getIdeasDto.getProfitMin(), getIdeasDto.getProfitMax(),
						getIdeasDto.getImplementationTimeMsMin(), getIdeasDto.getImplementationTimeMsMax(),
						getIdeasDto.getStages());
			} else { // apply AND to Tags
				ideas = ideaRepository.findWithParamsAndFullTagsOrderByVotes(lowercaseTagNames,
						lowercaseTagNames.size(), submittedAtMin, submittedAtMax, getIdeasDto.getVotesMin(),
						getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(), getIdeasDto.getProfitMax(),
						getIdeasDto.getImplementationTimeMsMin(), getIdeasDto.getImplementationTimeMsMax(),
						getIdeasDto.getStages());
			}

		} else { // it does not have specified tags in filters

			ideas = ideaRepository.findWithParamsOrderByVotes(submittedAtMin, submittedAtMax, getIdeasDto.getVotesMin(),
					getIdeasDto.getVotesMax(), getIdeasDto.getProfitMin(), getIdeasDto.getProfitMax(),
					getIdeasDto.getImplementationTimeMsMin(), getIdeasDto.getImplementationTimeMsMax(),
					getIdeasDto.getStages());
		}

		return ideas.stream().map(idea -> idea.toDto(null, null)).collect(Collectors.toList());
	}

	
	
	private List<AttachmentDto> ensureFilesAreUploaded(List<AttachmentDto> initialFilesDto) throws AttachmentsNotUploadedException {
        List<AttachmentDto> filesDto = initialFilesDto;
        filesDto = checkUploadFilesStatus(filesDto);
        boolean uploadedFilesReady = areUploadededFilesReady(filesDto);
		
		if (!uploadedFilesReady) {
			throw new AttachmentsNotUploadedException("attachments not uploaded:"+filesDto.toString());
		}
		return filesDto;
	}
	
	
	/**
	 * Insert or updates an idea To update the idea the user should be authorized
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public IdeaDto upsert(IdeaDto ideaDto, Account upsertedBy) throws AttachmentsNotUploadedException {

        List<AttachmentDto> filesDto =ensureFilesAreUploaded(ideaDto.getFiles()); 
		
		Set<File> files = upsertInitialFiles(filesDto);
		Map<Long,AttachmentDto> mapViews = new HashMap<Long,AttachmentDto>();
		for (AttachmentDto fileDto:filesDto) {
			mapViews.put(fileDto.getPersistenceId(),fileDto);
		}
		
		Set<Tag> tags = upsertInitialTagsFromStrings(ideaDto.getTags());

		Idea existing = null;

		if (ideaDto.getId() != null) {
			existing = ideaRepository.findOne(ideaDto.getId());
		}

		if (existing != null) {
			if (existing.isEditable(upsertedBy)) {
				return update(existing, ideaDto, upsertedBy, tags, files, mapViews);
			} else {
				// Not authorized user
				return null;
			}
		} else {
			return insert(ideaDto, upsertedBy, tags, files, mapViews);
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

		if (existing == null) {
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

		for (Tag tag : tags) {
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
	 * @throws AttachmentsNotUploadedException 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public IdeaDto comment(CommentDto commentDto, Account requester) throws IdeaNotFoundException, AttachmentsNotUploadedException {

        List<AttachmentDto> filesDto =ensureFilesAreUploaded(commentDto.getFiles()); 
		
		Set<File> files = upsertInitialFiles(filesDto);
		Map<Long,AttachmentDto> mapViews = new HashMap<Long,AttachmentDto>();
		for (AttachmentDto fileDto:filesDto) {
			mapViews.put(fileDto.getPersistenceId(),fileDto);
		}
		
		if (commentDto == null || commentDto.getIdeaId() == null || commentDto.getIdeaId() <= 0) {
			throw new IdeaNotFoundException("Unable to comment because no Idea id specified.");
		}

		Idea idea = ideaRepository.findOne(commentDto.getIdeaId());

		if (idea == null) {
			throw new IdeaNotFoundException("Unable to find idea with id: " + commentDto.getIdeaId());
		}

		
		Comment comment = commentDto.toDao(idea, requester, files, mapViews);

		commentRepository.save(comment);

		idea.getComments().add(comment);

		return idea.toDto(getVote(idea, requester) != null, requester);
	}

	private void saveNewVote(Account submittedBy, Idea idea) {
		Vote vote = new Vote();

		vote.setIdea(idea);
		vote.setSubmittedBy(submittedBy);
		vote.setSubmittedAt(new Date());

		voteRepository.save(vote);
	}

	private Idea getIdeaFromVoteDto(VoteDto voteDto) throws IdeaNotFoundException {

		if (voteDto == null || voteDto.getIdeaId() == null || voteDto.getIdeaId() <= 0) {
			throw new IdeaNotFoundException("Unable to vote because not Idea id specified.");
		}

		Idea idea = ideaRepository.findOne(voteDto.getIdeaId());

		if (idea == null) {
			throw new IdeaNotFoundException("Unable to find idea with id: " + voteDto.getIdeaId());
		}

		return idea;
	}

	
	/**
	 * 
	 * @param filesDto
	 * @return
	 */
	private Set<File> upsertInitialFiles(List<AttachmentDto> filesDto) throws AttachmentsNotUploadedException {
		if (filesDto!=null) {
			Set<File> files = new HashSet<>(filesDto.size());
			for (AttachmentDto fileDto : filesDto) {

				File file = fileRepository.findOne(fileDto.getPersistenceId());

				if (file == null) {
					throw new AttachmentsNotUploadedException("not uploaded file:"+fileDto);
				}
				if (file.getCancelledAt()==null && file.getUploadedAt()!=null) {
					files.add(file);
				}
			}
			return files;
		} else {
			return new HashSet<File>();
		}
	}

	private Set<Tag> upsertInitialTagsFromStrings(List<String> tagNames) {

		Set<Tag> tags = new HashSet<>(tagNames.size());

		for (String tagName : tagNames) {

			Tag tag = tagRepository.findByNameIgnoreCase(tagName);

			if (tag == null) {
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
	 * 
	 * @param ideaDto
	 * @param insertedBy
	 * @param tags
	 * @return
	 */

	private IdeaDto insert(IdeaDto ideaDto, Account insertedBy, Set<Tag> tags, Set <File> files, Map<Long,AttachmentDto> mapViews) {

		for (Tag tag : tags) {
			tag.setUses(tag.getUses() + 1);
		}
		tagRepository.save(tags);
		Tag category = null;
		if (ideaDto.getCategory() != null) {
			category = tagRepository.findByNameIgnoreCase(ideaDto.getCategory());
		}

		Idea idea = ideaDto.toDao(tags, files, category, insertedBy, mapViews);

		Date currentTime = new Date();
		idea.setSubmittedAt(currentTime);
		idea.setUpdatedAt(currentTime);
		idea.setStage("Incubation");
		idea.setVotes(0L);
		idea.setComments(new HashSet<>());
		
		idea = ideaRepository.save(idea);
		
		for (IdeaFile ideaFile:idea.getIdeaFiles() ) {
			ideaFile.setIdea(idea);
			ideaFileRepository.save(ideaFile);
		}
		

		return idea.toDto(false, insertedBy);
	}

	private IdeaDto update(Idea existing, IdeaDto updatedIdeaDto, Account updatedBy, Set<Tag> tags, Set<File> files, Map<Long,AttachmentDto> mapViews) {

		TagsToUpdate tagTasks = updateTags(existing.getTags(), tags);
		tagRepository.save(tagTasks.getTagsToSave());
		
		IdeaFilesToUpdate ideaFileTasks = updateIdeaFiles(existing, existing.getIdeaFiles(),files, mapViews, updatedBy);

		Tag category = null;
		if (updatedIdeaDto.getCategory() != null) {
			category = tagRepository.findByNameIgnoreCase(updatedIdeaDto.getCategory());
		}

		existing.setTitle(updatedIdeaDto.getTitle());
		existing.setDescription(updatedIdeaDto.getDescription());
		existing.setCategory(category);

		// Only admins can change stage
		for (Authority authority : updatedBy.getAuthorities()) {
			if (authority.getName().equals(AuthorityName.ROLE_ADMIN)) {
				existing.setStage(updatedIdeaDto.getStage());
			}
		}

		existing.setTags(tags);
		
		for (IdeaFile ideaFile:ideaFileTasks.getFilesToSave() ) {
			ideaFileRepository.save(ideaFile);
			existing.addIdeaFile(ideaFile);
		}

		existing.setExpectedCostInCents(updatedIdeaDto.getExpectedCostInCents());
//         existing.setActualCostInCents(updatedIdeaDto.getActualCostInCents());

		existing.setExpectedProfitInCents(updatedIdeaDto.getExpectedProfitInCents());
//        existing.setActualProfitInCents(updatedIdeaDto.getActualProfitInCents());

		existing.setExpectedTtm(updatedIdeaDto.getExpectedTtm());
//         existing.setActualTtm(updatedIdeaDto.getActualTtm());

		existing.setUpdatedAt(new Date());
		
		ideaRepository.save(existing);
		tagRepository.delete(tagTasks.getTagsToDelete());

		attachmentDao.remove(ideaFileTasks.getIdeaFilesToDelete());
		ideaFileRepository.delete(ideaFileTasks.getIdeaFilesToDelete());
		fileRepository.delete(ideaFileTasks.getFilesToDelete());
			

		// Don't let votes change here. That should be done via call to vote endpoint
		updatedIdeaDto.setVotes(existing.getVotes());
		updatedIdeaDto.updateComments(existing);
		updatedIdeaDto.setUserSession(new UserSessionIdeaDto());
		updatedIdeaDto.getUserSession().setLiked(getVote(existing, updatedBy) != null);
		updatedIdeaDto.getUserSession().setEditable(existing.isEditable(updatedBy));
		return updatedIdeaDto;
	}

	
	/**
	 * This method should only be used when updating an existing idea, not when
	 * inserting a new one.
	 *
	 */
	private IdeaFilesToUpdate updateIdeaFiles(Idea idea,Set<IdeaFile> existingIdeaFiles, Set<File> updatedFiles, Map<Long,AttachmentDto> mapAttachments, Account requester) {

		// Add any new file uses
		// All files were saved when uploaded
		Set<IdeaFile> filesToSave = new HashSet<IdeaFile>();
		for (File updatedFile : updatedFiles) {
			Optional<IdeaFile> ideaFile = existingIdeaFiles.stream().filter(ideaFileItem -> ideaFileItem.getFile().getId().equals(updatedFile.getId())).findFirst();
			if (!ideaFile.isPresent()) {
				IdeaFile newIdeaFile = new IdeaFile();
				newIdeaFile.setIdea(idea);
				newIdeaFile.setFile(updatedFile);
				newIdeaFile.setViewId(mapAttachments.get(updatedFile.getId()).getViewId());
				newIdeaFile.setSubmittedAt(new Date());
				newIdeaFile.setSubmittedBy(requester);
				newIdeaFile.setType(mapAttachments.get(updatedFile.getId()).getPreview().getType());
				newIdeaFile.setSizeReadable(mapAttachments.get(updatedFile.getId()).getSizeReadable());
				filesToSave.add(newIdeaFile);
			}
		}

		// Remove any existing file uses that are no longer used
		Set<IdeaFile> ideaFilesToDelete = new HashSet<IdeaFile>();
		for (IdeaFile existingIdeaFile : existingIdeaFiles) {
			if (!updatedFiles.contains(existingIdeaFile.getFile())) {
				ideaFilesToDelete.add(existingIdeaFile);
			} else {
				Optional<File> file = 
						updatedFiles.stream().filter(fileElement -> fileElement.getId().equals(existingIdeaFile.getFile().getId())).findFirst();
				if (file.get().getCancelledAt()!=null) {
					ideaFilesToDelete.add(existingIdeaFile);
				}
			}
		}
		Set<File> confirmedFilesToDelete = new HashSet<File>();
		for (IdeaFile existingIdeaFile : ideaFilesToDelete) {
			List<IdeaFile> ideaFiles = this.ideaFileRepository.findByPrimaryKeyFile(existingIdeaFile.getFile());
			List<CommentFile> commentFiles = this.commentFileRepository.findByPrimaryKeyFile(existingIdeaFile.getFile());
			if (ideaFiles.size() <= 1 && commentFiles.size() <= 1) {
				confirmedFilesToDelete.add(existingIdeaFile.getFile());
			}
		}
		
		return new IdeaFilesToUpdate(filesToSave, ideaFilesToDelete, confirmedFilesToDelete);
	}

	
	
	/**
	 * This method should only be used when updating an existing idea, not when
	 * inserting a new one.
	 *
	 */
	private TagsToUpdate updateTags(Set<Tag> existingTags, Set<Tag> updatedTags) {

		// Add any new tag uses
		Set<Tag> tagsToSave = new HashSet<>();
		for (Tag updatedTag : updatedTags) {
			if (!existingTags.contains(updatedTag)) {
				updatedTag.setUses(updatedTag.getUses() + 1L);
				tagsToSave.add(updatedTag);
			}
		}

		// Remove any existing tag uses that are no longer used
		Set<Tag> tagsToDelete = new HashSet<>();
		for (Tag existingTag : existingTags) {
			if (!updatedTags.contains(existingTag)) {
				existingTag.setUses(existingTag.getUses() - 1L);

				if (existingTag.getUses().equals(0L)) {
					tagsToDelete.add(existingTag);
				} else {
					tagsToSave.add(existingTag);
					tagRepository.save(existingTag);
				}
			}
		}

		return new TagsToUpdate(tagsToSave, tagsToDelete);
	}

	private class TagsToUpdate {
		Set<Tag> tagsToSave;
		Set<Tag> tagsToDelete;

		public TagsToUpdate(Set<Tag> tagsToSave, Set<Tag> tagsToDelete) {
			super();
			this.tagsToSave = tagsToSave;
			this.tagsToDelete = tagsToDelete;
		}

		public Set<Tag> getTagsToSave() {
			return tagsToSave;
		}

		public Set<Tag> getTagsToDelete() {
			return tagsToDelete;
		}


	}


	private class IdeaFilesToUpdate {
		Set<IdeaFile> filesToSave;
		Set<IdeaFile> ideaFilesToDelete;
		Set<File> filesToDelete;

		public IdeaFilesToUpdate(Set<IdeaFile> filesToSave, Set<IdeaFile> ideaFilesToDelete, Set<File> filesToDelete) {
			super();
			this.filesToSave = filesToSave;
			this.filesToDelete = filesToDelete;
			this.ideaFilesToDelete = ideaFilesToDelete;
		}

		public Set<IdeaFile> getFilesToSave() {
			return filesToSave;
		}

		public Set<File> getFilesToDelete() {
			return filesToDelete;
		}
		
		public Set<IdeaFile> getIdeaFilesToDelete() {
			return ideaFilesToDelete;
		}

	}
	

	private AttachmentDto prepareUploadBase(AttachmentDto fileDto, Account submittedBy) {
		if (fileDto.getSize()<=IdeaService.MAX_ATTACHMENT_SIZE) {
			File file = new File();
			file.setName(fileDto.getOriginalName());
			file.setOriginalName(fileDto.getOriginalName());
			file.setSize(fileDto.getSize());
			file.setSubmittedBy(submittedBy);
			file.setExtension(fileDto.getExtension());
			File persistedFile = this.fileRepository.save(file);
			fileDto.setPersistenceId(persistedFile.getId());
			return fileDto;
		} else {
			return null;
		}
		
	}
	
	/**
	 *	persist on database upload event and generate File id 
	 */
	@Override
	public AttachmentDto prepareUpload(AttachmentDto fileDto, Account submittedBy) {
		return prepareUploadBase(fileDto, submittedBy);
	}
	
	
	@Override
	public AttachmentDto prepareUploadOnNewComment(AttachmentDto attachmentDto, Account requester) {
		return prepareUploadBase(attachmentDto, requester);
	}
	
	
	private AttachmentDto uploadContentBase(AttachmentDto initialAttachment, InputStream inputStream, Account requester) {
        File file = fileRepository.getOne(initialAttachment.getPersistenceId());
        if (file!=null) {
    		UploadDto uploadDto = this.attachmentDao.upload(initialAttachment.getIdeaId(), 
    				initialAttachment.getPersistenceId(), 
            		initialAttachment.getOriginalName(), 
            		inputStream, 
            		initialAttachment.getContentType(), 
            		initialAttachment.getSize());
            file.setContentType(initialAttachment.getContentType());	
            file.setSha(uploadDto.getMd5());
    		file.setUploadedAt(new Date());
    		file.setAddress(uploadDto.getStoreDestination());
    		file = fileRepository.save(file);
        }
		AttachmentDto result = initialAttachment;
		result.setPersistenceId(file.getId());
		result.setUploadedAt(file.getUploadedAt());
		result.setCancelledAt(file.getCancelledAt());
        return result;
	}
	
	public AttachmentDto uploadContent(AttachmentDto initialAttachment, InputStream inputStream, Account requester) {
		return uploadContentBase(initialAttachment, inputStream, requester);
	}

	@Override
	public AttachmentDto uploadContentOnNewComment(AttachmentDto attachmentDto, InputStream inputStream,
			Account requester) {
		return uploadContentBase(attachmentDto, inputStream, requester);
	}
	
	
	/**
	 * Complete getUploadedAt for all the files to attach
	 */
	@Override
	public List<AttachmentDto> checkUploadFilesStatus(List<AttachmentDto> filesDto) {
		List<AttachmentDto> result = new ArrayList<AttachmentDto>() ;
		if (filesDto!=null) {
			for (AttachmentDto fileDto:filesDto) {
				if (fileDto.getPersistenceId()!=null) {
					File file = fileRepository.findOne(fileDto.getPersistenceId());
					if (file!=null) {
						fileDto.setUploadedAt(file.getUploadedAt());
						fileDto.setCancelledAt(file.getCancelledAt());
					}
				}
			}
			result = filesDto;
		}
		return result;
	}
	
	/**
	 * Check all files has not empty uploadedAt
	 */
	@Override
	public boolean areUploadededFilesReady(List<AttachmentDto> files) {
		boolean allReady=true;
		for (AttachmentDto file:files) {
			allReady = allReady && file.getPersistenceId()!=null;
			allReady = allReady && file.getUploadedAt()!=null && file.getCancelledAt()==null;
		}
		return allReady;
	}

	@Override
	public FilesToRemoveDto removeUploadingFile(FilesToRemoveDto filesToRemoveDto, Account requester) {
		if (filesToRemoveDto.getFiles()!=null) {
			for (AttachmentDto attachmentDto:filesToRemoveDto.getFiles()) {
				attachmentDto.setCancelledAt(null);
				if (attachmentDto.getPersistenceId()!=null) {
					File file = this.fileRepository.getOne(attachmentDto.getPersistenceId());
					if (file!=null) {
						if (requester.equals(file.getSubmittedBy())) {
							file.setCancelledAt(new Date());
							file = this.fileRepository.save(file);
							attachmentDto.setCancelledAt(file.getCancelledAt());

							// Remove file from filesystem also
		            		Boolean removed = this.attachmentDao.remove(filesToRemoveDto.getIdeaId(), 
		            				attachmentDto.getPersistenceId(), 
		            				attachmentDto.getOriginalName());						
						
						}
					}
				}
			}
		}
		return filesToRemoveDto;
	}
	
	
	@Override
	public FilesToRemoveDto removeUploadingFileOnComment(FilesToRemoveDto filesToRemoveDto, Account requester) {
		// TODO Auto-generated method stub
		return null;
	}
	

	
	
	private InputStream getAttachment(Long persistenceId) {
		InputStream is=null;
		File file = this.fileRepository.findOne(persistenceId);
		if (file!=null) {
			is = this.attachmentDao.getAttachmentFile(file.getId(),file.getOriginalName());
		}
		return is;
	}
	
	
	
	/**
	 * ideaId it is interesting as parameter as it is used for user restrictions 
	 */
	@Override
	public InputStream getAttachment(Long ideaId, Long persistenceId) {
		return this.getAttachment(persistenceId);
	}
	
	
	@Override
	public InputStream getAttachmentOnComment(Long ideaId, Long commentId, Long persistenceId, Account requester) {
		return this.getAttachment(persistenceId);
	}
	
	

	@Override
	public String getFileContentType(Long persistenceId) {
		String returnValue=null;
		File file = this.fileRepository.findOne(persistenceId);
		if (file !=null) {
			returnValue = file.getContentType();
		}
		return returnValue;
	}








}
