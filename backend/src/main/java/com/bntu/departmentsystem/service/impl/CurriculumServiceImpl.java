package com.bntu.departmentsystem.service.impl;

import com.bntu.departmentsystem.model.entity.*;
import com.bntu.departmentsystem.model.excel.ExcelCurriculumContent;
import com.bntu.departmentsystem.repository.CurriculumRepository;
import com.bntu.departmentsystem.repository.SpecialityRepository;
import com.bntu.departmentsystem.service.CurriculumContentService;
import com.bntu.departmentsystem.service.CurriculumService;
import com.bntu.departmentsystem.service.mapper.ExcelCurriculumContentMapper;
import com.bntu.departmentsystem.service.parser.ExcelParseService;
import com.bntu.departmentsystem.service.report.WordReportService;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CurriculumServiceImpl implements CurriculumService {
    private static final String CURRICULUM_CONTENTS_TEMPLATE_NAME = "curriculum_contents.docx";

    private final CurriculumRepository curriculumRepository;
    private final CurriculumContentService curriculumContentService;
    private final SpecialityRepository specialityRepository;
    private final ExcelParseService<ExcelCurriculumContent> excelParseService;
    private final ExcelCurriculumContentMapper excelCurriculumContentMapper;
    private final WordReportService wordReportService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public List<Curriculum> getAll(Integer page, Integer count) {
        return curriculumRepository.findAll(PageRequest.of(page, count)).getContent();
    }

    @Override
    public Curriculum getById(Long id) {
        return curriculumRepository.findById(id).orElse(null);
    }

    @Override
    public void add(Integer yearOfEntry, Long specialityId, MultipartFile content) throws InvalidUploadFileException {
        List<CurriculumContent> curriculumContents = parseContent(content);
        Curriculum currentCurriculum = curriculumRepository.save(Curriculum.builder()
                .yearOfEntry(yearOfEntry)
                .speciality(specialityId != null ?
                        specialityRepository.findById(specialityId).orElse(null) : null)
                .build());
        if (!CollectionUtils.isEmpty(curriculumContents)) {
            curriculumContents.forEach(curriculumContent -> curriculumContent.setCurriculum(currentCurriculum));
            curriculumContentService.addAll(curriculumContents);
        }
    }

    @Override
    public void edit(Long id, Integer yearOfEntry, Long specialityId, MultipartFile content) throws InvalidUploadFileException {
        Curriculum curriculum = curriculumRepository.findById(id).orElse(null);
        if (curriculum != null) {
            Optional.ofNullable(yearOfEntry).ifPresent(curriculum::setYearOfEntry);
            Optional.ofNullable(specialityId).ifPresent(speciality -> curriculum
                    .setSpeciality(specialityRepository.findById(speciality).orElse(null)));
            List<CurriculumContent> curriculumContents = parseContent(content);
            curriculumRepository.save(curriculum);
            if (!CollectionUtils.isEmpty(curriculumContents)) {
                curriculumContentService.deleteAll(curriculum);
                curriculumContents.forEach(curriculumContent -> curriculumContent.setCurriculum(curriculum));
                curriculumContentService.addAll(curriculumContents);
            }
        }
    }

    @Override
    @Transactional
    public void deleteAll(List<Long> ids) {
        ids.forEach(id -> {
            curriculumRepository.findById(id).ifPresent(curriculumContentService::deleteAll);
        });
        curriculumRepository.deleteByIdIn(ids);
    }

    @Override
    public ByteArrayOutputStream downloadContent(Long id) {
        if (id != null) {
            Curriculum curriculum = curriculumRepository.findById(id).orElse(null);
            List<CurriculumContent> curriculumContents = curriculumContentService.getAllByCurriculum(curriculum);
            Map<String, String> singleData = new HashMap<String, String>() {{
                put("speciality", curriculum == null ? "" : curriculum.getSpeciality().getTitle());
                put("yearOfEntry", curriculum == null ? "" : curriculum.getYearOfEntry().toString());
            }};
            List<Map<String, List<String>>> tableData = new ArrayList<Map<String, List<String>>>() {{
                add(new HashMap<String, List<String>>() {{
                    put("subject", curriculumContents
                            .stream()
                            .map(curriculumContent -> curriculumContent.getSubject().getTitle())
                            .collect(Collectors.toList()));
                    put("examTerm", curriculumContents
                            .stream()
                            .map(curriculumContent -> curriculumContent.getExamTermNumber().toString())
                            .collect(Collectors.toList()));
                    put("creditTerm", curriculumContents
                            .stream()
                            .map(curriculumContent -> curriculumContent.getCreditTermNumber().toString())
                            .collect(Collectors.toList()));
                    put("audit", curriculumContents
                            .stream()
                            .map(curriculumContent -> curriculumContent.getAuditHours().toString())
                            .collect(Collectors.toList()));
                    put("lecture", curriculumContents
                            .stream()
                            .map(curriculumContent -> curriculumContent.getLectureHours().toString())
                            .collect(Collectors.toList()));
                    put("labWork", curriculumContents
                            .stream()
                            .map(curriculumContent -> curriculumContent.getLabWorkHours().toString())
                            .collect(Collectors.toList()));
                }});
            }};
            return wordReportService.generateReport(CURRICULUM_CONTENTS_TEMPLATE_NAME, singleData, tableData);
        }
        return null;
    }

    private List<CurriculumContent> parseContent(MultipartFile content) throws InvalidUploadFileException {
        if (content != null && !content.isEmpty()) {
            try {
                List<ExcelCurriculumContent> excelCurriculumContents = excelParseService.parse(content, ExcelCurriculumContent.class);
                return excelCurriculumContentMapper.from(excelCurriculumContents);
            } catch (Exception exception) {
                log.warn("Cannot parse excel file: {}", exception.getMessage());
                throw new InvalidUploadFileException(exception.getMessage());
            }
        } else {
            return null;
        }
    }
}
