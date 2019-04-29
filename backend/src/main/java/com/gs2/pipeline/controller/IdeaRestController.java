package com.gs2.pipeline.controller;

import com.gs2.pipeline.config.security.jwt.JwtUser;
import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.IdeaNotFoundException;
import com.gs2.pipeline.exception.AttachmentsNotUploadedException;
import com.gs2.pipeline.service.AccountService;
import com.gs2.pipeline.service.IdeaDistributionTtmProfitVoteService;
import com.gs2.pipeline.service.IdeaService;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;


@RequestMapping("/ideas")
@RestController
public class IdeaRestController {
	
    private final IdeaService ideaService;
    private final AccountService accountService;
    private final IdeaDistributionTtmProfitVoteService ideaDistributionTtmProfitVoteService;

    /**
     * time in seconds to wait for uploading files after finish editing
     */

    @Autowired
    public IdeaRestController(
    		IdeaService ideaService, 
    		AccountService accountService, 
    		IdeaDistributionTtmProfitVoteService ideaDistributionTtmProfitVoteService) {
        this.ideaService = ideaService;
        this.accountService = accountService;
        this.ideaDistributionTtmProfitVoteService = ideaDistributionTtmProfitVoteService;
    }

    private Account getRequester() {
        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());
        return requester;
    }
    
    
    // TODO Paginate
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<IdeaDto> getIdeas(@RequestParam(value = "filter", required = false) String filter,
                                  @RequestParam(value = "stages", required = false) Set<String> stages,
                                  @RequestParam(value = "submittedAtMsMin", required = false) Long submittedAtMsMin,
                                  @RequestParam(value = "submittedAtMsMax", required = false) Long submittedAtMsMax,
                                  @RequestParam(value = "votesMin", required = false) Long votesMin,
                                  @RequestParam(value = "votesMax", required = false) Long votesMax,
                                  @RequestParam(value = "profitMin", required = false) Long profitMin,
                                  @RequestParam(value = "profitMax", required = false) Long profitMax,
                                  @RequestParam(value = "implementationTimeMsMin", required = false) Long implementationTimeMsMin,
                                  @RequestParam(value = "implementationTimeMsMax", required = false) Long implementationTimeMsMax,
                                  @RequestParam(value = "tags", required = false) Set<String> tags,
                                  @RequestParam(value = "partialFullSwitch", required = false) Boolean partialFullSwitch) {

    	Account requester = getRequester();
        GetIdeasDto getIdeasDto =
                new GetIdeasDto(filter, stages, submittedAtMsMin, submittedAtMsMax, votesMin, votesMax, profitMin,
                                    profitMax, implementationTimeMsMin, implementationTimeMsMax, tags, partialFullSwitch);
        
        return ideaService.getIdeas(getIdeasDto,requester);
    }

    
    
    @RequestMapping(value = "", method = RequestMethod.POST)
    public IdeaDto upsert(@RequestBody IdeaDto ideaDto) throws AttachmentsNotUploadedException {
        Account requester = getRequester();
        return ideaService.upsert(ideaDto, requester);
    }
    
    
    @RequestMapping(value = "/attach", method = RequestMethod.GET)
    public void getImageAsByteArray(HttpServletResponse response,
			@RequestParam(value = "ideaId", required = false) Long ideaId,
			@RequestParam(value = "fileId", required = true) Long persistenceId) throws IOException {

    	
    	
    	String fileContentType = ideaService.getFileContentType(persistenceId);
    	InputStream in = ideaService.getAttachment(ideaId,persistenceId);
        response.setContentType(fileContentType);
        IOUtils.copy(in, response.getOutputStream());
    }

    
    @RequestMapping(value = "/comment/attach", method = RequestMethod.GET)
    public void getImageAsByteArray(HttpServletResponse response,
			@RequestParam(value = "ideaId", required = false) Long ideaId,
			@RequestParam(value = "commentId", required = false) Long commentId,
			@RequestParam(value = "fileId", required = true) Long persistenceId) throws IOException {
    	
    	Account requester = getRequester();
    	
    	String fileContentType = ideaService.getFileContentType(persistenceId);
    	InputStream in = ideaService.getAttachmentOnComment(ideaId,commentId, persistenceId,requester);
        response.setContentType(fileContentType);
        IOUtils.copy(in, response.getOutputStream());
    }
    
    
    @RequestMapping(value = "/attach-content", method = RequestMethod.POST)
    public AttachmentDto uploadFileContent(
    			@RequestParam(value = "ideaId", required = false) Long ideaId,
    			@RequestParam(value = "viewId", required = true) String viewId,
    			@RequestParam(value = "persistenceId", required = true) Long persistenceId,
    			@RequestParam("file") MultipartFile multipartFile) {
    	Account requester = getRequester();

    	// UPLOADING FILE
    	AttachmentDto attachmentDto = new AttachmentDto(persistenceId,ideaId,viewId,multipartFile.getOriginalFilename(),multipartFile.getContentType(),multipartFile.getSize());
    	if (!multipartFile.isEmpty() && multipartFile.getSize()<=IdeaService.MAX_ATTACHMENT_SIZE ) {
    		try {
    	    	attachmentDto= ideaService.uploadContent(attachmentDto,multipartFile.getInputStream(),requester);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
		return attachmentDto;
    }

    
    
    @RequestMapping(value = "/comment/attach-content", method = RequestMethod.POST)
    public AttachmentDto uploadFileContentOnComment(
    			@RequestParam(value = "ideaId", required = false) Long ideaId,
    			@RequestParam(value = "viewId", required = true) String viewId,
    			@RequestParam(value = "persistenceId", required = true) Long persistenceId,
    			@RequestParam("file") MultipartFile multipartFile) {

    	Account requester = getRequester();
    	// UPLOADING FILE
    	AttachmentDto attachmentDto = new AttachmentDto(persistenceId,ideaId,viewId,multipartFile.getOriginalFilename(),multipartFile.getContentType(),multipartFile.getSize());
    	if (!multipartFile.isEmpty() && multipartFile.getSize()<=IdeaService.MAX_ATTACHMENT_SIZE ) {
    		try {
    	    	attachmentDto= ideaService.uploadContentOnNewComment(attachmentDto,multipartFile.getInputStream(),requester);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
		return attachmentDto;
    }
    
    
    
    /**
     * Upload individual file
     * 
     * Uploads the file in filesystem (S3)
     * Updates session map 
     * Add entry to File table
     * 
     * @param attachmentDto
     * @return
     */
    @RequestMapping(value = "/attach", method = RequestMethod.POST)
    public AttachmentDto uploadFile(
    			@RequestBody AttachmentDto attachmentDto) {

    	Account requester = getRequester();
    	if (attachmentDto.getSize()<=IdeaService.MAX_ATTACHMENT_SIZE) {
    		attachmentDto = ideaService.prepareUpload(attachmentDto, requester);
    		return attachmentDto;
        } else {
        	return null;
        }
    }


    @RequestMapping(value = "/comment/attach", method = RequestMethod.POST)
    public AttachmentDto uploadFileOnComment(
    			@RequestBody AttachmentDto attachmentDto) {
    	Account requester = getRequester();
    	if (attachmentDto.getSize()<=IdeaService.MAX_ATTACHMENT_SIZE) {
    		attachmentDto = ideaService.prepareUploadOnNewComment(attachmentDto, requester);
    		return attachmentDto;
        } else {
        	return null;
        }
    }

    
    
    /**
     * Only removes the uploading file if the id exists and the requester is the same as uploadedBy account
     * @param attachmentDto
     * @return
     */
    @RequestMapping(value = "/attach", method = RequestMethod.DELETE)
    public FilesToRemoveDto removeUploadingFile(@RequestBody FilesToRemoveDto filesToRemoveDto) {

    	Account requester = getRequester();
        return ideaService.removeUploadingFile(filesToRemoveDto, requester); 
    }
    
    @RequestMapping(value = "/comment/attach", method = RequestMethod.DELETE)
    public FilesToRemoveDto removeUploadingFileOnComment(@RequestBody FilesToRemoveDto filesToRemoveDto) {
    	Account requester = getRequester();

    	return ideaService.removeUploadingFileOnComment(filesToRemoveDto, requester); 
    }
    
    @RequestMapping(value = "/vote", method = RequestMethod.POST)
    public IdeaDto vote(@RequestBody VoteDto voteDto) throws IdeaNotFoundException {

    	Account requester = getRequester();

        return ideaService.vote(voteDto, requester);
    }

    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public IdeaDto comment(@RequestBody CommentDto commentDto) throws IdeaNotFoundException, AttachmentsNotUploadedException {
    	Account requester = getRequester();
        return ideaService.comment(commentDto, requester);
    }

    @RequestMapping(value = "/tags", method = RequestMethod.GET)
    public List<TagDto> getPopularTags() {

        return ideaService.getPopularTags();
    }
    
    
    // TODO Paginate
    @RequestMapping(value = "/summary-ttm-profit-vote", method = RequestMethod.GET)
    public IdeaDistributionTtmProfitVoteDto getIdeasSummaryTTMProfitVotes(@RequestParam(value = "submittedAtMsMin", required = false) Long submittedAtMsMin,
                                  @RequestParam(value = "submittedAtMsMax", required = false) Long submittedAtMsMax,
                                  @RequestParam(value = "votesMin", required = false) Long votesMin,
                                  @RequestParam(value = "votesMax", required = false) Long votesMax,
                                  @RequestParam(value = "profitMin", required = false) Long profitMin,
                                  @RequestParam(value = "profitMax", required = false) Long profitMax,
                                  @RequestParam(value = "implementationTimeMsMin", required = false) Long implementationTimeMsMin,
                                  @RequestParam(value = "implementationTimeMsMax", required = false) Long implementationTimeMsMax,
                                  @RequestParam(value = "tags", required = false) Set<String> tags,
                                  @RequestParam(value = "partialFullSwitch", required = false) Boolean partialFullSwitch ) {

    	
        GetIdeasDto getIdeasDto =
                new GetIdeasDto(submittedAtMsMin, submittedAtMsMax, votesMin, votesMax, profitMin,
                                    profitMax, implementationTimeMsMin, implementationTimeMsMax, tags, partialFullSwitch);

        return ideaDistributionTtmProfitVoteService.getIdeasSummaryTTMProfitVotes(getIdeasDto);
    }
    
}
