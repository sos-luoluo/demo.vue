import { wordLib } from "./constants";

/**
 * 工具箱
 * @overview 常用工具方法
 * @author [luoluo]
 * @version 2.0.0
 */

export default {
  /**
   * 时间转化为指定格式，例yyyy-MM-dd hh:mm:ss ww
   * @param {number} timestamp 时间戳
   * @param {string} format 输出格式
   */
  timeFormat: function(timestamp: number, format: string): any {
    let time;
    try {
      if (timestamp < 4100000000) {
        timestamp = timestamp * 1000;
      }
      time = new Date(timestamp);
    } catch (error) {
      return timestamp;
    }
    const week = wordLib.week;
    const y = time.getFullYear();
    const M = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    format = format.replace(/[y]{4}/, y.toString());
    format = format.replace(/[M]{2}/, M > 9 ? M.toString() : "0" + M);
    format = format.replace(/[d]{2}/, d > 9 ? d.toString() : "0" + d);
    format = format.replace(/[h]{2}/, h > 9 ? h.toString() : "0" + h);
    format = format.replace(/[m]{2}/, m > 9 ? m.toString() : "0" + m);
    format = format.replace(/[s]{2}/, s > 9 ? s.toString() : "0" + s);
    format = format.replace(/[w]{2}/, week[time.getDay()]);
    return format;
  },
  /**
   * 价格数据处理，可以取整，取两位小数，或者只取小数
   * @param {number} price 价格
   * @param {string} format 输出格式
   */
  priceFormat: function(price: number, format?: string): any {
    if (isNaN(price)) {
      return price;
    }
    if (format === "int") {
      return Math.floor(price);
    } else if (format === "float") {
      return price.toFixed(2).split(".")[1];
    } else {
      return price.toFixed(2);
    }
  },
  /**
   * 返回两位数，返回格式可能为数字或字符
   * @param {string} num 输入数字
   */
  doubleDigit: function(num: number | string): number | string {
    return num > 9 ? num : "0" + num;
  },
  /**
   * 将字符串分割为指定宽度的数组
   * @param {string} str 输入数据
   * @param {number} width 宽度
   */
  splitString(str: string, width: number): string[] {
    const res = [];
    for (var i = 0; i < str.length; i += width) {
      res.push(str.slice(i, i + width));
    }
    return res;
  },
  /**
   *查询数组极大值和极小值
   *@param {Array} arr 数组
   *@param {string} key key,可选
   */
  getArrayPeak(arr: Array<any>, key?: string): { max: any; min: any } {
    let max = arr[0];
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
      if (key && typeof arr[i] == "object") {
        arr[i].index = i;
        if (arr[i][key] > max[key]) {
          max = arr[i];
        }
        if (arr[i][key] < min[key]) {
          min = arr[i];
        }
      } else {
        if (arr[i] > max) {
          max = arr[i];
        }
        if (arr[i] < min) {
          min = arr[i];
        }
      }
    }
    return {
      max: max,
      min: min
    };
  },
  /**
   * 数字分段显示
   * @param {string} num 输入数字
   */
  numberSection(num: number): string {
    const numArr = num.toString().split("");
    const result = [];
    let total = 0;
    while (numArr.length > 0) {
      if ((result.length - total) % 3 == 0 && result.length > 0) {
        result.unshift(",");
        total++;
      }
      result.unshift(numArr.pop());
    }
    return result.join("");
  },
  /**
   * 只取一个图片地址
   * @param {number} urlString 输入地址
   */
  onlyOneImg: function(urlString: string): string {
    return urlString.split(",")[0];
  },
  /**
   * 返回随机字符串
   * @param {number} length 长度
   */
  randomChars: function(length: number): string {
    let str = "";
    const maxRandom = wordLib.charAndNum.length;
    for (var i = 0; i < length; i++) {
      str += wordLib.charAndNum[Math.floor(Math.random() * maxRandom)];
    }
    return str;
  },
  /**
   * 时间转化为指定天时分秒
   * @param {number} time 时间
   * @param {string} format 输出格式
   */
  timeIntervalChange: function(time: number, format: string): string {
    format = format.replace(/[d]{2}/i, Math.floor(time / 86400).toString());
    format = format.replace(
      /[h]{2}/i,
      this.doubleDigit(Math.floor((time % 86400) / 3600)).toString()
    );
    format = format.replace(
      /[m]{2}/i,
      this.doubleDigit(Math.floor((time % 3600) / 60)).toString()
    );
    format = format.replace(
      /[s]{2}/i,
      this.doubleDigit(Math.floor(time % 60)).toString()
    );
    return format;
  },
  /**
   * 时间差转化，格式为几分钟之前，几个小时之前，具体时间
   * @param {number} time 时间
   */
  timeAgo: function(time: number): string {
    const difference = new Date().getTime() - time;
    if (difference < 60 * 60 * 1000) {
      return Math.floor(difference / (1000 * 60)) + "分钟以前";
    } else if (difference < 24 * 60 * 60 * 1000) {
      return Math.floor(difference / (1000 * 60 * 60)) + "小时以前";
    } else {
      return this.timeFormat(Math.floor(time / 1000), "yyyy-MM-dd");
    }
  },
  /**
   * 获取url参数
   * @param {string} name 参数名称
   */
  getUrlParam: function(name: string): string | null {
    let url = window.location.href;
    const reg = new RegExp("(^|[&|?])" + name + "=([^[&|\\#]*)([&|#]|$)", "i");
    const r = url.match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  },
  /**
   * 转换数据进制
   * @param {number} num 输入十进制数字
   * @param {number} log 输出进制
   */
  changeLog(num: number, log: number): string {
    const int: number[] = [];
    function getInt() {
      const now: number = num % log;
      int.unshift(now);
      num = Math.floor(num / log);
      if (num > 0) {
        getInt();
      }
    }
    getInt();
    return int
      .map(function(item: number) {
        return wordLib.charAndNum[item];
      })
      .join("");
  },
  /**
   *@desc 判断是否为微信环境
   *@author 王磊
   *@date 2019/07/08 20:26:56
   */
  isWeiXin: function(): boolean {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 获取纯净的数据模型
   * @param {number} data 输入数据
   */
  getPureModel(data: any): any {
    return JSON.parse(JSON.stringify(data));
  },
  /**
   * 地址跳转
   * @param {string} url 跳转地址
   * @param {boolean} isReplace 是否保存本页历史记录
   */
  urlJump: function(url: string, isReplace?: boolean): void {
    if (isReplace === true) {
      window.location.replace(url);
    } else {
      window.location.href = url;
    }
  },
  /**
   * 数据单位转换，会转化为亿、万的单位,分隔数字
   * @param {number} num 输入数字
   */
  numberConvert(value: number): any {
    if (isNaN(value)) {
      return value;
    }
    if (value > 100000000) {
      let res = (value / 100000000)
        .toFixed(2)
        .toString()
        .split(".");
      return (
        this.numberSection(parseInt(res[0])) +
        (res[1] ? "." + res[1] : "") +
        "亿"
      );
    } else if (value > 10000) {
      let res = (value / 10000)
        .toFixed(2)
        .toString()
        .split(".");
      return (
        this.numberSection(parseInt(res[0])) +
        (res[1] ? "." + res[1] : "") +
        "万"
      );
    } else {
      let res = value
        .toFixed(2)
        .toString()
        .split(".");
      return (
        this.numberSection(parseInt(res[0])) + (res[1] ? "." + res[1] : "")
      );
    }
  },
  /**
   * 价格处理,依据情况保留小数,不能有负值
   * @param {number} num 输入数字
   * @param {number} len 保留数字长度的位数
   */
  priceConvert(value: number, len: number = 4): number {
    if (value > 1) {
      return parseFloat(value.toFixed(len)) - 0;
    } else if (value < 1 && value > 0.000001) {
      // 最多保留两位有效数字
      let valueString = value.toString().split("");
      let index = 0;
      let state = false;
      let isSub = false;
      let j = 0;
      for (var i = 0; i < valueString.length; i++) {
        if (valueString[i] === ".") {
          state = true;
        }
        if (state && valueString[i] !== ".") {
          j++;
        }
        if (state && valueString[i] !== "." && valueString[i] !== "0") {
          index++;
        }
        if (index >= len || (j >= len && index >= 1)) {
          break;
        }
      }
      return parseFloat(value.toFixed(j)) - 0;
    } else {
      return parseFloat(value.toFixed(8)) - 0;
    }
  }
};
