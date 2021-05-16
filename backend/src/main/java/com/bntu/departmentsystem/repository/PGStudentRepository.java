package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.model.entity.PGStudent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PGStudentRepository extends JpaRepository<PGStudent, Long> {
    void deleteByIdIn(List<Long> ids);

    List<PGStudent> findAllByMasterAndFullNameIsContaining(boolean master, String query);

    List<PGStudent> findAllByMasterAndFacultyMember(boolean master, FacultyMember facultyMember);

    Page<PGStudent> findAllByMaster(boolean master, Pageable pageable);

    long countByMaster(boolean master);

    PGStudent findByMasterAndId(boolean master, Long id);
}
