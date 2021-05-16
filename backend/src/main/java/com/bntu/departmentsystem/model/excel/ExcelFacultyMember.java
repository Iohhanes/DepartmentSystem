package com.bntu.departmentsystem.model.excel;

import com.poiji.annotation.ExcelCellName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExcelFacultyMember {
    @ExcelCellName("Last name")
    private String lastName;

    @ExcelCellName("First name")
    private String firstName;

    @ExcelCellName("Middle name")
    private String middleName;

    @ExcelCellName("Birth date")
    private String birthDate;

    @ExcelCellName("Phone")
    private String phone;

    @ExcelCellName("Email")
    private String email;

    @ExcelCellName("Degree")
    private String degreeTitle;

    @ExcelCellName("Rank")
    private String rankTitle;

    @ExcelCellName("Hours")
    private Integer hours;

    @ExcelCellName("Hourly")
    private Integer hourly;

    @ExcelCellName("Support")
    private Integer support;

    @ExcelCellName("Position")
    private String positionTitle;

    @ExcelCellName("Position PT")
    private String positionPTTitle;
}
