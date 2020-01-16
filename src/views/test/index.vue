<template>
  <div class="test">
    <div class="title">测试</div>
    <div class="tips">这是测试页面，你可以按照以下指示进行操作。</div>
    <div class="menu_box">
      <div class="item">
        <button class="button">登录</button>
        <div class="info">执行登录方法</div>
      </div>
      <div class="item">
        <button class="button" @click="clearStorage">清空缓存</button>
        <div class="info">清空所有缓存</div>
      </div>
      <div class="item">
        <button class="button">复制token</button>
        <div class="info">复制用户凭证信息</div>
      </div>
      <div class="item">
        <button class="button">发送日志</button>
        <div class="info">立即提交日志</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import tips from "@/components/Tips/index";

@Component({
  components: {}
})
export default class Test extends Vue {
  login() {}
  clearStorage() {
    window.localStorage.clear();
    tips("已清空缓存");
  }
}
</script>

<style lang="less">
.test {
  .title {
    padding: 10px 0;
    font-size: 24px;
    color: #333;
    line-height: 1.5;
  }
  .tips {
    padding: 10px 0;
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }
  .menu_box {
    .item {
      padding: 10px 0;
      display: flex;
      align-items: center;
      .button {
        width: 150px;
        margin-right: 20px;
        padding: 5px 0;
        font-size: 14px;
        color: #333;
        line-height: 1.5;
      }
    }
  }
}
</style>
