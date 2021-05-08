package com.bntu.departmentsystem.model.dto.progressinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditProgressInfoRequest {
    private String title;
    private String abbreviated;
}
