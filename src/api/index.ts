/**
 * 项目中所有api均写在这个地方，包括列表
 * @author [luoluo]
 * @version 2.0.0
 */
import { ajax } from "@/utils/ajax";

/**
 * 用户登录
 */
export function login(data: { account: string; pwd: string }) {
  return ajax({
    url: "/userInfo/login",
    data: data,
    processData: true
  });
}
