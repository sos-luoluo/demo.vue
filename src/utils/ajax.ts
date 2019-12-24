/**
 * ajax请求二次封装
 * @overview 在axios上二次封装的请求方法
 * @author [luoluo]
 * @version 2.0.0
 */
import { Message } from "view-design";
import axios from "axios";
import { ajaxConfig } from "./config";
const ajaxLock: any = {};
// 序列化参数
function objectToFormData(
  obj: object,
  rootName?: string,
  ignoreList?: Array<any>
) {
  var formData = new FormData();
  function appendFormData(data: any, root?: string) {
    if (!ignore(root)) {
      root = root || "";
      if (data instanceof File) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          appendFormData(data[i], root + "[" + i + "]");
        }
      } else if (typeof data === "object" && data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (root === "") {
              appendFormData(data[key], key);
            } else {
              appendFormData(data[key], root + "." + key);
            }
          }
        }
      } else {
        if (data !== null && typeof data !== "undefined" && data !== "") {
          formData.append(root, data);
        }
      }
    }
  }
  function ignore(root?: string) {
    return (
      Array.isArray(ignoreList) &&
      ignoreList.some(function(x) {
        return x === root;
      })
    );
  }
  appendFormData(obj, rootName);
  return formData;
}

const ajax = axios.create({
  baseURL: ajaxConfig.urlHead,
  timeout: 30000,
  xsrfCookieName: "JSESSIONID",
  withCredentials: true // 使前台能够保存cookie
});

// 添加请求拦截器
ajax.interceptors.request.use(
  (config: any) => {
    if (config.data && config.data.lockId) {
      if (ajaxLock[config.data.lockId]) {
        throw new Error("请勿重复操作");
      } else {
        ajaxLock[config.data.lockId] = true;
        config.id = config.data.lockId;
        delete config.data.lockId;
      }
    }
    // 是否需要序列化数据
    if (config.processData) {
      delete config.processData;
      config.data = objectToFormData(config.data);
    }
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
ajax.interceptors.response.use(
  (res: any) => {
    // 对响应数据做点什么
    if (res.config.id) {
      delete ajaxLock[res.config.id];
    }
    if (res.data.code === 0) {
      return res;
    } else {
      if (res.data.code === 10000) {
        // 处理登录相关的错误
      } else {
        // 其它错误弹出错误信息
      }
      return Promise.reject(res);
    }
  },
  function(error) {
    // 对响应错误做点什么
    (<any>Message).error("系统错误，请稍后再试");
    return Promise.reject(error);
  }
);
