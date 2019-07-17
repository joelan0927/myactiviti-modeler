package com.activiti.base.request;

import lombok.Data;

@Data
public class EmployeeReqModel {
    private String keyword;
    private Integer pageNo;
    private Integer pageSize;
}
