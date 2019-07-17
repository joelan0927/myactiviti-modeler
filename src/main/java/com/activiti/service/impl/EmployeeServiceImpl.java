package com.activiti.service.impl;

import com.activiti.base.request.EmployeeReqModel;
import com.activiti.base.request.PositionReqModel;
import com.activiti.base.response.EmployeeRspModel;
import com.activiti.base.response.EoaPositonRspModel;
import com.activiti.mapper.EmployeeMapper;
import com.activiti.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeMapper employeeMapper;

    @Autowired
    private void setEmployeeMapper(EmployeeMapper employeeMapper){
        this.employeeMapper = employeeMapper;
    }

    @Override
    public List<EmployeeRspModel> getActivitiEmployee(EmployeeReqModel employeeReqModel) {
        //此处为返回给设计器的委托人信息，有需要自行根据数据库获取
        List<EmployeeRspModel> employeeRspModels = new ArrayList<>();
        employeeRspModels.add(new EmployeeRspModel("zhangsan","张三","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("lisi","李四","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("wangwu","王五","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("zhaoliu","赵六","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("xiaoqi","小七","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("suba","苏八","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("qianjiu","钱九","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("lili","丽丽","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("huahua","花花","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("beibei","贝贝","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("madada","马大大","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("xiaoai","小爱","经纪人","XX部"));
        employeeRspModels.add(new EmployeeRspModel("shanshan","姗姗","经纪人","XX部"));

        //搜索
        if (!StringUtils.isEmpty(employeeReqModel.getKeyword())) {
            employeeRspModels = employeeRspModels
                    .stream()
                    .filter(a -> a.getEmpNo().indexOf(employeeReqModel.getKeyword()) != -1 || a.getEmpName().indexOf(employeeReqModel.getKeyword()) != -1)
                    .collect(Collectors.toList());
        }
        //分页
        employeeRspModels = employeeRspModels
                .stream()
                .skip((employeeReqModel.getPageNo()-1)*employeeReqModel.getPageSize())
                .limit(employeeReqModel.getPageSize())
                .collect(Collectors.toList());

        return employeeRspModels;
    }

    @Override
    public List<EoaPositonRspModel> getActivitiEoaPosition(PositionReqModel positionReqModel) {
        //此处为返回给设计器的委托人信息，有需要自行根据数据库获取
        List<EoaPositonRspModel> eoaPositonRspModels = new ArrayList<>();
        eoaPositonRspModels.add(new EoaPositonRspModel("01","董事长","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("04","总监级别","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("0122","董事长助理","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("0442","总监助理","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("0366","常务处长","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("0544","北区总经理","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("088877","店经理","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("0554","南区总经理","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("012322","行政经理","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("0444","总监","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("097888","开发主管","经纪人"));
        eoaPositonRspModels.add(new EoaPositonRspModel("03322233","事务部","经纪人"));

        //搜索
        if (!StringUtils.isEmpty(positionReqModel.getKeyword())) {
            eoaPositonRspModels = eoaPositonRspModels
                    .stream()
                    .filter(a -> a.getPositionNo().indexOf(positionReqModel.getKeyword()) != -1 || a.getPositionName().indexOf(positionReqModel.getKeyword()) != -1)
                    .collect(Collectors.toList());
        }
        //分页
        eoaPositonRspModels = eoaPositonRspModels
                .stream()
                .skip((positionReqModel.getPageNo()-1)*positionReqModel.getPageSize())
                .limit(positionReqModel.getPageSize())
                .collect(Collectors.toList());

        return eoaPositonRspModels;
    }
}
