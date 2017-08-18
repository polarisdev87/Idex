package com.gs2.pipeline.controller;

import com.gs2.pipeline.config.security.jwt.JwtUser;
import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.IdeaDto;
import com.gs2.pipeline.service.AccountService;
import com.gs2.pipeline.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/ideas")
@RestController
public class IdeaRestController {

    private final IdeaService ideaService;
    private final AccountService accountService;

    @Autowired
    public IdeaRestController(IdeaService ideaService, AccountService accountService) {
        this.ideaService = ideaService;
        this.accountService = accountService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<IdeaDto> getIdeas() {
        return ideaService.getIdeas();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public IdeaDto upsert(@RequestBody IdeaDto ideaDto) {

        JwtUser requestingUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account requester = accountService.findByUsername(requestingUser.getUsername());

        return ideaService.upsert(ideaDto, requester);
    }
}
