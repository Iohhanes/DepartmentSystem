package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Group;
import com.bntu.departmentsystem.model.entity.Student;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {
    void deleteByIdIn(List<Long> ids);

    List<Student> findAllByFullNameIsContaining(String query);

    List<Student> findByGroup(Group group);
}
