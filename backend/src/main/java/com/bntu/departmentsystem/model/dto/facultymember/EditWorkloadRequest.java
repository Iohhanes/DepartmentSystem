package com.bntu.departmentsystem.model.dto.facultymember;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditWorkloadRequest {
    private Double rate;
    private Integer support;
    private Integer hourly;
    private Long positionId;
    private Long positionPTId;
}
