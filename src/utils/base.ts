import { storage } from "./cookie";
import { key } from "./config";

/**
 * 基础方法库
 * @overview 基础方法库
 * @author [luoluo]
 * @version 2.0.0
 */

/**
 * 合并对象，以第一个有效对象为基础进行合并
 * @param {boolean} isDeep 是否深度合并
 * @param {object} objs 待合并对象数组
 */
export function extend(isDeep?: boolean, ...objs: object[]): any {
  var result;
  if (typeof arguments[0] === "boolean" && arguments[0] === true) {
    for (let k = 1; k < arguments.length; k++) {
      if (typeof arguments[k] === "object") {
        if (!result) {
          result = arguments[k];
          continue;
        }
        for (var key in arguments[k]) {
          if (typeof arguments[k][key] === "object") {
            result[key] = extend(true, result[key], arguments[k][key]);
          } else if (arguments[k][key]) {
            result[key] = arguments[k][key];
          }
        }
      }
    }
  } else {
    for (let i = 0; i <= arguments.length; i++) {
      if (typeof arguments[i] === "object") {
        if (!result) {
          result = arguments[i];
          continue;
        }

        for (const key in arguments[i]) {
          if (arguments[i][key]) {
            result[key] = arguments[i][key];
          }
        }
      }
    }
  }
  return result;
}

/**
 * 判断一个对象是否为数组
 * @param {object} obj 对象
 */
export function isArray(obj: any): boolean {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.length === "number" &&
    typeof obj.splice === "function" &&
    !obj.propertyIsEnumerable("length")
  );
}

/**
 * 延迟对象
 * @constructor
 * @property {number} state 状态
 * @property {function} resolve 将状态置为成功
 * @property {function} reject 将状态置为失败
 * @property {function} done 绑定成功回调
 * @property {function} fail 绑定失败回调
 * @property {function} then 绑定完成回调
 */
export class Deferred {
  state: number;
  param: any;
  doneFn: Function[] = [];
  failFn: Function[] = [];
  thenFn: Function[] = [];
  constructor() {
    this.state = 0;
  }
  resolve(...arg: any[]) {
    if (this.state === 0) {
      this.state = 2;
      this.param = arg;
    }
    this.check();
  }
  reject(...arg: any[]) {
    if (this.state === 0) {
      this.state = 1;
      this.param = arguments;
      this.check();
    }
  }
  done(method: Function) {
    this.doneFn.push(method);
    this.check();
    return this;
  }
  fail(method: Function) {
    this.failFn.push(method);
    this.check();
    return this;
  }
  then(method: Function) {
    this.thenFn.push(method);
    this.check();
    return this;
  }
  check() {
    if (this.state === 2) {
      this.doList("doneFn", arguments);
      this.doList("thenFn", arguments);
    } else if (this.state === 1) {
      this.doList("failFn", arguments);
      this.doList("thenFn", arguments);
    }
  }
  doList(name: "doneFn" | "thenFn" | "failFn", arg?: any) {
    while (this[name].length > 0) {
      const item = this[name].shift();
      (<Function>item).apply(this, arg);
    }
  }
}

/**
 * 将多个延迟对象封装成一个
 * @param {Deferred} 延迟对象
 */
export function deferredAll() {
  const def = new Deferred();
  const result: any[] = [];
  let state = true;
  let length = arguments.length;
  for (let item of arguments) {
    item.done(function(res: any) {
      result.push(res);
      checked();
    });
    item.fail(function(res: any) {
      result.push(res);
      state = false;
      checked();
    });
  }

  function checked(this: any) {
    if (result.length === length) {
      if (state) {
        def.resolve.apply(this, result);
      } else {
        def.reject.apply(this, result);
      }
    }
  }
  return def;
}

/**
 * 随机数算法
 * @param {number} seed 种子
 */
export function random(seed: number) {
  seed = seed || new Date().getTime();
  return ((seed * 9301 + 49297) % 233280) / 233280;
}

/**
 * 生成guid
 */
export function guid() {
  function getChat() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    getChat() +
    getChat() +
    "-" +
    getChat() +
    "-" +
    getChat() +
    "-" +
    getChat() +
    "-" +
    getChat() +
    getChat() +
    getChat()
  );
}

/**
 * 缓存函数
 * @overview 缓存函数，用来缓存结果
 * @param {function} func 需要缓存的函数
 * @param {object} obj this
 */
export function mmoize(func: Function, obj?: object) {
  obj = obj || {};
  let cache: any = {};
  return function() {
    const key: string = Array.prototype.join.call(arguments, "_");
    if (!(key in cache)) {
      cache[key] = func.apply(obj, arguments);
    }
    return cache[key];
  };
}

/**
 * 序列化数据用于Ajax,数据会被转换为key/value形式
 * @param {Array|object} data 原始数据
 * @returns {object} formData
 */
export function serialize(data: any): FormData {
  const formData = new FormData();

  function conversion(data: any, name: string | null | undefined) {
    const isFirst = name === "" || name === undefined || name === null;
    for (let item in data) {
      if (typeof data[item] === "object") {
        conversion(data[item], isFirst ? item : name + "[" + item + "]");
      } else {
        formData.append(isFirst ? item : name + "[" + item + "]", data[item]);
      }
    }
  }
  conversion(data, "");
  return formData;
}

