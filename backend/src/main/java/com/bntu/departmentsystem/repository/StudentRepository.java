package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Group;
import com.bntu.departmentsystem.model.entity.Student;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {
    void deleteByIdIn(List<Long> ids);

    List<Student> findAllByFullNameIsContaining(String query);

    List<Student> findByGroup(Group group);
}
