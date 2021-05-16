package com.bntu.departmentsystem.model.dto.pgstudent;

import com.bntu.departmentsystem.model.dto.person.EditPersonRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class EditPGStudentRequest extends EditPersonRequest {
    private Date startDate;
    private Date endDate;
    private String comment;
    private boolean master;
    private Long facultyMemberId;
}
