package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Curriculum;
import com.bntu.departmentsystem.model.entity.CurriculumContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurriculumContentRepository extends JpaRepository<CurriculumContent, Long> {
    void deleteByIdIn(List<Long> ids);

    List<CurriculumContent> findByCurriculum(Curriculum curriculum);
}
