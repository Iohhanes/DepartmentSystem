package com.bntu.departmentsystem.model.dto.facultymember;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditFacultyMemberRequest {
    private String lastName;
    private String firstName;
    private String middleName;
    private Date birthDate;
    private String phone;
    private String email;
    private Long degreeId;
    private Long rankId;
    private EditWorkloadRequest workloadRequest;
}
