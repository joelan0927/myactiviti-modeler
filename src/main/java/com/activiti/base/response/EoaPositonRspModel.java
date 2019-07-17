package com.activiti.base.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EoaPositonRspModel {
    private String positionNo;
    private String positionName;
    private String positionType;
}
