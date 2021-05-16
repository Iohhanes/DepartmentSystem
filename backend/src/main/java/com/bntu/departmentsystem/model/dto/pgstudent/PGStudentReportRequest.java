package com.bntu.departmentsystem.model.dto.pgstudent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PGStudentReportRequest {
    private Long facultyMemberId;
    private Date signDate;
}
