package com.activiti.base.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class EmployeeRspModel {
    private String empNo;
    private String empName;
    private String jobName;
    private String deptName;
}
