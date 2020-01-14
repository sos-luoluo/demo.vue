/**
 * 表单相关方法
 */
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { localize } from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import ar from "vee-validate/dist/locale/ar.json";
import zh_CN from "vee-validate/dist/locale/ar.json";
import { regular } from "./constants";

for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}

for (let [rule, reg] of Object.entries(regular)) {
  extend(rule, {
    validate: value => {
      return reg.test(value);
    },
    message: "{_field_}格式不正确"
  });
}

extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true
});

localize({
  en,
  ar,
  zh_CN
});
let lang = localStorage.getItem("lang");

localize(lang ? lang : "zh_CN");
