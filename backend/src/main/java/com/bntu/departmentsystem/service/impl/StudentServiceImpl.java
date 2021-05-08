package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.student.EditStudentRequest;
import com.bntu.departmentsystem.model.entity.Group;
import com.bntu.departmentsystem.model.entity.Person;
import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.model.excel.ExcelStudent;
import com.bntu.departmentsystem.repository.GroupRepository;
import com.bntu.departmentsystem.repository.StudentRepository;
import com.bntu.departmentsystem.service.StudentService;
import com.bntu.departmentsystem.service.mapper.ExcelStudentMapper;
import com.bntu.departmentsystem.service.parser.ExcelParseService;
import com.bntu.departmentsystem.service.report.WordReportService;
import com.bntu.departmentsystem.utils.DateUtils;
import com.bntu.departmentsystem.utils.PersonNameUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final GroupRepository groupRepository;
    private final ExcelStudentMapper excelStudentMapper;
    private final ExcelParseService<ExcelStudent> excelParseService;
    private final WordReportService wordReportService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Student> getAll(Integer page, Integer count) {
        return studentRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    public Student getById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditStudentRequest studentRequest) {
        studentRepository.save(Student.builder()
                .lastName(studentRequest.getLastName())
                .firstName(studentRequest.getFirstName())
                .middleName(studentRequest.getMiddleName())
                .birthDate(DateUtils.format(studentRequest.getBirthDate().toString()))
                .phone(studentRequest.getPhone())
                .email(studentRequest.getEmail())
                .fullName(PersonNameUtils.getFullName(studentRequest.getLastName(),
                        studentRequest.getFirstName(),
                        studentRequest.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(studentRequest.getLastName(),
                        studentRequest.getFirstName(),
                        studentRequest.getMiddleName()))
                .group(groupRepository.findById(studentRequest.getGroupId()).orElse(null))
                .build());
    }

    @Override
    public void addAll(List<Student> students) {
        studentRepository.saveAll(students);
    }

    @Override
    public void edit(Long id, EditStudentRequest studentRequest) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student != null) {
            Optional.ofNullable(studentRequest.getLastName()).ifPresent(student::setLastName);
            Optional.ofNullable(studentRequest.getFirstName()).ifPresent(student::setFirstName);
            Optional.ofNullable(studentRequest.getMiddleName()).ifPresent(student::setMiddleName);
            Optional.ofNullable(studentRequest.getBirthDate()).ifPresent(birthDate -> student
                    .setBirthDate(DateUtils.format(studentRequest.getBirthDate().toString())));
            Optional.ofNullable(studentRequest.getPhone()).ifPresent(student::setPhone);
            Optional.ofNullable(studentRequest.getEmail()).ifPresent(student::setEmail);
            if (studentRequest.getLastName() != null && studentRequest.getFirstName() != null) {
                student.setFullName(PersonNameUtils.getFullName(studentRequest.getLastName(),
                        studentRequest.getFirstName(),
                        studentRequest.getMiddleName()));
                student.setAbbreviatedName(PersonNameUtils.getAbbreviatedName(studentRequest.getLastName(),
                        studentRequest.getFirstName(),
                        studentRequest.getMiddleName()));
            }
            Optional.ofNullable(studentRequest.getGroupId()).ifPresent(groupId -> student
                    .setGroup(groupRepository.findById(groupId).orElse(null)));
            studentRepository.save(student);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        studentRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Student> findByFullName(String query) {
        return (query != null && !query.isEmpty()) ?
                studentRepository.findAllByFullNameIsContaining(query) :
                Collections.emptyList();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Student> findByGroup(Long groupId) {
        Group group = groupId != null ? groupRepository.findById(groupId).orElse(null) : null;
        return group != null ? studentRepository.findByGroup(group) : Collections.emptyList();
    }

    @Override
    public List<Student> uploadData(MultipartFile excelFile) throws InvalidUploadFileException {
        try {
            List<ExcelStudent> excelStudents = excelParseService.parse(excelFile, ExcelStudent.class);
            return excelStudentMapper.from(excelStudents);
        } catch (Exception exception) {
            log.warn("Cannot parse excel file: {}", exception.getMessage());
            throw new InvalidUploadFileException(exception.getMessage());
        }
    }

    @Override
    public ByteArrayOutputStream generateReport(List<Student> students) {
        try {
            File template = ResourceUtils.getFile("classpath:templates/students.docx");
            Map<String, String> singleData = new HashMap<String, String>() {{
                put("group", students.get(0).getGroup().getNumber());
            }};
            List<Map<String, List<String>>> tableData = new ArrayList<Map<String, List<String>>>() {{
                add(new HashMap<String, List<String>>() {{
                    put("fullName", students.stream().map(Person::getFullName).collect(Collectors.toList()));
                    put("birthDate", students.stream().map(student -> student.getBirthDate().toString()).collect(Collectors.toList()));
                }});
            }};
            return wordReportService.generateReport(new FileInputStream(template), singleData, tableData);
        } catch (IOException exception) {

        }
        return null;
    }
}
