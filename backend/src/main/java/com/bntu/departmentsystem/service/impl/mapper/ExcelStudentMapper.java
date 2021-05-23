package com.bntu.departmentsystem.service.impl.mapper;

import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.model.excel.ExcelStudent;
import com.bntu.departmentsystem.repository.GroupRepository;
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
public class ExcelStudentMapper extends ExcelEntityMapper<ExcelStudent, Student> {
    private final GroupRepository groupRepository;

    @Override
    public Student from(ExcelStudent excelStudent) throws InvalidUploadFileException {
        if (notValidStudent(excelStudent)) {
            throw new InvalidUploadFileException("Not valid excel data");
        }
        return Student.builder()
                .lastName(excelStudent.getLastName())
                .firstName(excelStudent.getFirstName())
                .middleName(excelStudent.getMiddleName())
                .birthDate(DateUtils.format(DateUtils.format(excelStudent.getBirthDate())))
                .phone(PersonPhoneUtils.format(excelStudent.getPhone()))
                .email(excelStudent.getEmail())
                .fullName(PersonNameUtils.getFullName(excelStudent.getLastName(),
                        excelStudent.getFirstName(),
                        excelStudent.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(excelStudent.getLastName(),
                        excelStudent.getFirstName(),
                        excelStudent.getMiddleName()))
                .group(excelStudent.getGroupNumber() != null ?
                        groupRepository.findByNumber(excelStudent.getGroupNumber()) : null)
                .build();
    }

    private boolean notValidStudent(ExcelStudent excelStudent) {
        return excelStudent == null ||
                !StringUtils.hasLength(excelStudent.getLastName()) ||
                !StringUtils.hasLength(excelStudent.getFirstName()) ||
                DateUtils.format(excelStudent.getBirthDate()) == null ||
                (excelStudent.getPhone() != null && !excelStudent.getPhone().matches(PHONE_PATTERN));
    }
}
