package com.bntu.departmentsystem.service;

import com.bntu.departmentsystem.model.dto.facultymember.EditWorkloadRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.model.entity.Workload;
import com.bntu.departmentsystem.model.excel.ExcelFacultyMember;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;

import java.util.List;

public interface WorkloadService {
    Workload add(EditWorkloadRequest workloadRequest);

    Workload add(ExcelFacultyMember excelFacultyMember) throws InvalidUploadFileException;

    void edit(Workload workload, EditWorkloadRequest workloadRequest);

    void deleteAll(List<FacultyMember> facultyMembers);
}
