/**
 * ajax请求二次封装
 * @overview 在axios上二次封装的请求方法
 * @author [luoluo]
 * @version 2.0.0
 */
import qs from "qs";
import tips from "@/components/Tips/index";
import ajaxLoading from "@/components/AjaxLoading/index";
import confirm from "@/components/Confirm/index";
import axios from "axios";
import { ajaxConfig } from "./config";
const CancelToken = axios.CancelToken;
import { ajaxOptions, listAjaxOptions } from "./interface.d";
// 缓存锁
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

const request = axios.create({
  baseURL: ajaxConfig.urlHead,
  timeout: 30000,
  xsrfCookieName: "JSESSIONID",
  xsrfHeaderName: "X-XSRF-TOKEN",
  params: {},
  paramsSerializer: function(params) {
    return qs.stringify(params);
  },
  transformRequest: [
    function(data) {
      return data;
    }
  ],
  transformResponse: [
    function(data) {
      return data;
    }
  ],
  headers: {},
  withCredentials: true // 使前台能够保存cookie
});
// 添加请求拦截器
request.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
request.interceptors.response.use(
  (res: any) => {
    try {
      res.data = JSON.parse(res.data);
    } catch (err) {
      res.data = {};
    }
    if (res.status == 200 && res.data.code === 0) {
      return res.data;
    } else if (res.data.code === 10000) {
      return Promise.reject({
        msg: "用户未登录"
      });
    } else {
      return Promise.reject(res.data);
    }
  },
  function(error) {
    // 对响应错误做点什么
    tips("系统错误，请稍后再试");
    return Promise.reject(error);
  }
);
/**
 * 请求包装
 * @overview 包装了id锁定和ajaxloading
 */
function ajaxWrap(params: any) {
  let {
    url,
    data,
    method,
    id,
    hasLoading,
    confirmText,
    processData,
    ...options
  } = params;
  if (id) {
    if (ajaxLock[id]) {
      return Promise.reject({
        msg: "请勿重复操作"
      });
    } else {
      ajaxLock[id] = true;
    }
  }
  if (hasLoading) {
    ajaxLoading.service.show();
  }
  // const token=localStorage.getItem('token')
  // options.headers.token=token
  if (processData == true) {
    data = objectToFormData(data);
  }
  let result: Promise<any>;
  if (method && method.toLocaleUpperCase() == "GET") {
    result = request.get(url, {
      params: data
    });
  } else {
    result = request.post(url, data, options);
  }
  return result
    .then(res => {
      if (id) {
        ajaxLock[id] = false;
      }
      if (hasLoading) {
        ajaxLoading.service.hide();
      }
      return Promise.resolve(res);
    })
    .catch(err => {
      if (id) {
        ajaxLock[id] = false;
      }
      if (hasLoading) {
        ajaxLoading.service.hide();
      }
      return Promise.reject(err);
    });
}
/**
 * 普通ajax请求
 * @overview 包装了确认对话框
 */
export function ajax(params: ajaxOptions) {
  const { confirmText, ...options } = params;
  if (confirmText) {
    return new Promise((resolve, reject) => {
      return confirm({
        text: confirmText
      })
        .then(res => {
          ajaxWrap(options)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject({
            msg: "用户取消了操作"
          });
        });
    });
  } else {
    return ajaxWrap(params);
  }
}
/**
 * 列表请求方法
 * @overview 列表请求方法
 * @param options 初始化配置信息
 * @property listState 列表状态
 * @property pageTotal 页码总量
 * @property config 配置信息
 * @property getList 获取数据
 * @property delData 删除参数
 * @property changeData 改变参数
 * @property changeURL 改变url
 * @property refreshPage 刷新列表
 */
export class listAjax {
  listState: number = 0; // 0 加载中 1 正常加载 2 暂无数据 3 已无更多
  pageTotal: number = 1;
  config: listAjaxOptions;
  constructor(options: listAjaxOptions) {
    this.config = Object.assign(
      {
        data: {},
        method: "POST",
        current: 0,
        size: 10
      },
      options
    );
  }
  getList(current?: number) {
    if (this.listState !== 0) {
      return Promise.reject({
        msg: "list loading"
      });
    }
    this.listState = 0;
    if (current && current <= this.pageTotal) {
      this.config.current = current;
    } else {
      (<number>this.config.current)++;
    }
    return ajax({
      url: this.config.url,
      data: Object.assign(
        {
          current: this.config.current,
          size: this.config.size
        },
        this.config.data
      ),
      method: this.config.method
    })
      .then((res: any) => {
        this.pageTotal = res.data.pages;
        if (this.pageTotal === 0) {
          this.listState = 2;
        } else if (this.pageTotal === this.config.current) {
          this.listState = 3;
        } else {
          this.listState = 0;
        }
        return res;
      })
      .catch(err => {
        this.listState = 0;
        return Promise.reject(err);
      });
  }
  /**
   * 新增或改变参数
   * @param data 参数
   */
  changeData(data: object) {
    this.config.data = Object.assign(true, this.config.data, data);
  }
  /**
   * 删除参数
   * @param name 参数名
   */
  delData(name: string) {
    delete this.config.data[name];
  }
  /**
   * 改变请求url地址
   * @param url 新的请求地址
   */
  changeURL(url: string) {
    this.config.url = url;
  }
  /**
   * 重置列表,列表状态
   */
  refreshPage() {
    this.config.current = 0;
    this.getList(0);
  }
}
