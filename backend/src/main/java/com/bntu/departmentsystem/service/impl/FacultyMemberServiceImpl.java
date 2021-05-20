package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.dto.facultymember.EditFacultyMemberRequest;
import com.bntu.departmentsystem.model.dto.facultymember.FacultyMemberReportRequest;
import com.bntu.departmentsystem.model.entity.*;
import com.bntu.departmentsystem.model.excel.ExcelFacultyMember;
import com.bntu.departmentsystem.repository.DegreeRepository;
import com.bntu.departmentsystem.repository.FacultyMemberRepository;
import com.bntu.departmentsystem.repository.RankRepository;
import com.bntu.departmentsystem.service.FacultyMemberService;
import com.bntu.departmentsystem.service.WorkloadService;
import com.bntu.departmentsystem.service.impl.mapper.ExcelFacultyMemberMapper;
import com.bntu.departmentsystem.service.parser.ExcelParseService;
import com.bntu.departmentsystem.service.report.WordReportService;
import com.bntu.departmentsystem.utils.DateUtils;
import com.bntu.departmentsystem.utils.PersonDataUtils;
import com.bntu.departmentsystem.utils.PersonNameUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class FacultyMemberServiceImpl implements FacultyMemberService {
    private static final String FACULTY_MEMBERS_TEMPLATE_NAME = "faculty_members.docx";

    private final FacultyMemberRepository facultyMemberRepository;
    private final DegreeRepository degreeRepository;
    private final RankRepository rankRepository;
    private final WorkloadService workloadService;
    private final ExcelParseService<ExcelFacultyMember> excelParseService;
    private final ExcelFacultyMemberMapper excelFacultyMemberMapper;
    private final WordReportService wordReportService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<FacultyMember> getAll(Integer page, Integer count) {
        return facultyMemberRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<FacultyMember> getAll() {
        return facultyMemberRepository.findAll();
    }

    @Override
    public long count() {
        return facultyMemberRepository.count();
    }

    @Override
    public FacultyMember getById(Long id) {
        return facultyMemberRepository.findById(id).orElse(null);
    }

    @Override
    public void add(EditFacultyMemberRequest facultyMemberRequest) {
        Workload workload = workloadService.add(facultyMemberRequest.getWorkloadRequest());
        FacultyMember facultyMember = FacultyMember.builder()
                .lastName(facultyMemberRequest.getLastName())
                .firstName(facultyMemberRequest.getFirstName())
                .middleName(facultyMemberRequest.getMiddleName())
                .birthDate(DateUtils.format(facultyMemberRequest.getBirthDate()))
                .phone(facultyMemberRequest.getPhone())
                .email(facultyMemberRequest.getEmail())
                .fullName(PersonNameUtils.getFullName(facultyMemberRequest.getLastName(),
                        facultyMemberRequest.getFirstName(),
                        facultyMemberRequest.getMiddleName()))
                .abbreviatedName(PersonNameUtils.getAbbreviatedName(facultyMemberRequest.getLastName(),
                        facultyMemberRequest.getFirstName(),
                        facultyMemberRequest.getMiddleName()))
                .degree(facultyMemberRequest.getDegreeId() != null ?
                        degreeRepository.findById(facultyMemberRequest.getDegreeId()).orElse(null) : null)
                .rank(facultyMemberRequest.getRankId() != null ?
                        rankRepository.findById(facultyMemberRequest.getRankId()).orElse(null) : null)
                .build();
        if (workload != null) {
            facultyMember.setWorkload(workload);
            workload.setFacultyMember(facultyMember);
        }
        facultyMemberRepository.save(facultyMember);
    }

    @Override
    public void addAll(List<FacultyMember> facultyMembers) {
        facultyMemberRepository.saveAll(facultyMembers);
    }

    @Override
    public void edit(Long id, EditFacultyMemberRequest facultyMemberRequest) {
        FacultyMember facultyMember = facultyMemberRepository.findById(id).orElse(null);
        if (facultyMember != null) {
            PersonDataUtils.editPerson(facultyMember, facultyMemberRequest);
            facultyMember.setDegree(facultyMemberRequest.getDegreeId() == null ?
                    null : degreeRepository.findById(facultyMemberRequest.getDegreeId()).orElse(null));
            facultyMember.setRank(facultyMemberRequest.getRankId() == null ?
                    null : rankRepository.findById(facultyMemberRequest.getRankId()).orElse(null));
            workloadService.edit(facultyMember.getWorkload(), facultyMemberRequest.getWorkloadRequest());
            facultyMemberRepository.save(facultyMember);
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        facultyMemberRepository.deleteByIdIn(ids);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<FacultyMember> findByFullName(String query) {
        return (query != null && !query.isEmpty()) ?
                facultyMemberRepository.findAllByFullNameIsContaining(query) :
                Collections.emptyList();
    }

    @Override
    public List<FacultyMember> uploadData(MultipartFile excelFile) throws InvalidUploadFileException {
        try {
            if (!excelFile.isEmpty()) {
                List<ExcelFacultyMember> excelFacultyMembers = excelParseService.parse(excelFile, ExcelFacultyMember.class);
                return excelFacultyMemberMapper.from(excelFacultyMembers);
            } else {
                return Collections.emptyList();
            }
        } catch (Exception exception) {
            log.warn("Cannot parse excel file: {}", exception.getMessage());
            throw new InvalidUploadFileException(exception.getMessage());
        }
    }

    @Override
    public ByteArrayOutputStream generateReport(FacultyMemberReportRequest reportRequest) {
        List<FacultyMember> facultyMembers = facultyMemberRepository.findAll();
        Map<String, String> singleData = new HashMap<String, String>() {{
            put("educationYear", reportRequest.getEducationYear() == null ? "" : reportRequest.getEducationYear().toString());
            put("signDate", DateUtils.format(DateUtils.format(reportRequest.getSignDate())));
        }};
        List<Map<String, List<String>>> tableData = new ArrayList<Map<String, List<String>>>() {{
            add(new HashMap<String, List<String>>() {{
                put("fullName", facultyMembers
                        .stream()
                        .map(Person::getFullName)
                        .collect(Collectors.toList()));
                put("degree", facultyMembers
                        .stream()
                        .map(FacultyMember::getDegree)
                        .map(degree -> Optional.ofNullable(degree)
                                .map(ProgressInfo::getTitle)
                                .orElse(""))
                        .collect(Collectors.toList()));
                put("rate", facultyMembers
                        .stream()
                        .map(FacultyMember::getWorkload)
                        .map(workload -> Optional.ofNullable(workload)
                                .map(Workload::getRate)
                                .map(Object::toString)
                                .orElse(""))
                        .collect(Collectors.toList()));
                put("hourly", facultyMembers
                        .stream()
                        .map(FacultyMember::getWorkload)
                        .map(workload -> Optional.ofNullable(workload)
                                .map(Workload::getHourly)
                                .map(Object::toString)
                                .orElse(""))
                        .collect(Collectors.toList()));
                put("support", facultyMembers
                        .stream()
                        .map(FacultyMember::getWorkload)
                        .map(workload -> Optional.ofNullable(workload)
                                .map(Workload::getSupport)
                                .map(Object::toString)
                                .orElse(""))
                        .collect(Collectors.toList()));
                put("position", facultyMembers
                        .stream()
                        .map(FacultyMember::getWorkload)
                        .map(workload -> Optional.ofNullable(workload)
                                .map(Workload::getPosition)
                                .map(ProgressInfo::getTitle)
                                .orElse(""))
                        .collect(Collectors.toList()));
                put("positionPT", facultyMembers
                        .stream()
                        .map(FacultyMember::getWorkload)
                        .map(workload -> Optional.ofNullable(workload)
                                .map(Workload::getPositionPT)
                                .map(ProgressInfo::getTitle)
                                .orElse(""))
                        .collect(Collectors.toList()));
            }});
        }};
        return wordReportService.generateReport(FACULTY_MEMBERS_TEMPLATE_NAME, singleData, tableData);
    }
}
