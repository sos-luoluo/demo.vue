<template>
  <div class="ajaxloading" v-show="visible">
    <div class="content">
      <img src="../../assets/ajaxloading.svg" alt="" class="img" />
      <div class="text" v-if="text">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component
export default class AjaxLoading extends Vue {
  @Prop(String) text!: string;
  @Prop(Boolean) visible: boolean | undefined;
  show(text?: string) {
    if (text) {
      this.text = text;
    }
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
}
</script>

<style scoped lang="less">
.ajaxloading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    max-width: 50%;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    .img {
      padding: 5px;
      max-width: 100px;
      max-height: 100px;
      opacity: 0.8;
    }
    .text {
      font-size: 16px;
      line-height: 1.5;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
