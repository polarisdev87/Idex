package com.gs2.pipeline.service.impl;

import com.gs2.pipeline.domain.Idea;
import com.gs2.pipeline.dto.IdeaDto;
import com.gs2.pipeline.repository.IdeaRepository;
import com.gs2.pipeline.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IdeaServiceImpl implements IdeaService {

    private final IdeaRepository ideaRepository;

    @Autowired
    public IdeaServiceImpl(IdeaRepository ideaRepository) {
        this.ideaRepository = ideaRepository;
    }

    @Override
    public List<IdeaDto> getAllIdeas() {
        return ideaRepository.findAll().stream().map(Idea::toDto).collect(Collectors.toList());
    }
}
