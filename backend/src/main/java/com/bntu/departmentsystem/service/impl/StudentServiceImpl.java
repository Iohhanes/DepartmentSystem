package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.student.EditStudentRequest;
import com.bntu.departmentsystem.model.dto.student.StudentReportRequest;
import com.bntu.departmentsystem.model.entity.Group;
import com.bntu.departmentsystem.model.entity.Person;
import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.model.excel.ExcelStudent;
import com.bntu.departmentsystem.repository.GroupRepository;
import com.bntu.departmentsystem.repository.StudentRepository;
import com.bntu.departmentsystem.service.StudentService;
import com.bntu.departmentsystem.service.impl.mapper.ExcelStudentMapper;
import com.bntu.departmentsystem.service.parser.ExcelParseService;
import com.bntu.departmentsystem.service.report.PdfReportService;
import com.bntu.departmentsystem.service.report.WordReportService;
import com.bntu.departmentsystem.utils.DateUtils;
import com.bntu.departmentsystem.utils.PersonDataUtils;
import com.bntu.departmentsystem.utils.PersonNameUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class StudentServiceImpl implements StudentService {
    private static final String STUDENTS_TEMPLATE_NAME = "students.docx";

    private final StudentRepository studentRepository;
    private final GroupRepository groupRepository;
    private final ExcelStudentMapper excelStudentMapper;
    private final ExcelParseService<ExcelStudent> excelParseService;
    private final PdfReportService pdfReportService;
    private final WordReportService wordReportService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Student> getAll(Integer page, Integer count) {
        return studentRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public long count() {
        return studentRepository.count();
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
                .birthDate(DateUtils.format(studentRequest.getBirthDate()))
                .phone(studentRequest.getPhone())
                .email(studentRequest.getEmail())
                .fullName(PersonNameUtils.getFullName(studentRequest.getLastName(),
                        studentRequest.getFirstName(),
                        studentRequest.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(studentRequest.getLastName(),
                        studentRequest.getFirstName(),
                        studentRequest.getMiddleName()))
                .group(studentRequest.getGroupId() != null ?
                        groupRepository.findById(studentRequest.getGroupId()).orElse(null) : null)
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
            PersonDataUtils.editPerson(student, studentRequest);
            student.setGroup(studentRequest.getGroupId() == null ?
                    null : groupRepository.findById(studentRequest.getGroupId()).orElse(null));
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
            if (!excelFile.isEmpty()) {
                List<ExcelStudent> excelStudents = excelParseService.parse(excelFile, ExcelStudent.class);
                return excelStudentMapper.from(excelStudents);
            } else {
                return Collections.emptyList();
            }
        } catch (Exception exception) {
            log.warn("Cannot parse excel file: {}", exception.getMessage());
            throw new InvalidUploadFileException(exception);
        }
    }

    @Override
    public ByteArrayOutputStream generateWordReport(StudentReportRequest reportRequest) {
        Map<String, String> singleData = formReportSingleData(reportRequest);
        List<Map<String, List<String>>> tableData = formReportTableData(reportRequest);
        return wordReportService.generateReport(STUDENTS_TEMPLATE_NAME, singleData, tableData);
    }

    @Override
    public ByteArrayOutputStream generatePdfReport(StudentReportRequest reportRequest) {
        Map<String, String> singleData = formReportSingleData(reportRequest);
        List<Map<String, List<String>>> tableData = formReportTableData(reportRequest);
        return pdfReportService.generateReport(STUDENTS_TEMPLATE_NAME, singleData, tableData);
    }

    private Map<String, String> formReportSingleData(StudentReportRequest reportRequest) {
        Group group = groupRepository.findById(reportRequest.getGroupId()).orElse(null);
        return new HashMap<String, String>() {{
            put("group", group == null ? "" : group.getNumber());
            put("signDate", DateUtils.format(DateUtils.format(reportRequest.getSignDate())));
        }};
    }

    private List<Map<String, List<String>>> formReportTableData(StudentReportRequest reportRequest) {
        Group group = groupRepository.findById(reportRequest.getGroupId()).orElse(null);
        List<Student> students = group == null ? Collections.emptyList() : studentRepository.findByGroup(group);
        return new ArrayList<Map<String, List<String>>>() {{
            add(new HashMap<String, List<String>>() {{
                put("fullName", students.stream().map(Person::getFullName).collect(Collectors.toList()));
                put("birthDate", students.stream().map(student -> DateUtils.format(student.getBirthDate()))
                        .collect(Collectors.toList()));
            }});
        }};
    }
}
