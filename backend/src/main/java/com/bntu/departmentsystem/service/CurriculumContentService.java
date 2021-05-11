package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.entity.Curriculum;
import com.bntu.departmentsystem.model.entity.CurriculumContent;

import java.util.List;

public interface CurriculumContentService {
    List<CurriculumContent> getAllByCurriculum(Curriculum curriculum);

    void addAll(List<CurriculumContent> curriculumContents);

    void deleteAll(Curriculum curriculum);
}
