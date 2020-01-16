/**
 * 项目配置文件
 * @overview 配置文件，需要配置的信息均写在该文件里
 * @author [luoluo]
 * @version 2.0.0
 */

/**
 * 项目执行环境
 */
export const environment = process.env.NODE_ENV;

/**
 * 程序版本
 */
export const version = "1.0";

/**
 * 项目配置
 * @property {string} nameCn 项目中文名字
 * @property {string} nameEn 项目英文名字
 * @property {number} webId 项目ID，0coinin,1bimao
 */
export const projectInfo = {
  nameCn: "",
  nameEn: "",
  webId: ""
};

function isHTTPS() {
  return /^https/i.test(location.href);
}
function getHost() {
  let host = location.host;
  if (
    /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(
      host
    )
  ) {
    return host;
  } else if (!/yykik/.test(host)) {
    if (/^www./.test(host)) {
      return host;
    } else {
      return "www." + host;
    }
  } else {
    return host;
  }
}
/**
 * ajax配置
 * @property {string} urlHead 请求地址头部
 * @property {string} imgUpload 图片上传地址
 * @property {string} fileUpload 文件上传地址
 * @property {string} loadingText loading显示的文字
 */
export const ajaxConfig = {
  urlHead: environment == "development" ? "/api/v1" : "/api/v1",
  wxHead:
    environment == "development"
      ? "wss://www.coininn.com/api/v1/"
      : (isHTTPS ? "wss" : "ws") + "://" + getHost() + "/api/v1/",
  imgUpload: "",
  fileUpload: "",
  loadingText: "加载中"
};

/**
 * 页面配置
 * @property {string} home 主页路径
 * @property {string} login 登录页面
 */
export const pageConfig = {
  home: "/",
  login: "/login"
};

/**
 * 移动页面配置
 * @property {number} scale 标准页面比例
 * @property {string} scaleMode 缩放模式
 */
export const mobileConfig = {
  ratio: 750 / 1210,
  scaleMode: "contain"
};

/**
 * key配置
 */
export const key = {
  tokenKey: "Authorization",
  key: ""
};
