<template>
  <div class="liststate" v-show="state != 1">
    <div class="content">
      <div class="line"></div>
      <div class="text" v-if="state == 0">加载中...</div>
      <div class="text" v-else-if="state == 3">已无更多</div>
      <div class="text" v-else-if="state == 2">暂无数据</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component
export default class ListState extends Vue {
  @Prop(Number) state!: number;
}
</script>

<style scoped lang="less">
.liststate {
  .content {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .line {
      flex: 1;
      height: 1px;
      margin: 0 15px;
      background-color: #eee;
    }
    .text {
      font-size: 14px;
      line-height: 1.5;
      text-align: center;
      color: #999;
    }
  }
}
</style>
