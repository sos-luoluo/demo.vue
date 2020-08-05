<template>
  <div class="richtext">
    <textarea class="editor" name="" :id="tinymceId"></textarea>
  </div>
</template>
<script lang="ts">
declare global {
  interface Window {
    tinymce: {
      init: Function;
      get: Function;
    };
  }
}

import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import plugins from "./plugins";
import toolbar from "./toolbar";

@Component
export default class Tinymce extends Vue {
  @Prop(Number) height!: number;
  tinymceId: string = "editor";
  mounted() {
    this.initTinymce();
  }
  initTinymce() {
    window.tinymce.init({
      selector: "#" + this.tinymceId,
      height: this.height || 500,
      language: "zh_CN",
      // mobile: {
      //   menubar: false,
      //   elementpath: false
      // },
      toolbar_mode: "wrap",
      theme: "mobile",
      block_formats: "",
      branding: false,
      fixed_toolbar_container: "",
      placeholder: "请输入内容",
      // 自定义图片上传方法，请根据项目实际情况修改
      // images_upload_handler: function(
      //   blobInfo: any,
      //   success: Function,
      //   failure: Function
      // ) {
      //   let xhr = new XMLHttpRequest(),
      //     formData;
      //   xhr.withCredentials = false;
      //   xhr.open("POST", "postAcceptor.php");
      //   xhr.onload = function() {
      //     var json;

      //     if (xhr.status != 200) {
      //       failure("HTTP Error: " + xhr.status);
      //       return;
      //     }
      //     json = JSON.parse(xhr.responseText);

      //     if (!json || typeof json.location != "string") {
      //       failure("Invalid JSON: " + xhr.responseText);
      //       return;
      //     }
      //     success(json.location);
      //   };
      //   formData = new FormData();
      //   formData.append("file", blobInfo.blob(), "fileName");
      //   xhr.send(formData);
      // },
      plugins,
      toolbar
    });
  }
  destroyTinymce() {
    if (window.tinymce.get(this.tinymceId)) {
      window.tinymce.get("#" + this.tinymceId).destroy();
    }
  }
  setContent(value: string) {
    window.tinymce.get("#" + this.tinymceId).setContent(value);
  }
  getContent() {
    window.tinymce.get("#" + this.tinymceId).getContent();
  }
}
</script>
<style scoped>
.richtext {
  width: 100%;
  height: 500px;
}
</style>
