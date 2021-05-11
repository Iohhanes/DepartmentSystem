package com.bntu.departmentsystem.model.dto.curriculum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditCurriculumRequest {
    private Integer yearOfEntry;
    private Long specialityId;
    List<EditCurriculumContentRequest> curriculumContents;
}
