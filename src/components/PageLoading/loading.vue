<template>
  <div class="pageloading" v-show="visible">
    <div class="content">
      <img src="../../assets/pageloading.svg" alt="" class="img" />
      <div class="text" v-if="text">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component
export default class PageLoading extends Vue {
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
.pageloading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    max-width: 50%;
    .img {
      max-width: 200px;
      max-height: 200px;
    }
    .text {
      font-size: 16px;
      line-height: 1.5;
      text-align: center;
      color: #333;
    }
  }
}
</style>
