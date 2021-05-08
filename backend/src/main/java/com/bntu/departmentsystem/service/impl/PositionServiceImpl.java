package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Position;
import com.bntu.departmentsystem.repository.PositionRepository;
import com.bntu.departmentsystem.service.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PositionServiceImpl implements PositionService {
    private final PositionRepository positionRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Position> getAll(Integer page, Integer count) {
        return positionRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Position> getAll() {
        return positionRepository.findAll();
    }

    @Override
    public Position getById(Long id) {
        return positionRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditProgressInfoRequest progressInfoRequest) {
        positionRepository.save(Position.builder()
                .title(progressInfoRequest.getTitle())
                .abbreviated(progressInfoRequest.getAbbreviated())
                .build());
    }

    @Override
    public void edit(Long id, EditProgressInfoRequest progressInfoRequest) {
        Position position = positionRepository.findById(id).orElse(null);
        if (position != null) {
            Optional.ofNullable(progressInfoRequest.getTitle()).ifPresent(position::setTitle);
            Optional.ofNullable(progressInfoRequest.getAbbreviated()).ifPresent(position::setAbbreviated);
            positionRepository.save(position);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        positionRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Position> findByTitle(String query) {
        return (query != null && !query.isEmpty()) ?
                positionRepository.findByTitleIsContaining(query) :
                Collections.emptyList();
    }
}
