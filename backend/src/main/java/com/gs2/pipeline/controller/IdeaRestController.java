package com.gs2.pipeline.controller;

import com.gs2.pipeline.domain.Account;
import com.gs2.pipeline.dto.IdeaDto;
import com.gs2.pipeline.repository.AccountRepository;
import com.gs2.pipeline.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/ideas")
@RestController
public class IdeaRestController {

    private final IdeaService ideaService;
    private final AccountRepository accountRepository;

    @Autowired
    public IdeaRestController(IdeaService ideaService, AccountRepository accountRepository) {
        this.ideaService = ideaService;
        this.accountRepository = accountRepository;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<IdeaDto> getIdeas() {
        return ideaService.getIdeas();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public IdeaDto upsert(@RequestBody IdeaDto ideaDto) {

        //TODO Get actual submitter
        Account insertedBy = accountRepository.findByLowerCaseUsername("admin");

        return ideaService.upsert(ideaDto, insertedBy);
    }
}
