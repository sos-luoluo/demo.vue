import Vue from "vue";
import waves from "./waves";

const install = function(Vue) {
  Vue.directive("waves", waves);
};

Vue.use(install); // eslint-disable-line

waves.install = install;
export default waves;
