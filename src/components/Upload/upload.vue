<template>
  <div class="upload" v-if="visible">
    <div class="img_box">
      <div
        class="img"
        v-for="(item, i) in imgList"
        :key="i"
        :style="{ backgroundImage: 'url(' + item + ')' }"
      >
        <div class="icon">×</div>
      </div>
    </div>
    <div class="choose_box">
      <input type="file" class="input" />
      <div class="btn">点击上传</div>
    </div>
    <div class="cropper_pop"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component
export default class ListState extends Vue {
  @Prop({ default: 1 }) maxLength!: number;
  @Prop({ default: false }) isCropper!: boolean;
  @Prop([String, Array]) value: string | string[] = "";
  @Prop(String) uploadImgUrl!: string;
  visible: boolean | undefined = true;
  imgList: Array<string> = ["http://192.168.0.187:8001/images/pic_logo1.png"];
  created() {
    this.setValue(this.value);
  }
  setValue(val: string | string[]) {
    if (typeof val === "string") {
      if (val) {
        this.imgList = [val];
      } else {
        this.imgList = [];
      }
    } else if (typeof val === "object") {
      this.imgList = val;
    }
  }
}
</script>

<style scoped lang="less">
.upload {
  display: flex;
  align-items: center;
  height: 100px;
  .img_box {
    display: flex;
    align-items: center;
    .img {
      position: relative;
      width: 100px;
      height: 100px;
      background-position: center;
      background-size: cover;
      margin-right: 15px;
      background-color: #efefef;
      .icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 30px;
        color: #666;
        cursor: pointer;
        line-height: 1;
        opacity: 0.6;
        transition: all 0.5s;
        &:hover {
          opacity: 1;
          transform: rotate(180deg);
        }
      }
    }
  }
  .choose_box {
    position: relative;
    height: 100%;
    width: 100px;
    .input {
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .btn {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #333;
      cursor: pointer;
      pointer-events: none;
    }
  }
}
</style>
