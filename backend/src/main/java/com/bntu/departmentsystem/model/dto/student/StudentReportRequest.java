package com.bntu.departmentsystem.model.dto.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentReportRequest {
    private Long groupId;
    private Date signDate;
}
