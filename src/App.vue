<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    语言测试
    <div>{{ $t("msg") }}</div>
    <!-- <pageLoading :visible="true"></pageLoading> -->
    <Tinymce></Tinymce>
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
import PageLoading from "@/components/PageLoading/index";

PageLoading.service.show();
setTimeout(function() {
  PageLoading.service.hide();
}, 5000);

@Component({
  components: {
    Tinymce,
    PageLoading
  }
})
export default class App extends Vue {}
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
