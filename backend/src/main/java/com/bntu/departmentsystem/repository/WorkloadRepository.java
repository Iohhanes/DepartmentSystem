package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.model.entity.Workload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkloadRepository extends JpaRepository<Workload, Long> {
    void deleteByIdIn(List<Long> ids);

    Workload findByFacultyMember(FacultyMember facultyMember);
}
