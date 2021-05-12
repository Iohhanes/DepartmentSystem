package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.FacultyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyMemberRepository extends JpaRepository<FacultyMember, Long> {
    void deleteByIdIn(List<Long> ids);

    List<FacultyMember> findAllByFullNameIsContaining(String query);
}
