import Vue from "vue";
import Clipboard from "./clipboard";

const install = function(Vue) {
  Vue.directive("Clipboard", Clipboard);
};
Vue.use(install); // eslint-disable-line

Clipboard.install = install;
export default Clipboard;
