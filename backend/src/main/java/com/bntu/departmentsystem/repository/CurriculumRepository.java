package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Curriculum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurriculumRepository extends JpaRepository<Curriculum, Long> {
    void deleteByIdIn(List<Long> ids);
}
