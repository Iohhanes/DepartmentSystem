package com.bntu.departmentsystem.model.dto.facultymember;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacultyMemberReportRequest {
    private Integer educationYear;
    private Date signDate;
}
