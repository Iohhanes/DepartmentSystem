package com.bntu.departmentsystem.model.excel;

import com.poiji.annotation.ExcelCellName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExcelCurriculumContent {
    @ExcelCellName("Subject")
    private String subjectTitle;

    @ExcelCellName("Exam term")
    private Integer examTermNumber;

    @ExcelCellName("Credit term")
    private Integer creditTermNumber;

    @ExcelCellName("Audit")
    private Integer auditHours;

    @ExcelCellName("Lecture")
    private Integer lectureHours;

    @ExcelCellName("Lab work")
    private Integer labWorkHours;
}
