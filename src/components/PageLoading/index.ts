import Vue from "vue";
import pageloading from "./loading.vue";
const LoadingConstructor = Vue.extend(pageloading);
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

class Loading extends pageloading {
  static service: loadingComponent = new FullscreenLoading();
}

export default Loading;
