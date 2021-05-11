package com.bntu.departmentsystem.repository;

import com.bntu.departmentsystem.model.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    void deleteByIdIn(List<Long> ids);

    Group findByNumber(String number);

    List<Group> findByNumberIsContaining(String query);
}
