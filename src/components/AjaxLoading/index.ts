import Vue from "vue";
import ajaxloading from "./loading.vue";
const LoadingConstructor = Vue.extend(ajaxloading);
interface loadingComponent {
  show: Function;
  hide: Function;
}

class FullscreenLoading implements loadingComponent {
  show: Function;
  hide: Function;
  constructor() {
    const parent = document.body;
    const instance = new LoadingConstructor({
      el: document.createElement("div"),
      data: {}
    });
    parent.appendChild(instance.$el);
    this.show = (<any>instance).show;
    this.hide = (<any>instance).hide;
  }
}

class Loading extends ajaxloading {
  static service: loadingComponent = new FullscreenLoading();
}

export default Loading;
