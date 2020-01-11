/**
 * 定义数据类型
 * @overview 定义所有的接口和数据类型
 * @author [luoluo]
 * @version 2.0.0
 */
/**
 * 请求参数
 * @property id 指定id值可以用于锁定请求
 * @property hasLoading 是否有loading
 * @property confirmText 是否有确认弹窗
 * @property method 请求方法
 * @property url 请求路径
 * @property data 请求参数
 */
export interface ajaxOptions {
  id?: string | number;
  hasLoading?: boolean;
  confirmText?: string;
  method?: "POST" | "GET";
  url: string;
  data?: any;
}
