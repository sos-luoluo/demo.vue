<template>
  <div class="board">
    <div class="line" v-for="(item, i) in board" :key="i">
      <div
        class="cell"
        v-for="(cl, j) in item"
        :key="j"
        @click="clickHandle(i, j)"
      >
        <div class="dot white" v-if="cl.value == 0">{{ cl.index }}</div>
        <div class="dot black" v-if="cl.value == 1">{{ cl.index }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
@Component({})
export default class Board extends Vue {
  @Prop(Array) board!: Array<Array<null | number>>;
  @Emit("play")
  clickHandle(i: number, j: number): void {
    this.$forceUpdate();
  }
}
</script>
<style lang="less" scoped>
.board {
  width: 100%;
  border: 0.02rem solid #333;
  .line {
    width: 100%;
    display: flex;
    align-items: center;
    .cell {
      flex: 1;
      height: 0.25rem;
      border: 0.01rem solid #666;
      display: flex;
      align-items: center;
      justify-content: center;
      .dot {
        width: 85%;
        height: 85%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.12rem;
        color: aqua;
        overflow: hidden;
        &.white {
          border: 0.01rem solid #999;
          box-shadow: 0.05rem 0.05rem 0.05rem #999;
        }
        &.black {
          background-color: #333;
          box-shadow: 0.05rem 0.05rem 0.05rem #bbb;
        }
      }
    }
  }
}
</style>
