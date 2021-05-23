package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Rank;
import com.bntu.departmentsystem.repository.RankRepository;
import com.bntu.departmentsystem.service.RankService;
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
public class RankServiceImpl implements RankService {
    private final RankRepository rankRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Rank> getAll(Integer page, Integer count) {
        return rankRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Rank> getAll() {
        return rankRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public long count() {
        return rankRepository.count();
    }

    @Override
    public Rank getById(Long id) {
        return rankRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditProgressInfoRequest progressInfoRequest) {
        rankRepository.save(Rank.builder()
                .title(progressInfoRequest.getTitle())
                .abbreviated(progressInfoRequest.getAbbreviated())
                .build());
    }

    @Override
    public void edit(Long id, EditProgressInfoRequest progressInfoRequest) {
        Rank rank = rankRepository.findById(id).orElse(null);
        if (rank != null) {
            Optional.ofNullable(progressInfoRequest.getTitle()).ifPresent(rank::setTitle);
            Optional.ofNullable(progressInfoRequest.getAbbreviated()).ifPresent(rank::setAbbreviated);
            rankRepository.save(rank);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        rankRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Rank> findByTitle(String query) {
        return (query != null && !query.isEmpty()) ?
                rankRepository.findByTitleIsContaining(query) :
                Collections.emptyList();
    }
}
