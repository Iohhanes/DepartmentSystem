package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.speciality.EditSpecialityRequest;
import com.bntu.departmentsystem.model.entity.Speciality;

import java.util.List;

public interface SpecialityService {

    List<Speciality> getAll(Integer page, Integer count);

    List<Speciality> getAll();

    Speciality getById(Long id);

    void add(EditSpecialityRequest specialityRequest);

    void edit(Long id, EditSpecialityRequest specialityRequest);

    void deleteAll(List<Long> ids);

    List<Speciality> findByCode(String query);

    long count();
}
