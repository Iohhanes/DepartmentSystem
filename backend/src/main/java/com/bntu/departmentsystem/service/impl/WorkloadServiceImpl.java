package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.facultymember.EditWorkloadRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.model.entity.Position;
import com.bntu.departmentsystem.model.entity.Workload;
import com.bntu.departmentsystem.model.excel.ExcelFacultyMember;
import com.bntu.departmentsystem.repository.PositionRepository;
import com.bntu.departmentsystem.repository.WorkloadRepository;
import com.bntu.departmentsystem.service.WorkloadService;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
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
    public Workload add(EditWorkloadRequest workloadRequest) {
        if (workloadRequest != null) {
            return Workload.builder()
                    .rate(workloadRequest.getRate())
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
    public Workload add(ExcelFacultyMember excelFacultyMember) throws InvalidUploadFileException {
        Position position = positionRepository.findByTitle(excelFacultyMember.getPositionTitle());
        if (position == null) {
            throw new InvalidUploadFileException("Invalid position name");
        }
        return Workload.builder()
                .rate(excelFacultyMember.getRate().doubleValue())
                .hourly(excelFacultyMember.getHourly() != null && excelFacultyMember.getHourly() == 0 ?
                        null : excelFacultyMember.getHourly())
                .support(excelFacultyMember.getSupport() != null && excelFacultyMember.getSupport() == 0 ?
                        null : excelFacultyMember.getSupport())
                .position(position)
                .positionPT(excelFacultyMember.getPositionPTTitle() != null ?
                        positionRepository.findByTitle(excelFacultyMember.getPositionPTTitle()) : null)
                .build();
    }

    @Override
    public void edit(Workload workload, EditWorkloadRequest workloadRequest) {
        if (workload != null && workloadRequest != null) {
            Optional.ofNullable(workloadRequest.getRate()).ifPresent(workload::setRate);
            workload.setHourly(workloadRequest.getHourly());
            workload.setSupport(workloadRequest.getSupport());
            Optional.ofNullable(workloadRequest.getPositionId()).ifPresent(positionId -> workload
                    .setPosition(positionRepository.findById(positionId).orElse(null)));
            workload.setPositionPT(workloadRequest.getPositionPTId() == null ?
                    null : positionRepository.findById(workloadRequest.getPositionPTId()).orElse(null));
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
