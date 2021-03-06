package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.pgstudent.EditPGStudentRequest;
import com.bntu.departmentsystem.model.dto.pgstudent.PGStudentReportRequest;
import com.bntu.departmentsystem.model.entity.*;
import com.bntu.departmentsystem.model.excel.ExcelPGStudent;
import com.bntu.departmentsystem.repository.FacultyMemberRepository;
import com.bntu.departmentsystem.repository.PGStudentRepository;
import com.bntu.departmentsystem.service.PGStudentService;
import com.bntu.departmentsystem.service.impl.mapper.ExcelPGStudentMapper;
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

import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class PGStudentServiceImpl implements PGStudentService {
    private static final String PG_STUDENTS_TEMPLATE_NAME = "pg_students.docx";

    private final PGStudentRepository pgStudentRepository;
    private final FacultyMemberRepository facultyMemberRepository;
    private final ExcelParseService<ExcelPGStudent> excelParseService;
    private final ExcelPGStudentMapper excelPGStudentMapper;
    private final PdfReportService pdfReportService;
    private final WordReportService wordReportService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<PGStudent> getAll(Integer page, Integer count, boolean master) {
        return pgStudentRepository.findAllByMaster(master, PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public long count(boolean master) {
        return pgStudentRepository.countByMaster(master);
    }

    @Override
    public PGStudent getById(Long id, boolean master) {
        return pgStudentRepository.findByMasterAndId(master, id);
    }

    @Override
    public void add(EditPGStudentRequest pgStudentRequest, boolean master) {
        pgStudentRepository.save(PGStudent.builder()
                .lastName(pgStudentRequest.getLastName())
                .firstName(pgStudentRequest.getFirstName())
                .middleName(pgStudentRequest.getMiddleName())
                .birthDate(DateUtils.format(pgStudentRequest.getBirthDate()))
                .phone(pgStudentRequest.getPhone())
                .email(pgStudentRequest.getEmail())
                .fullName(PersonNameUtils.getFullName(pgStudentRequest.getLastName(),
                        pgStudentRequest.getFirstName(),
                        pgStudentRequest.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(pgStudentRequest.getLastName(),
                        pgStudentRequest.getFirstName(),
                        pgStudentRequest.getMiddleName()))
                .startDate(DateUtils.format(pgStudentRequest.getStartDate()))
                .endDate(DateUtils.format(pgStudentRequest.getEndDate()))
                .comment(pgStudentRequest.getComment())
                .master(master)
                .facultyMember(pgStudentRequest.getFacultyMemberId() != null ?
                        facultyMemberRepository.findById(pgStudentRequest.getFacultyMemberId()).orElse(null) : null)
                .build());
    }

    @Override
    public void addAll(List<PGStudent> pgStudents) {
        pgStudentRepository.saveAll(pgStudents);
    }

    @Override
    public void edit(Long id, EditPGStudentRequest pgStudentRequest) {
        PGStudent pgStudent = pgStudentRepository.findById(id).orElse(null);
        if (pgStudent != null) {
            PersonDataUtils.editPerson(pgStudent, pgStudentRequest);
            pgStudent.setStartDate(pgStudentRequest.getStartDate() == null ?
                    null : DateUtils.format(pgStudentRequest.getStartDate()));
            pgStudent.setEndDate(pgStudentRequest.getEndDate() == null ?
                    null : DateUtils.format(pgStudentRequest.getEndDate()));
            pgStudent.setComment(pgStudentRequest.getComment());
            pgStudent.setFacultyMember(pgStudentRequest.getFacultyMemberId() == null ?
                    null : facultyMemberRepository.findById(pgStudentRequest.getFacultyMemberId()).orElse(null));
            pgStudentRepository.save(pgStudent);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        pgStudentRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<PGStudent> findByFullName(String query, boolean master) {
        return (query != null && !query.isEmpty()) ?
                pgStudentRepository.findAllByMasterAndFullNameIsContaining(master, query) :
                Collections.emptyList();
    }

    @Override
    public List<PGStudent> uploadData(MultipartFile excelFile, boolean master) throws InvalidUploadFileException {
        try {
            if (!excelFile.isEmpty()) {
                List<ExcelPGStudent> excelPGStudents = excelParseService.parse(excelFile, ExcelPGStudent.class);
                List<PGStudent> pgStudents = excelPGStudentMapper.from(excelPGStudents);
                pgStudents.forEach(pgStudent -> {
                    pgStudent.setMaster(master);
                });
                return pgStudents;
            } else {
                return Collections.emptyList();
            }
        } catch (Exception exception) {
            log.warn("Cannot parse excel file: {}", exception.getMessage());
            throw new InvalidUploadFileException(exception);
        }
    }

    @Override
    public ByteArrayOutputStream generateWordReport(PGStudentReportRequest reportRequest, boolean master) {
        Map<String, String> singleData = formReportSingleData(reportRequest);
        List<Map<String, List<String>>> tableData = formReportTableData(reportRequest, master);
        return wordReportService.generateReport(PG_STUDENTS_TEMPLATE_NAME, singleData, tableData);
    }

    @Override
    public ByteArrayOutputStream generatePdfReport(PGStudentReportRequest reportRequest, boolean master) {
        Map<String, String> singleData = formReportSingleData(reportRequest);
        List<Map<String, List<String>>> tableData = formReportTableData(reportRequest, master);
        return pdfReportService.generateReport(PG_STUDENTS_TEMPLATE_NAME, singleData, tableData);
    }

    private Map<String, String> formReportSingleData(PGStudentReportRequest reportRequest) {
        FacultyMember facultyMember = facultyMemberRepository.findById(reportRequest.getFacultyMemberId()).orElse(null);
        return new HashMap<String, String>() {{
            put("facultyMember", facultyMember == null ? "" : facultyMember.getFullName());
            put("signDate", DateUtils.format(DateUtils.format(reportRequest.getSignDate())));
        }};
    }

    private List<Map<String, List<String>>> formReportTableData(PGStudentReportRequest reportRequest, boolean master) {
        FacultyMember facultyMember = facultyMemberRepository.findById(reportRequest.getFacultyMemberId()).orElse(null);
        List<PGStudent> pgStudents = facultyMember == null ? Collections.emptyList() :
                pgStudentRepository.findAllByMasterAndFacultyMember(master, facultyMember);
        return new ArrayList<Map<String, List<String>>>() {{
            add(new HashMap<String, List<String>>() {{
                put("fullName", pgStudents.stream().map(Person::getFullName).collect(Collectors.toList()));
                put("birthDate", pgStudents.stream().map(student -> DateUtils.format(student.getBirthDate()))
                        .collect(Collectors.toList()));
                put("startDate", pgStudents.stream().map(student -> Optional.ofNullable(student.getStartDate())
                        .map(DateUtils::format)
                        .orElse(""))
                        .collect(Collectors.toList()));
                put("endDate", pgStudents.stream().map(student -> Optional.ofNullable(student.getEndDate())
                        .map(DateUtils::format)
                        .orElse(""))
                        .collect(Collectors.toList()));
                put("comment", pgStudents.stream().map(student -> Optional.ofNullable(student.getComment())
                        .orElse(""))
                        .collect(Collectors.toList()));
            }});
        }};
    }
}
