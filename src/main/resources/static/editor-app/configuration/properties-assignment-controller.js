/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
 * Assignment
 */
var KisBpmAssignmentCtrl = ['$scope', '$modal', function ($scope, $modal) {

    // Config for the modal window
    var opts = {
        template: 'editor-app/configuration/properties/assignment-popup.html?version=' + Date.now(),
        scope: $scope
    };

    // Open the dialog
    $modal(opts);
}];

var KisBpmAssignmentPopupCtrl = ['$scope','$http', function ($scope,$http) {

    // Put json representing assignment on scope
    if ($scope.property.value !== undefined && $scope.property.value !== null
        && $scope.property.value.assignment !== undefined
        && $scope.property.value.assignment !== null) {
        $scope.assignment = $scope.property.value.assignment;
    } else {
        $scope.assignment = {};
    }

    if ($scope.assignment.candidateUsers == undefined || $scope.assignment.candidateUsers.length == 0) {
        $scope.assignment.candidateUsers = [{value: ''}];
    }

    // Click handler for + button after enum value
    var userValueIndex = 1;
    $scope.addCandidateUserValue = function (index) {
        $scope.assignment.candidateUsers.splice(index + 1, 0, {value: 'value ' + userValueIndex++});
    };

    // Click handler for - button after enum value
    $scope.removeCandidateUserValue = function (index) {
        $scope.assignment.candidateUsers.splice(index, 1);
    };

    if ($scope.assignment.candidateGroups == undefined || $scope.assignment.candidateGroups.length == 0) {
        $scope.assignment.candidateGroups = [{value: ''}];
    }

    var groupValueIndex = 1;
    $scope.addCandidateGroupValue = function (index) {
        $scope.assignment.candidateGroups.splice(index + 1, 0, {value: 'value ' + groupValueIndex++});
    };

    // Click handler for - button after enum value
    $scope.removeCandidateGroupValue = function (index) {
        $scope.assignment.candidateGroups.splice(index, 1);
    };

    $scope.save = function () {

        $scope.property.value = {};
        handleAssignmentInput($scope);
        $scope.property.value.assignment = $scope.assignment;

        $scope.updatePropertyInModel($scope.property);
        $scope.close();
    };

    $scope.search = function(){
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.keyword);
    };
    $scope.clear = function(){
        $scope.keyword = "";
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.keyword);
    };



    // Close button handler
    $scope.close = function () {
        handleAssignmentInput($scope);
        $scope.property.mode = 'read';
        $scope.$hide();
    };

    var handleAssignmentInput = function ($scope) {
        if ($scope.assignment.candidateUsers) {
            var emptyUsers = true;
            var toRemoveIndexes = [];
            for (var i = 0; i < $scope.assignment.candidateUsers.length; i++) {
                if ($scope.assignment.candidateUsers[i].value != '') {
                    emptyUsers = false;
                }
                else {
                    toRemoveIndexes[toRemoveIndexes.length] = i;
                }
            }

            for (var i = 0; i < toRemoveIndexes.length; i++) {
                $scope.assignment.candidateUsers.splice(toRemoveIndexes[i], 1);
            }

            if (emptyUsers) {
                $scope.assignment.candidateUsers = undefined;
            }
        }

        if ($scope.assignment.candidateGroups) {
            var emptyGroups = true;
            var toRemoveIndexes = [];
            for (var i = 0; i < $scope.assignment.candidateGroups.length; i++) {
                if ($scope.assignment.candidateGroups[i].value != '') {
                    emptyGroups = false;
                }
                else {
                    toRemoveIndexes[toRemoveIndexes.length] = i;
                }
            }

            for (var i = 0; i < toRemoveIndexes.length; i++) {
                $scope.assignment.candidateGroups.splice(toRemoveIndexes[i], 1);
            }

            if (emptyGroups) {
                $scope.assignment.candidateGroups = undefined;
            }
        }
    };


    /*---------------------流程设计器扩展用户与用户组--------------------*/

    //参数初始化
    $scope.gridData = [];//表格数据
    $scope.gridDataName = 'gridData';
    $scope.selectTitle = '选择委托人';
    $scope.columnData = [];//表格列数据
    $scope.columnDataName = 'columnData';
    $scope.selectType = 0;//0-委托人，1-候选人，2-候选组
    $scope.totalServerItems = 0;//表格总条数
    $scope.keyword='';//关键字搜索
    //分页初始化
    $scope.pagingOptions = {
        pageSizes: [10, 20, 30],//page 行数可选值
        pageSize: 10, //每页行数
        currentPage: 1, //当前显示页数
    };
    //Grid 筛选
    $scope.projects = [];
    $scope.selectedProject = -1;


    //异步请求项目列表数据
    $scope.getProjectDataAsync = function () {
        $http({
            method: 'POST',
            url: '/model/getActivitiEmployee?pageNo=1&pageSize=10'
        }).then(function successCallback(response) {
            debugger;
            $scope.projects = response.data.data;
            if ($scope.projects.length > 0) {
                $scope.selectedProject = $scope.projects[0].empNo;
            }
            $scope.dataWatch();
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log("项目列表请求失败！");
        });
    };
    $scope.getProjectDataAsync();
    //数据监视
    $scope.dataWatch = function () {
        //分页数据监视
        $scope.$watch('pagingOptions', function (newValue, oldValue) {
            if ($scope.selectType == 0 || $scope.selectType == 1) {
                $scope.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.keyword);
            }else {
                $scope.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.keyword);
            }
        }, true);

        //当切换类型时，初始化当前页
        $scope.$watch('selectType', function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.pagingOptions.currentPage = 1;
                $scope.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
            }
        }, true);

        //切换平台
        $scope.change = function (x) {
            $scope.selectedProject = x;
            $scope.getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
        };

        $scope.changeKeyword = function (val) {
            $scope.keyword = val;
        };
    };

    $scope.dataWatch();

    //异步请求表格数据
    $scope.getPagedDataAsync = function (pageNum, pageSize, keyword) {
        var url;
        if ($scope.selectType == 2) {
            url = '/model/getActivitiPositionGroup';
            $scope.columnData = $scope.groupColumns;
        } else {
            url = '/model/getActivitiEmployee';
            $scope.columnData = $scope.userColumns;
        }
        $http({
            method: 'POST',
            url: url,
            params: {
                'pageNo': pageNum,
                'pageSize': pageSize,
                'keyword':keyword
            }
        }).then(function successCallback(response) {
            $scope.gridData = response.data.data;
            $scope.totalServerItems = response.data.total;
        }, function errorCallback(response) {
            // 请求失败执行代码
            $scope.gridData = [];
            $scope.totalServerItems = 0;
        });
    };
    //表格属性配置
    $scope.gridOptions = {
        data: $scope.gridDataName,
        multiSelect: false,//不可多选
        enablePaging: true,
        pagingOptions: $scope.pagingOptions,
        totalServerItems: 'totalServerItems',
        i18n: 'zh-cn',
        showFooter: true,
        showSelectionCheckbox: false,
        columnDefs: $scope.columnDataName,
        beforeSelectionChange: function (event) {
            var data = event.entity.empNo;
            if ($scope.selectType == 0) {//选委托人
                event.entity.checked = !event.selected;
                $scope.assignment.assignee = data;
            } else if ($scope.selectType == 1) {//候选人
                var obj = {value: data};
                if (!array_contain($scope.assignment.candidateUsers, obj.value)) {
                    $scope.assignment.candidateUsers.push(obj);
                }
            } else if ($scope.selectType == 2) {//候选组
                var obj = {value: event.entity.positionNo};
                if (!array_contain($scope.assignment.candidateGroups, obj.value)) {
                    $scope.assignment.candidateGroups.push(obj);
                }
            }
            return true;
        }
    };

    //选择用户时表头
    $scope.userColumns = [
        {
            field: 'empNo',
            displayName: '员工编号',
            minWidth: 100,
            width: '18%'
        },
        {
            field: 'empName',
            displayName: '员工姓名',
            minWidth: 100,
            width: '25%'
        },
        {
            field: 'jobName',
            displayName: '职务名称',
            minWidth: 100,
            width: '25%'
        },
        {
            field: 'deptName',
            displayName: '部门名称'
            // cellClass:'txt-center'
        }
    ];

    //选择用户组时表头
    $scope.groupColumns = [
        {
            field: 'positionNo',
            displayName: '职务编号',
            minWidth: 100,
            width: '20%'
        },
        {
            field: 'positionName',
            displayName: '职务名称',
            minWidth: 100,
            width: '40%'
        },
        {
            field: 'positionType',
            displayName: '职务类型'
        }
    ];

    //代理人(审批人)
    $scope.selectAssignee = function () {
        $scope.selectType = 0;
        $scope.selectTitle = '选择委托人';
    };

    //候选人
    $scope.selectCandidate = function () {
        $scope.selectType = 1;
        $scope.selectTitle = '选择候选人';
    };

    //候选组
    $scope.selectGroup = function () {
        $scope.selectType = 2;
        $scope.selectTitle = '选择候选组';
    };

    //声明----如果有此 contains 直接用最好
    function array_contain(array, obj) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].value == obj)//如果要求数据类型也一致，这里可使用恒等号===
                return true;
        }
        return false;
    }

}];