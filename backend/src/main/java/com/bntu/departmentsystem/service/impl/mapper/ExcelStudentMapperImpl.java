package com.bntu.departmentsystem.service.impl.mapper;

import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.model.excel.ExcelStudent;
import com.bntu.departmentsystem.repository.GroupRepository;
import com.bntu.departmentsystem.service.mapper.ExcelStudentMapper;
import com.bntu.departmentsystem.utils.DateUtils;
import com.bntu.departmentsystem.utils.PersonNameUtils;
import com.bntu.departmentsystem.utils.PersonPhoneUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ExcelStudentMapperImpl implements ExcelStudentMapper {
    private static final String PHONE__PATTERN = "\\d{9}";

    private final GroupRepository groupRepository;

    @Override
    public List<Student> from(List<ExcelStudent> excelStudents) throws InvalidUploadFileException {
        if (!CollectionUtils.isEmpty(excelStudents)) {
            List<Student> students = new ArrayList<>();
            for (ExcelStudent excelStudent : excelStudents) {
                Student from = from(excelStudent);
                students.add(from);
            }
            return students;
        }
        return Collections.emptyList();
    }

    @Override
    public Student from(ExcelStudent excelStudent) throws InvalidUploadFileException {
        if (noValidStudent(excelStudent)) {
            throw new InvalidUploadFileException();
        }
        return Student.builder()
                .lastName(excelStudent.getLastName())
                .firstName(excelStudent.getFirstName())
                .middleName(excelStudent.getMiddleName())
                .birthDate(DateUtils.format(excelStudent.getBirthDate()))
                .phone(PersonPhoneUtils.format(excelStudent.getPhone()))
                .email(excelStudent.getEmail())
                .fullName(PersonNameUtils.getFullName(excelStudent.getLastName(),
                        excelStudent.getFirstName(),
                        excelStudent.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(excelStudent.getLastName(),
                        excelStudent.getFirstName(),
                        excelStudent.getMiddleName()))
                .group(groupRepository.findByNumber(excelStudent.getGroupNumber()))
                .build();
    }

    private boolean noValidStudent(ExcelStudent excelStudent) {
        return excelStudent == null ||
                !StringUtils.hasLength(excelStudent.getLastName()) ||
                !StringUtils.hasLength(excelStudent.getFirstName()) ||
                excelStudent.getBirthDate() == null ||
                (excelStudent.getPhone() != null && !excelStudent.getPhone().matches(PHONE__PATTERN));
    }
}
