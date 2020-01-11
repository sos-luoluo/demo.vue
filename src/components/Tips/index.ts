import Vue from "vue";
import tips from "./tips.vue";
const TipsConstructor = Vue.extend(tips);
interface loadingComponent {
  show: Function;
}

class FullscreenTips implements loadingComponent {
  show: Function;
  constructor() {
    const parent = document.body;
    const instance = new TipsConstructor({
      el: document.createElement("div"),
      data: {}
    });
    parent.appendChild(instance.$el);
    this.show = (<any>instance).show;
  }
}

export default new FullscreenTips().show;
