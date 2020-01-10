<template>
  <div class="tips" v-if="visible">
    <div :class="['content', calssName]">
      <div class="text" v-if="text">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component
export default class PageLoading extends Vue {
  text!: string;
  calssName: string | undefined = "";
  visible: boolean | undefined = false;
  show(text?: string) {
    if (text) {
      this.text = text;
    }
    this.calssName = "fadeInUp";
    this.visible = true;
    setTimeout(() => {
      this.calssName = "fadeOutDown";
      setTimeout(() => {
        this.visible = false;
      }, 500);
    }, 1500);
  }
  hide() {
    this.visible = false;
  }
}
</script>

<style scoped lang="less">
.tips {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100001;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  .content {
    padding: 8px 20px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    .text {
      font-size: 16px;
      color: #eee;
      line-height: 1.5;
    }
  }
}
</style>
