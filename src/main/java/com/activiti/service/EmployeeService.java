package com.activiti.service;

import com.activiti.base.request.EmployeeReqModel;
import com.activiti.base.request.PositionReqModel;
import com.activiti.base.response.EmployeeRspModel;
import com.activiti.base.response.EoaPositonRspModel;

import java.util.List;

public interface EmployeeService {

    List<EmployeeRspModel> getActivitiEmployee(EmployeeReqModel employeeReqModel);

    List<EoaPositonRspModel> getActivitiEoaPosition(PositionReqModel positionReqModel);
}
