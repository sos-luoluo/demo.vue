/**
 * 缓存存取方法
 * @overview cookie和localStorage操作方法
 * @author [luoluo]
 * @version 2.0.0
 */

/**
 * cookie操作方法
 * @property {function} set 设置方法
 * @property {function} get 获取方法
 * @property {function} del 删除方法
 */
export const cookie = {
  set: function(key: string, value: any, time?: number): void {
    if (time) {
      const expires = time * 1000;
      const date = new Date(new Date().getTime() + expires);
      document.cookie =
        key + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
      document.cookie = key + "=" + escape(value);
    }
  },
  get: function(key: string): any {
    let arr,
      reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  del: function(key: string): void {
    const time = new Date(1000);
    const value = this.get(key);
    if (value != null) {
      document.cookie = key + "=" + value + ";expires=" + time.toUTCString();
    }
  }
};

/**
 * localStorage操作方法
 * @property {function} set 设置方法
 * @property {function} get 获取方法
 * @property {function} del 删除方法
 * @property {function} clear 清除方法
 */
export const storage = {
  set: function(key: string, value: any): void {
    const storage = window.localStorage;
    storage && storage.removeItem(key);
    storage && storage.setItem(key, value);
  },
  get: function(key: string): any {
    const storage = window.localStorage;
    return storage && storage.getItem(key);
  },
  del: function(key: string): void {
    const storage = window.localStorage;
    storage && storage.removeItem(key);
  },
  clear: function(): void {
    const storage = window.localStorage;
    storage.clear();
  }
};
