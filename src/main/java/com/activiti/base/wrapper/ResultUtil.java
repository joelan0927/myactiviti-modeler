package com.activiti.base.wrapper;

import lombok.Data;

import java.io.Serializable;

/**
 * @program: danxia
 * @description: 同一返回结果类
 * @author: youxiong
 * @create: 2018-09-27 14:31
 **/
@Data
public class ResultUtil<T> implements Serializable {
    private Integer status; //0处理成功  -1处理失败
    private Integer code;
    private String msg;
    private T data;
    private Integer total;

    public ResultUtil(Integer status, Integer code, String msg) {
        this.status = status;
        this.code = code;
        this.msg = msg;
    }

    public ResultUtil(Integer status, Integer code, String msg,T data) {
        this.status = status;
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public ResultUtil(Integer status, Integer code, String msg,T data,Integer total) {
        this.status = status;
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.total=total;
    }

    public static ResultUtil success() {
        return success(0, "SUCCESS");
    }

    public static<T> ResultUtil success(T data) {
        return success(0, "SUCCESS",data);
    }

    public static ResultUtil success(Integer code, String msg) {
        return success(code, msg, null);
    }

    public static ResultUtil success(Integer code, String msg, Object data) {
        if (data == null) {
            return new ResultUtil(0, code, msg);
        }
        return new ResultUtil(0, code, msg, data);
    }

    public static ResultUtil failure(Integer code, String msg) {
        return new ResultUtil(-1, code, msg);
    }

    public static ResultUtil failure(Integer code, String msg, Object data) {
        return new ResultUtil(-1, code, msg, data);
    }
}
