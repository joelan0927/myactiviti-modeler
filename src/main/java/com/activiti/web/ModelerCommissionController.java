package com.activiti.web;

import com.activiti.base.request.EmployeeReqModel;
import com.activiti.base.request.PositionReqModel;
import com.activiti.base.response.EmployeeRspModel;
import com.activiti.base.response.EoaPositonRspModel;
import com.activiti.base.wrapper.ResultUtil;
import com.activiti.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ModelerCommissionController {

    @Autowired
    private EmployeeService employeeService;

    /**
     * 根据部门编号或者职务编号获取人员信息
     */
    @ResponseBody
    @PostMapping("/model/getActivitiEmployee")
    public ResultUtil getActivitiEmployee(EmployeeReqModel employeeReqModel){
        List<EmployeeRspModel> employeeRspModels = employeeService.getActivitiEmployee(employeeReqModel);
        return ResultUtil.success(employeeRspModels);
    }

    /**
     * 工作流选择委托人时展示的部门组织架构树
     */
    @ResponseBody
    @PostMapping("/model/getActivitiPositionGroup")
    public ResultUtil getActivitiPositionGroup(PositionReqModel positionReqModel){
        List<EoaPositonRspModel> activitiEoaPositions = employeeService.getActivitiEoaPosition(positionReqModel);
        return ResultUtil.success(activitiEoaPositions);
    }

}
