package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Degree;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DegreeRepository extends JpaRepository<Degree, Long> {
    void deleteByIdIn(List<Long> ids);

    Degree findByTitle(String title);

    List<Degree> findByTitleIsContaining(String query);
}
