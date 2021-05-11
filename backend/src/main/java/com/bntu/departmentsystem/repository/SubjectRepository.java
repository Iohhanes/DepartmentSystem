package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    void deleteByIdIn(List<Long> ids);

    Subject findByTitle(String title);

    List<Subject> findByTitleIsContaining(String query);
}
