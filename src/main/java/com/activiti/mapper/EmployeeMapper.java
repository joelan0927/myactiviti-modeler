package com.activiti.mapper;

import com.activiti.base.request.EmployeeReqModel;
import com.activiti.base.response.EmployeeRspModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EmployeeMapper {
    List<EmployeeRspModel> selectActivitiEmployee(EmployeeReqModel employeeReqModel);
}
