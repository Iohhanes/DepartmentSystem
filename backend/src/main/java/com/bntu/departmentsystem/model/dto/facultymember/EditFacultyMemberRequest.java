package com.bntu.departmentsystem.model.dto.facultymember;

import com.bntu.departmentsystem.model.dto.person.EditPersonRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class EditFacultyMemberRequest extends EditPersonRequest {
    private Long degreeId;
    private Long rankId;
    private EditWorkloadRequest workloadRequest;
}
