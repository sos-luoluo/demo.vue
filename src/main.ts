import "@/utils/extensions";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale/index";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import { ValidationProvider } from "vee-validate";
import "./icons"; // icon
import "animate.css";
import logManager from "@/utils/log";

logManager.pushMsg({
  msg: "web Init",
  time: Date.now(),
  type: "log"
});

Vue.config.productionTip = false;
Vue.use(ViewUI);

Vue.component("ValidationProvider", ValidationProvider);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
