package com.bntu.departmentsystem.model.dto.curriculum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditCurriculumContentRequest {
    private Long id;
    private Integer examTermNumber;
    private Integer creditTermNumber;
    private Integer auditHours;
    private Integer lectureHours;
    private Integer labWorkHours;
    private Long subjectId;
}
