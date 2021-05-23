package com.bntu.departmentsystem.service.impl.mapper;

import com.bntu.departmentsystem.model.entity.PGStudent;
import com.bntu.departmentsystem.model.excel.ExcelPGStudent;
import com.bntu.departmentsystem.repository.FacultyMemberRepository;
import com.bntu.departmentsystem.service.mapper.ExcelEntityMapper;
import com.bntu.departmentsystem.utils.DateUtils;
import com.bntu.departmentsystem.utils.PersonNameUtils;
import com.bntu.departmentsystem.utils.PersonPhoneUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static com.bntu.departmentsystem.constants.ParsingConstants.PHONE_PATTERN;

@Service
@RequiredArgsConstructor
public class ExcelPGStudentMapper extends ExcelEntityMapper<ExcelPGStudent, PGStudent> {
    private final FacultyMemberRepository facultyMemberRepository;

    @Override
    public PGStudent from(ExcelPGStudent excelPGStudent) throws InvalidUploadFileException {
        if (notValidPGStudent(excelPGStudent)) {
            throw new InvalidUploadFileException("Not valid excel data");
        }
        return PGStudent.builder()
                .lastName(excelPGStudent.getLastName())
                .firstName(excelPGStudent.getFirstName())
                .middleName(excelPGStudent.getMiddleName())
                .birthDate(DateUtils.format(DateUtils.format(excelPGStudent.getBirthDate())))
                .phone(PersonPhoneUtils.format(excelPGStudent.getPhone()))
                .email(excelPGStudent.getEmail())
                .fullName(PersonNameUtils.getFullName(excelPGStudent.getLastName(),
                        excelPGStudent.getFirstName(),
                        excelPGStudent.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(excelPGStudent.getLastName(),
                        excelPGStudent.getFirstName(),
                        excelPGStudent.getMiddleName()))
                .startDate(DateUtils.format(DateUtils.format(excelPGStudent.getStartDate())))
                .endDate(DateUtils.format(DateUtils.format(excelPGStudent.getEndDate())))
                .comment(excelPGStudent.getComment())
                .facultyMember(excelPGStudent.getFacultyMemberFullName() != null ?
                        facultyMemberRepository.findByFullName(excelPGStudent.getFacultyMemberFullName()) : null)
                .build();
    }

    private boolean notValidPGStudent(ExcelPGStudent excelPGStudent) {
        return excelPGStudent == null ||
                !StringUtils.hasLength(excelPGStudent.getLastName()) ||
                !StringUtils.hasLength(excelPGStudent.getFirstName()) ||
                DateUtils.format(excelPGStudent.getBirthDate()) == null ||
                (excelPGStudent.getStartDate() != null && DateUtils.format(excelPGStudent.getStartDate()) == null) ||
                (excelPGStudent.getEndDate() != null && DateUtils.format(excelPGStudent.getEndDate()) == null) ||
                (excelPGStudent.getPhone() != null && !excelPGStudent.getPhone().matches(PHONE_PATTERN));
    }
}
