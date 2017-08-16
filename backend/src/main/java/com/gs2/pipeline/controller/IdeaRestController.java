package com.gs2.pipeline.controller;

import com.gs2.pipeline.dto.IdeaDto;
import com.gs2.pipeline.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/ideas")
@RestController
public class IdeaRestController {

    private final IdeaService ideaService;

    @Autowired
    public IdeaRestController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @RequestMapping("/all")
    public List<IdeaDto> getAllIdeas() {
        return ideaService.getAllIdeas();
    }
}
