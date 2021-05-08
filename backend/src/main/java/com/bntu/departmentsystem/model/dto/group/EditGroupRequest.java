package com.bntu.departmentsystem.model.dto.group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditGroupRequest {
    private String number;
    private Integer yearOfEntry;
    private Long specialityId;
}
