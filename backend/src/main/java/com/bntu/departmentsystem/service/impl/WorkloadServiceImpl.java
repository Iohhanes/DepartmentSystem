package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.facultymember.EditWorkloadRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.model.entity.Workload;
import com.bntu.departmentsystem.model.excel.ExcelFacultyMember;
import com.bntu.departmentsystem.repository.PositionRepository;
import com.bntu.departmentsystem.repository.WorkloadRepository;
import com.bntu.departmentsystem.service.WorkloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkloadServiceImpl implements WorkloadService {
    private final PositionRepository positionRepository;
    private final WorkloadRepository workloadRepository;

    @Override
    public Workload getByFacultyMember(FacultyMember facultyMember) {
        if (facultyMember != null) {
            return workloadRepository.findByFacultyMember(facultyMember);
        }
        return null;
    }

    @Override
    public Workload add(EditWorkloadRequest workloadRequest) {
        if (workloadRequest != null) {
            return Workload.builder()
                    .hours(workloadRequest.getHours())
                    .hourly(workloadRequest.getHourly())
                    .support(workloadRequest.getSupport())
                    .position(workloadRequest.getPositionId() != null ?
                            positionRepository.findById(workloadRequest.getPositionId()).orElse(null) : null)
                    .positionPT(workloadRequest.getPositionPTId() != null ?
                            positionRepository.findById(workloadRequest.getPositionPTId()).orElse(null) : null)
                    .build();
        }
        return null;
    }

    @Override
    public Workload add(ExcelFacultyMember excelFacultyMember) {
        if (excelFacultyMember.getHours() != null ||
                excelFacultyMember.getHourly() != null ||
                excelFacultyMember.getSupport() != null ||
                excelFacultyMember.getPositionTitle() != null ||
                excelFacultyMember.getPositionPTTitle() != null) {
            return Workload.builder()
                    .hours(excelFacultyMember.getHours())
                    .hourly(excelFacultyMember.getHourly())
                    .support(excelFacultyMember.getSupport())
                    .position(excelFacultyMember.getPositionTitle() != null ?
                            positionRepository.findByTitle(excelFacultyMember.getPositionTitle()) : null)
                    .positionPT(excelFacultyMember.getPositionPTTitle() != null ?
                            positionRepository.findByTitle(excelFacultyMember.getPositionPTTitle()) : null)
                    .build();
        }
        return null;
    }

    @Override
    public void edit(Workload workload, EditWorkloadRequest workloadRequest) {
        if (workload != null && workloadRequest != null) {
            Optional.ofNullable(workloadRequest.getHours()).ifPresent(workload::setHours);
            Optional.ofNullable(workloadRequest.getHourly()).ifPresent(workload::setHourly);
            Optional.ofNullable(workloadRequest.getSupport()).ifPresent(workload::setSupport);
            Optional.ofNullable(workloadRequest.getPositionId()).ifPresent(positionId -> workload
                    .setPosition(positionRepository.findById(positionId).orElse(null)));
            Optional.ofNullable(workloadRequest.getPositionPTId()).ifPresent(positionPTId -> workload
                    .setPositionPT(positionRepository.findById(positionPTId).orElse(null)));
            workloadRepository.save(workload);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public void deleteAll(List<FacultyMember> facultyMembers) {
        List<Long> ids = facultyMembers
                .stream()
                .map(workloadRepository::findByFacultyMember)
                .filter(Objects::nonNull)
                .map(Workload::getId)
                .collect(Collectors.toList());
        workloadRepository.deleteByIdIn(ids);
    }
}
