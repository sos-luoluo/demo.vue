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
    <div class="cropper_pop" v-show="popShow" @click="hidePop">
      <div class="content" @click.stop>
        <div class="cutting-box">
          <VueCropper
            ref="cropper"
            :img="imgSrc"
            :info="true"
            :center-box="true"
            :info-true="true"
            :auto-crop="true"
            :high="true"
          ></VueCropper>
        </div>
        <div class="btn-box">
          <button class="btn" size="small" type="primary" @click="cropImage">
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { VueCropper } from "vue-cropper";
import tips from "@/components/Tips/index";
import confirm from "@/components/Confirm/index";

const uploadApi = function(formDate: FormData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: "http://192.168.0.187:8001/images/pic_logo1.png"
      });
    }, 1000);
  });
};

@Component({
  components: {
    VueCropper
  }
})
export default class ListState extends Vue {
  name = "upload";
  @Prop({ default: 1 }) maxLength!: number;
  @Prop({ default: false }) isCropper!: boolean;
  @Prop([String, Array]) url: undefined | string | string[];
  @Prop(String) uploadImgUrl!: string;
  imgList: Array<string> = [];
  popShow: boolean = false;
  imgSrc: string = "";
  fileName: string = "123";
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
    let file = e.currentTarget.files[0];
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(name)) {
      tips("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种!");
      return false;
    }
    if (!this.isCropper) {
      let formData = new FormData();
      debugger
      formData.append("file", file.raw, file.name);
      formData.append("type", type);
      this.upload(formData);
    } else {
      this.fileName = file.name;
      this.popShow = true;
      var reader = new FileReader();
      reader.onload = (e: any) => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.imgSrc = data;
      };
      reader.readAsArrayBuffer(file);
    }
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
  // 图片大小限制
  beforeAvatarUpload(file: File) {
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      tips("上传头像图片大小不能超过 1MB!");
    }
    return isLt1M;
  }
  cropImage() {
    let cropper: any = this.$refs.cropper;
    cropper.getCropBlob((response: File) => {
      let formData = new FormData();
      formData.append("file", response, this.fileName);
      this.upload(formData, () => {
        this.hidePop();
      });
    }, "image/jpeg");
  }
  upload(formDate: FormData, callback?: Function) {
    uploadApi(formDate)
      .then((res: any) => {
        this.imgList.push(res.data);
        this.$emit("add", this.imgList);
        callback && callback(res);
      })
      .catch(err => {
        tips("网络错误!");
      });
  }
  // 删除某张图片
  delImg(i: number) {
    confirm({
      title: "提示",
      text: "是否确认删除?"
    }).then(res => {
      this.imgList.splice(i, 1);
      tips("操作成功!");
      this.$emit("del", this.imgList);
    });
  }
  hidePop() {
    this.popShow = false;
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
  .cropper_pop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 80%;
      height: 80%;
      background-color: #fff;
      .cutting-box {
        width: 100%;
        height: 100%;
        border: 1px solid gray;
      }
      .btn-box {
        padding: 10px 0;
        .btn {
          padding: 5px 10px;
          font-size: 14px;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
