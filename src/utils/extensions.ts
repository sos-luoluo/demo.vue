/**
 * 原生方法扩展
 * @overview 扩展JS原生方法，方便使用
 * @author [luoluo]
 * @version 2.0.0
 */

/**
 * 数组求和
 * @param {function|string|undefined} propertyOrFunc
 */
Object.defineProperty(Array.prototype, "sum", {
  value: function(propertyOrFunc: string | undefined | Function): number {
    let total: number = 0;
    for (let i: number = 0; i < this.length; i++) {
      total +=
        typeof propertyOrFunc === "function"
          ? propertyOrFunc(this[i])
          : typeof propertyOrFunc === "string"
          ? this[i][propertyOrFunc]
          : this[i];
    }
    return total;
  }
});

interface Array<T> {
  sum(propertyOrFunc: string | undefined | Function): number;
}

/**
 * 数组分组
 * @param {function} fn
 */
Object.defineProperty(Array.prototype, "groupBy", {
  value: function(fn: Function): Array<any> {
    const groups: any = {};
    this.forEach(function(item: any, i: number) {
      const group: string = JSON.stringify(fn(item, i));
      groups[group] = groups[group] || [];
      groups[group].push(item);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  }
});

/**
 * 获取map的长度
 */
Object.defineProperty(Map.prototype, "getLength", {
  value: function(): number {
    let count = 0;
    this.forEach(() => {
      count++;
    });
    return count;
  }
});

/**
 * 将对象转变为字符,支持递归
 */
Object.defineProperty(Object.prototype, "string", {
  value: function(): string {
    const result = [];
    for (let key in this) {
      result.push(
        typeof this[key] == "object"
          ? this[key].string()
          : key + "=" + this[key]
      );
    }
    return result.join("&");
  }
});

/**
 * 判断对象是否为空对象
 */
Object.defineProperty(Object.prototype, "isEmpty", {
  value: function(): boolean {
    const keys = Object.keys(this);
    return keys.length === 0;
  }
});

/**
 * 判断对象是否为数组
 */
// Object.defineProperty(Object.prototype, "isArray", {
//   value: function(): boolean {
//     return (
//       typeof this === "object" &&
//       typeof (<number | undefined>this.length) === "number" &&
//       typeof this.splice === "function"
//     );
//   }
// });
