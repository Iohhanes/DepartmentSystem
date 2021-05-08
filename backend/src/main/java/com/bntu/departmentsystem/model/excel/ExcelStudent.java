package com.bntu.departmentsystem.model.excel;

import com.poiji.annotation.ExcelCellName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExcelStudent {
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

    @ExcelCellName("Group")
    private String groupNumber;
}
