package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecialityRepository extends JpaRepository<Speciality, Long> {
    void deleteByIdIn(List<Long> ids);

    List<Speciality> findByCodeIsContaining(String query);
}
