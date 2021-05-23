package com.bntu.departmentsystem.service.impl.mapper;

import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.model.entity.Workload;
import com.bntu.departmentsystem.model.excel.ExcelFacultyMember;
import com.bntu.departmentsystem.repository.DegreeRepository;
import com.bntu.departmentsystem.repository.RankRepository;
import com.bntu.departmentsystem.service.WorkloadService;
import com.bntu.departmentsystem.service.mapper.ExcelEntityMapper;
import com.bntu.departmentsystem.utils.DateUtils;
import com.bntu.departmentsystem.utils.PersonNameUtils;
import com.bntu.departmentsystem.utils.PersonPhoneUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;

import static com.bntu.departmentsystem.constants.ParsingConstants.PHONE_PATTERN;

@Service
@RequiredArgsConstructor
public class ExcelFacultyMemberMapper extends ExcelEntityMapper<ExcelFacultyMember, FacultyMember> {
    private final DegreeRepository degreeRepository;
    private final RankRepository rankRepository;
    private final WorkloadService workloadService;

    @Override
    public FacultyMember from(ExcelFacultyMember excelFacultyMember) throws InvalidUploadFileException {
        if (notValidFacultyMember(excelFacultyMember)) {
            throw new InvalidUploadFileException("Not valid excel data");
        }
        FacultyMember facultyMember = FacultyMember.builder()
                .lastName(excelFacultyMember.getLastName())
                .firstName(excelFacultyMember.getFirstName())
                .middleName(excelFacultyMember.getMiddleName())
                .birthDate(DateUtils.format(DateUtils.format(excelFacultyMember.getBirthDate())))
                .phone(PersonPhoneUtils.format(excelFacultyMember.getPhone()))
                .email(excelFacultyMember.getEmail())
                .fullName(PersonNameUtils.getFullName(excelFacultyMember.getLastName(),
                        excelFacultyMember.getFirstName(),
                        excelFacultyMember.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(excelFacultyMember.getLastName(),
                        excelFacultyMember.getFirstName(),
                        excelFacultyMember.getMiddleName()))
                .degree(excelFacultyMember.getDegreeTitle() != null ?
                        degreeRepository.findByTitle(excelFacultyMember.getDegreeTitle()) : null)
                .rank(excelFacultyMember.getRankTitle() != null ?
                        rankRepository.findByTitle(excelFacultyMember.getRankTitle()) : null)
                .build();
        Workload workload = workloadService.add(excelFacultyMember);
        if (workload != null) {
            facultyMember.setWorkload(workload);
            workload.setFacultyMember(facultyMember);
        }
        return facultyMember;
    }

    private boolean notValidFacultyMember(ExcelFacultyMember excelFacultyMember) {
        return excelFacultyMember == null ||
                !StringUtils.hasLength(excelFacultyMember.getLastName()) ||
                !StringUtils.hasLength(excelFacultyMember.getFirstName()) ||
                DateUtils.format(excelFacultyMember.getBirthDate()) == null ||
                (excelFacultyMember.getPhone() != null && !excelFacultyMember.getPhone().matches(PHONE_PATTERN)) ||
                excelFacultyMember.getRate() == null || notValidRate(excelFacultyMember) ||
                excelFacultyMember.getPositionTitle() == null;
    }

    private boolean notValidRate(ExcelFacultyMember excelFacultyMember) {
        BigDecimal rate = excelFacultyMember.getRate();
        rate = rate.setScale(1, BigDecimal.ROUND_HALF_UP);
        return BigDecimal.ZERO.compareTo(rate) >= 0 || BigDecimal.ONE.compareTo(rate) < 0;
    }
}
