package com.bntu.departmentsystem.model.dto.speciality;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditSpecialityRequest {
    private String code;
    private String title;
}
