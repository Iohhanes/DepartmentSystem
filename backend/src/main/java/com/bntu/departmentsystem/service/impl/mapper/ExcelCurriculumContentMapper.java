package com.bntu.departmentsystem.service.impl.mapper;

import com.bntu.departmentsystem.model.entity.CurriculumContent;
import com.bntu.departmentsystem.model.entity.Subject;
import com.bntu.departmentsystem.model.excel.ExcelCurriculumContent;
import com.bntu.departmentsystem.repository.SubjectRepository;
import com.bntu.departmentsystem.service.mapper.ExcelEntityMapper;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ExcelCurriculumContentMapper extends ExcelEntityMapper<ExcelCurriculumContent, CurriculumContent> {
    private final SubjectRepository subjectRepository;

    @Override
    public CurriculumContent from(ExcelCurriculumContent excelCurriculumContent) throws InvalidUploadFileException {
        String subjectTitle = excelCurriculumContent == null ? null : excelCurriculumContent.getSubjectTitle();
        Subject subject = subjectTitle == null ? null : subjectRepository.findByTitle(subjectTitle);
        if (subject == null || notValidCurriculumContent(excelCurriculumContent)) {
            throw new InvalidUploadFileException();
        }
        return CurriculumContent.builder()
                .creditTermNumber(excelCurriculumContent.getCreditTermNumber())
                .examTermNumber(excelCurriculumContent.getExamTermNumber())
                .auditHours(excelCurriculumContent.getAuditHours())
                .lectureHours(excelCurriculumContent.getLectureHours())
                .labWorkHours(excelCurriculumContent.getLabWorkHours())
                .subject(subject)
                .build();
    }

    private boolean notValidCurriculumContent(ExcelCurriculumContent excelCurriculumContent) {
        return excelCurriculumContent == null ||
                excelCurriculumContent.getCreditTermNumber() == null ||
                excelCurriculumContent.getExamTermNumber() == null ||
                excelCurriculumContent.getAuditHours() == null ||
                excelCurriculumContent.getLectureHours() == null ||
                excelCurriculumContent.getLabWorkHours() == null;
    }
}
