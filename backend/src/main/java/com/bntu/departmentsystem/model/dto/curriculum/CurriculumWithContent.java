package com.bntu.departmentsystem.model.dto.curriculum;

import com.bntu.departmentsystem.model.entity.Curriculum;
import com.bntu.departmentsystem.model.entity.CurriculumContent;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class CurriculumWithContent extends Curriculum {
    private List<CurriculumContent> contents;
}
