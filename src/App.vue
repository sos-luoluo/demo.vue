<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="show" />
    语言测试
    <!-- <div>{{ $t("msg") }}</div> -->
    <!-- <pageLoading :visible="true"></pageLoading> -->
    <!-- <Tinymce></Tinymce> -->
    <Tips ref="tips" :text="'这是提示'"></Tips>
    <!-- <Confirm :text="'sdfdsf'" @confirm="tips"></Confirm> -->
    <Upload :is-cropper="true"></Upload>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tinymce from "@/components/TinyMCE/index.vue";
import AjaxLoading from "@/components/AjaxLoading/index";
import Tips from "@/components/Tips/tips.vue";
import model from "@/components/Confirm/index";
import Upload from "@/components/Upload/upload.vue";
import { ajax } from "@/utils/ajax";
import { login } from "@/api/index";

@Component({
  components: {
    Upload,
    Tips
  }
})
export default class App extends Vue {
  show() {
    const tips: any = this.$refs.tips;
    tips.show("提示信息");
  }
  // tips() {
  //   console.log("点击了确认");
  // }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
