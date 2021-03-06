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
public class ExcelPGStudent {
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

    @ExcelCellName("Start date")
    private String startDate;

    @ExcelCellName("End date")
    private String endDate;

    @ExcelCellName("Comment")
    private String comment;

    @ExcelCellName("Faculty member")
    private String facultyMemberFullName;
}
