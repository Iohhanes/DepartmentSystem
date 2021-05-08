package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PositionRepository extends JpaRepository<Position, Long> {
    void deleteByIdIn(List<Long> ids);

    Position findByTitle(String title);

    List<Position> findByTitleIsContaining(String query);
}
