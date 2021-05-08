package com.bntu.departmentsystem.model.dto.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditStudentRequest {
    private String lastName;
    private String firstName;
    private String middleName;
    private Date birthDate;
    private String phone;
    private String email;
    private Long groupId;
}
