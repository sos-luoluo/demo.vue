import Vue from "vue";
import confirm from "./confirm.vue";
const ConfirmConstructor = Vue.extend(confirm);

function model(
  options: { title?: string; text?: string } = {}
): Promise<undefined> {
  const instance = new ConfirmConstructor({
    el: document.createElement("div"),
    propsData: options
  });
  const parent = document.body;
  parent.appendChild(instance.$el);
  return new Promise((resolve, reject) => {
    instance.$on("confirm", () => {
      resolve();
    });
    instance.$on("cancle", () => {
      reject();
    });
  });
}

export default model;