/**
 * 将列表数据转化为树状结构数据
 * @param {Array} treeList 原始数据
 * @param {object} treeConfig 配置
 */
export function convertTree(
  treeList: { [x: string]: any }[],
  treeConfig: any
): any[] {
  const setting = Object.assign(
    {
      rootID: 0, //根节点的值
      Fkey: "fcode", //子节点指向父节点的key
      Fid: "id", //父节点的key
      Skey: "children" //生成子节点名字
    },
    treeConfig
  );

  function querySon(condition: any): any[] {
    const temp = [];
    for (let i = 0; i < treeList.length; i++) {
      if (treeList[i][setting.Fkey] === condition) {
        temp.push(treeList.splice(i, 1)[0]);
        i--;
      }
    }
    if (temp.length > 0) {
      for (let j = 0; j < temp.length; j++) {
        const result = querySon(temp[j][setting.Fid]);
        if (result.length > 0) {
          temp[j][setting.Skey] = result;
        }
      }
    }
    return temp;
  }
  return querySon(setting.rootID);
}

const _keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
/**
 * base64数据数据加解密方法
 * @property {function} encode 加密方法
 * @property {function} decode 解密方法
 */
export const base64 = {
  // public method for encoding
  encode: function(input: string): string {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = this._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        _keyStr.charAt(enc1) +
        _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) +
        _keyStr.charAt(enc4);
    }
    return output;
  },
  // public method for decoding
  decode: function(input: string): string {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9+/=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this._utf8_decode(output);
    return output;
  },
  // private method for UTF-8 encoding
  _utf8_encode: function(str: string) {
    str = str.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < str.length; n++) {
      var c = str.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  // private method for UTF-8 decoding
  _utf8_decode: function(utftext: string): string {
    let str = "";
    let i = 0;
    let c = 0,
      c3 = 0,
      c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        str += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        str += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }
    return str;
  }
};

/**
 * 文件获取方法
 * @overview 获取文件流，在回调函数中会带上Blob对象,注意未指定文件类型，需要自行处理文件类型
 * @param {string} url url地址
 * @param {function} callBack 回调函数
 */
export function getFile(
  url: string,
  type: any,
  callBack: (arg0: Blob, arg1: { type: any }) => void
) {
  const XHR = new XMLHttpRequest();
  XHR.open("GET", url, true);
  XHR.responseType = "arraybuffer";
  XHR.setRequestHeader(key.tokenKey, storage.get(key.tokenKey));
  XHR.onload = function(oEvent) {
    const content = XHR.response;
    if (callBack) {
      callBack(new Blob([content]), {
        type: type
      });
    }
  };
  XHR.send();
}

/**
 * 多线程管理器
 * @overview 创建多线程管理器，用于处理复杂的数据
 * @constructor
 * @param {function} init 初始化方法
 * @param {function} sendData 发送数据方法
 * @param {function} packageData 包装数据方法
 * @param {function} analysisData 解析数据方法
 * @param {function} handle 解析事务方法
 * @param {function} terminate 关闭多线程方法
 */
export class WorkerManage {
  config: any;
  worker: Worker | undefined;
  constructor(options: any) {
    this.config = Object.assign(
      {
        version: "1.0",
        url: "/js/worker.js",
        name: "app",
        to: "worker",
        handle: {}
      },
      options
    );
    this.init();
  }
  init() {
    this.worker = new Worker(this.config.url);
    this.worker.onmessage = (data: { data: any }) => {
      this.analysisData(data.data);
    };
  }
  sendData(data: {
    version: any;
    timestamp: number;
    from: any;
    to: any;
    key: string;
    handle: any;
  }) {
    if (!this.worker) {
      this.init();
    }
    (<Worker>this.worker).postMessage(data);
  }
  packageData(data: { data: any; key: string }) {
    let message = {
      version: this.config.version,
      timestamp: new Date().getTime(),
      from: this.config.name,
      to: this.config.to,
      key: data.key,
      handle: data.data
    };
    this.sendData(message);
  }
  analysisData(result: {
    to: any;
    timestamp: number;
    key: string | number;
    data: { code: number; data: any };
  }) {
    try {
      if (result.to !== this.config.name) {
        throw new Error("name error");
      }
      if (new Date().getTime() - result.timestamp > 60000) {
        throw new Error("time out");
      }
      if (!this.config.handle[result.key]) {
        throw new Error("handle missing");
      }
      if (result.data.code === 0) {
        this.config.handle[result.key](result.data.data);
      } else {
        throw new Error("handle error");
      }
    } catch (e) {
      console.error(e);
    }
  }
  handle() {
    let key = Math.random();
    let name = arguments[0];
    let data = arguments.length === 3 ? arguments[1] : {};
    let callback = arguments.length === 3 ? arguments[2] : arguments[1];
    if (typeof callback === "function") {
      this.config.handle[key] = callback;
    }
    this.packageData({
      data: {
        name: name,
        data: data
      },
      key: key.toString()
    });
  }
  terminate() {
    (<Worker>this.worker).terminate();
    this.worker = undefined;
  }
}

/**
 * 判断运行环境
 */
export function userAgent(): string {
  var wx = (function() {
    return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
  })();
  if (wx) {
    return "wx";
  }
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return "mobile";
  } else {
    return "pc";
  }
}
