package com.gs2.pipeline.controller;

import com.gs2.pipeline.config.security.jwt.JwtUser;
import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.IdeaNotFoundException;
import com.gs2.pipeline.service.AccountService;
import com.gs2.pipeline.service.IdeaDistributionTtmProfitVoteService;
import com.gs2.pipeline.service.IdeaService;
import com.gs2.pipeline.domain.helper.FileCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpSession;

@RequestMapping("/ideas")
@RestController
public class IdeaRestController {

    private final IdeaService ideaService;
    private final AccountService accountService;
    private final IdeaDistributionTtmProfitVoteService ideaDistributionTtmProfitVoteService;
    /**
     * time in seconds to wait for uploading files after finish editing
     */
    private static final int UPLOAD_SESSION_TIMEOUT = 600;
    private static final int UPLOAD_RETRY_INTERVAL_IN_MS = 500;

    private static final String MAP_FILES_UPLOAD_NAME = "filesMap";
    
    
    @Autowired
    public IdeaRestController(
    		IdeaService ideaService, 
    		AccountService accountService, 
    		IdeaDistributionTtmProfitVoteService ideaDistributionTtmProfitVoteService) {
        this.ideaService = ideaService;
        this.accountService = accountService;
        this.ideaDistributionTtmProfitVoteService = ideaDistributionTtmProfitVoteService;
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

        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());
        GetIdeasDto getIdeasDto =
                new GetIdeasDto(filter, stages, submittedAtMsMin, submittedAtMsMax, votesMin, votesMax, profitMin,
                                    profitMax, implementationTimeMsMin, implementationTimeMsMax, tags, partialFullSwitch);
        
        return ideaService.getIdeas(getIdeasDto,requester);
    }
    
    @RequestMapping(value = "", method = RequestMethod.POST)
    public IdeaDto upsert(HttpSession session,@RequestBody IdeaDto ideaDto) {

        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());
        
        // set attachment ids
        List<AttachmentDto> files = ideaDto.getFiles();
        
        Map<String,FileCache> mapFilesId = (Map<String,FileCache>) session.getAttribute(MAP_FILES_UPLOAD_NAME);
        long startTime = System.nanoTime();
        boolean uploadedFilesReady = false;
        boolean uploadedFilesCancelled = false;
        while (!uploadedFilesReady && !uploadedFilesCancelled) {
            files = ideaService.checkUploadFilesStatus(files,mapFilesId);
            uploadedFilesReady = ideaService.areUploadededFilesReady(files);
            if (!uploadedFilesReady) {
            	long difference = System.nanoTime()- startTime;
            	if (TimeUnit.NANOSECONDS.toSeconds(difference)>UPLOAD_SESSION_TIMEOUT) {
            		uploadedFilesCancelled=true;
            	} else {
					try {
							Thread.sleep(UPLOAD_RETRY_INTERVAL_IN_MS);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
            	}
            }
        }
        if (uploadedFilesReady) {
            return ideaService.upsert(ideaDto, requester);
        } else {
        	return null;
        }
    }
    
    
    /**
     * Upload individual file
     * 
     * Uploads the file in filesystem (S3)
     * Updates session map 
     * Add entry to File table
     * 
     * @param session
     * @param ideaId
     * @param fileId
     * @param file
     * @return
     */
    @RequestMapping(value = "/attach", method = RequestMethod.POST)
    public UploadFileResponseDto uploadFile(HttpSession session,
    			@RequestParam(value = "ideaId", required = true) Long ideaId,
    			@RequestParam(value = "fileId", required = true) String fileId,
    			@RequestParam("file") MultipartFile file) {
        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());
    	Map<String,FileCache> fileIdMaps;
    	String ideaFileIdKey = Long.toString(ideaId)+":"+fileId;
    	if (session.getAttribute(MAP_FILES_UPLOAD_NAME)==null) {
    		fileIdMaps=new HashMap<String,FileCache>();
    		session.setAttribute(MAP_FILES_UPLOAD_NAME, fileIdMaps);
    	} else {
    		fileIdMaps=(Map<String, FileCache>) session.getAttribute(ideaFileIdKey);
    	}
    	
    	Long filePersistentId = 
    			ideaService.upload(new AttachmentDto(ideaId, fileId,file.getOriginalFilename(),file.getSize()), requester);
    	fileIdMaps.put(ideaFileIdKey,new FileCache(filePersistentId));
    	// TODO: Think about what to return 
    	
    	
    	/*
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
		*/
    	// UPLOADING FILE
    	
    	if (!file.isEmpty()) {
    		try {
				FileDto savedFileEntry= ideaService.upload(filePersistentId,file.getBytes());
				FileCache sessionFile = fileIdMaps.get(ideaFileIdKey);
				sessionFile.setUploaded(savedFileEntry.getEnd());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
    	
    	
        String fileDownloadUri = "";
		return new UploadFileResponseDto(ideaId, fileId, file.getName(), fileDownloadUri ,
                file.getContentType(), file.getSize());
    }

    @RequestMapping(value = "/vote", method = RequestMethod.POST)
    public IdeaDto vote(@RequestBody VoteDto voteDto) throws IdeaNotFoundException {

        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());

        return ideaService.vote(voteDto, requester);
    }

    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public IdeaDto comment(@RequestBody CommentDto commentDto) throws IdeaNotFoundException {

        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());

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
