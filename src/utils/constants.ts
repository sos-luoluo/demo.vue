/**
 * 静态数据文件
 * @overview 项目使用的静态数据
 * @author [luoluo]
 * @version 2.0.0
 */

/**
 * 虚拟用户
 * @property {string} openID openID
 * @property {string} name 昵称
 * @property {string} headPortrait 头像
 */
export const NPCInfo = {
  openID: "oCkn-0LsCAirFyL9nQ80myluoluo",
  name: "落落",
  headPortrait:
    "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI2iasISZ1LOFONyGqyKiaEkbIIvyLPyz9cz1hocv2rcBwgGuqib2Y5BmD3YDSLcsUjc8PQXb9YdsKhg/0"
};

const numLib = "0123456789".split("");
const characterLib = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
  ""
);
/**
 * 字典库
 * @property {array} int 整型数字字典库
 * @property {array} char 字母字典库
 * @property {array} intAndchar 整型数字字母字典库
 * @property {array} week 星期字典库，可以用来处理星期显示格式
 * @property {array} numCn 中文数字字典库
 */
export const wordLib = {
  int: numLib,
  char: characterLib,
  charAndNum: numLib.concat(characterLib),
  week: "日一二三四五六".split(""),
  numCn: "零一二三四五六七八九十".split("")
};

/**
 * 正则表达式
 * @property {RegExp} phone 电话号码
 * @property {RegExp} code 验证码校验
 * @property {RegExp} chinese 中文字符1-10个
 * @property {RegExp} email 邮箱地址
 * @property {RegExp} id 身份证号
 * @property {RegExp} password 普通密码6-20位
 * @property {RegExp} num 纯数字
 * @property {RegExp} floatNum 浮点数字
 * @property {RegExp} character 纯字母
 * @property {RegExp} carNum 车牌号
 * @property {RegExp} bankCard 银行卡
 */
export const regular = {
  phone: /^1[3|4|5|7|8|9][0-9]{9}$/,
  code: /^\d{6}$/,
  chinese: /^[\u4e00-\u9fa5]{1,10}$/,
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  url: /[a-zA-z]+:\/\/[^\s]*/,
  id: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
  password: /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/,
  num: /^\d{1,}$/,
  floatNum: /^\d+(\.\d+)?$/,
  character: /^[a-zA-Z]{1,}$/,
  carNum: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  bankCard: /^([1-9]{1})([0-9]{15,19})$/
};
