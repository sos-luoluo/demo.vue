import Vue from "vue";
import tools from "@/utils/tools";

Vue.filter("timeFormat", tools.timeFormat);
Vue.filter("priceFormat", tools.priceFormat);
Vue.filter("timeIntervalChange", tools.timeIntervalChange);
Vue.filter("timeAgo", tools.timeAgo);
