package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RankRepository extends JpaRepository<Rank, Long> {
    void deleteByIdIn(List<Long> ids);

    Rank findByTitle(String title);

    List<Rank> findByTitleIsContaining(String query);
}
