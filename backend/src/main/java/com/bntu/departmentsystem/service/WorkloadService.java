package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.facultymember.EditWorkloadRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.model.entity.Workload;
import com.bntu.departmentsystem.model.excel.ExcelFacultyMember;

import java.util.List;

public interface WorkloadService {
    Workload getByFacultyMember(FacultyMember facultyMember);

    Workload add(EditWorkloadRequest workloadRequest);

    Workload add(ExcelFacultyMember excelFacultyMember);

    void edit(Workload workload, EditWorkloadRequest workloadRequest);

    void deleteAll(List<FacultyMember> facultyMembers);
}
