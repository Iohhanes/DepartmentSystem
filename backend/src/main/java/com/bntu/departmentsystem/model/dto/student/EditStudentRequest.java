package com.bntu.departmentsystem.model.dto.student;

import com.bntu.departmentsystem.model.dto.person.EditPersonRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class EditStudentRequest extends EditPersonRequest {
    private Long groupId;
}
