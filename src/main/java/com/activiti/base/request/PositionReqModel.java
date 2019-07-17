package com.activiti.base.request;

import lombok.Data;

@Data
public class PositionReqModel {
    private String keyword;
    private Integer pageNo;
    private Integer pageSize;
}
