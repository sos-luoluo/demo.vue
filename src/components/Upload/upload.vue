<template>
  <div class="upload">
    <div class="img_box">
      <div
        class="img"
        v-for="(item, i) in imgList"
        :key="i"
        :style="{ backgroundImage: 'url(' + item + ')' }"
      >
        <div class="icon" @click="delItem(i)">×</div>
      </div>
    </div>
    <div class="choose_box" v-show="imgList.length < maxLength">
      <input type="file" class="input" @change="change" />
      <div class="btn">点击上传</div>
    </div>
    <div class="cropper_pop"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

const uploadApi = function(file: File) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: "http://192.168.0.187:8001/images/pic_logo1.png"
      });
    }, 1000);
  });
};

@Component
export default class ListState extends Vue {
  @Prop({ default: 1 }) maxLength!: number;
  @Prop({ default: false }) isCropper!: boolean;
  @Prop([String, Array]) url: undefined | string | string[];
  @Prop(String) uploadImgUrl!: string;
  imgList: Array<string> = [];
  created() {
    this.setValue(this.url);
  }
  setValue(url: undefined | string | string[]) {
    if (url && typeof url === "string") {
      this.imgList = [url];
    } else if (url && typeof url === "object") {
      this.imgList = Object.assign([], url);
    } else {
      this.imgList = [];
    }
  }
  change(e: any) {
    const name = e.currentTarget.files[0].name;
    const type = e.currentTarget.files[0].type;
    let files = e.currentTarget.files;
    uploadApi(e.currentTarget.files[0]).then((res: any) => {
      this.imgList.push(res.data);
    });
  }
  delItem(index: number) {
    this.imgList.splice(index, 1);
  }
  getValue(): string | string[] {
    if (this.maxLength == 1) {
      return this.imgList[0];
    } else {
      return this.imgList;
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
