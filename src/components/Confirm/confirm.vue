<template>
  <div class="confirm" v-if="visible">
    <div class="content">
      <div class="close" @click="cancle">×</div>
      <div class="title">{{ title }}</div>
      <div class="text">{{ text }}</div>
      <div class="btn_box">
        <div class="btn" @click="confirm">确定</div>
        <div class="btn" @click="cancle">取消</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Emit } from "vue-property-decorator";

@Component
export default class ListState extends Vue {
  @Prop({ default: "提示" }) title!: string;
  @Prop(String) text!: string;
  visible: boolean | undefined = true;
  @Emit()
  confirm() {
    this.visible = false;
  }
  @Emit()
  cancle() {
    this.visible = false;
  }
}
</script>

<style scoped lang="less">
.confirm {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  .content {
    position: relative;
    min-width: 200px;
    max-width: 90%;
    padding: 10px 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(119, 117, 151, 0.3);
    border-radius: 10px;
    .close {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 30px;
      color: #666;
      line-height: 1;
      opacity: 0.6;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
        opacity: 1;
        transform: rotate(180deg);
      }
    }
    .title {
      padding: 10px 0;
      font-size: 16px;
      text-align: center;
      line-height: 1.5;
      color: #333;
      font-weight: bold;
    }
    .text {
      padding: 10px 0;
      font-size: 14px;
      text-align: left;
      line-height: 1.5;
      color: #333;
    }
    .btn_box {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        width: 40%;
        padding: 10px 0;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        line-height: 1.5;
        &:first-child {
          color: #fff;
          background-color: #337ab7;
          border-color: #2e6da4;
          &.active,
          &:hover,
          &:focus {
            background-color: #286090;
            border-color: #204d74;
          }
        }
        &:last-child {
          color: #333333;
          background-color: #ffffff;
          border-color: #adadad;
          &.active,
          &:hover,
          &:focus {
            background-color: #d4d4d4;
            border-color: #8c8c8c;
          }
        }
      }
    }
  }
}
</style>
