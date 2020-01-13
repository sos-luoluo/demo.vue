import { logItem } from "./interface";
/**
 * 日志管理器
 * @overview 目前版本暂时只记录错误信息，供调试用
 * @constructor
 * @author [luoluo]
 * @version 2.0.0
 */
class LogManager {
  logList: Array<any>;
  constructor() {
    const temp: string | null = localStorage.getItem("log");
    if (temp) {
      this.logList = JSON.parse(temp);
    } else {
      this.logList = [];
    }
  }
  pushMsg(msg: logItem) {
    if (this.logList.length > 200) {
      this.logList.shift();
    }
    this.logList.push(msg);
    this.save();
  }
  getData() {
    return this.logList;
  }
  clear() {
    this.logList = [];
    this.save();
  }
  save() {
    localStorage.setItem("log", JSON.stringify(this.logList));
  }
}

const logManager = new LogManager();
const errorLog = console.error;
console.error = function() {
  logManager.pushMsg({
    msg: arguments[0],
    time: Date.now(),
    type: "error"
  });
  errorLog(...arguments);
};
(<any>window).getLog = function() {
  return logManager.getData();
};

export default logManager;
