package com.gs2.pipeline.controller;

import com.gs2.pipeline.config.security.jwt.JwtUser;
import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.*;
import com.gs2.pipeline.exception.IdeaNotFoundException;
import com.gs2.pipeline.service.AccountService;
import com.gs2.pipeline.service.IdeaDistributionTtmProfitVoteService;
import com.gs2.pipeline.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RequestMapping("/ideas")
@RestController
public class IdeaRestController {

    private final IdeaService ideaService;
    private final AccountService accountService;
    private final IdeaDistributionTtmProfitVoteService ideaDistributionTtmProfitVoteService;

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
                                  @RequestParam(value = "partialFullSwitch", required = false) Boolean partialFullSwitch ) {

        GetIdeasDto getIdeasDto =
                new GetIdeasDto(filter, stages, submittedAtMsMin, submittedAtMsMax, votesMin, votesMax, profitMin,
                                    profitMax, implementationTimeMsMin, implementationTimeMsMax, tags, partialFullSwitch);

        return ideaService.getIdeas(getIdeasDto);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public IdeaDto upsert(@RequestBody IdeaDto ideaDto) {

        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());

        return ideaService.upsert(ideaDto, requester);
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
