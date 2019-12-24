/**
 * 用于移动网页的相关方法
 * @overview 在移动网页上初始化rem、页面尺寸
 * @author [luoluo]
 * @version 2.0.0
 */

import { mobileConfig } from "./config";

/**
 * 页面尺寸初始化方法
 * @overview 初始化页面基础字体大小及页面宽高
 */
export function setPageSize(): void {
  let width: number = window.innerWidth;
  let height: number = window.innerHeight;
  let styleString: string = "";
  styleString += ".windowheight{height:" + width + "px};";
  styleString += ".windowwidth{height:" + width + "px}";
  const dom = document.getElementById("styleSheet");
  if (dom) {
    dom.innerText = styleString;
  } else {
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("id", "styleSheet");
    style.innerHTML = styleString;
    document.getElementsByTagName("body")[0].insertBefore(style, null);
  }
  if (mobileConfig.scaleMode === "cover") {
    const scale = mobileConfig.ratio;
    if (width / height > scale) {
      width = height * scale;
    } else {
      height = width / scale;
    }
  }
  let htmlFontSize;
  if (width > 980) {
    htmlFontSize = 50;
  } else {
    htmlFontSize = (width / 375) * 50;
  }
  document.getElementsByTagName(
    "html"
  )[0].style.fontSize = htmlFontSize.toString();
  let contentDom = <HTMLElement>(
    document.getElementsByClassName("m-content").item(0)
  );
  if (contentDom) {
    contentDom.style.width = width + "px";
    contentDom.style.height = height + "px";
  }
}
