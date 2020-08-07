<template>
  <div class="gobang">
    <div class="title_box">
      <div class="left">
        <div class="name">{{ leftPlayer }}</div>
      </div>
      <div class="middle">
        <div class="icon">
          {{
            gameState == 0
              ? "游戏开始"
              : gameState == 1
              ? "该白子了"
              : gameState == 2
              ? "该黑子了"
              : "游戏结束"
          }}
        </div>
      </div>
      <div class="right">
        <div class="name">{{ rightPlayer }}</div>
      </div>
    </div>
    <Board :board="board" @play="playHandle"></Board>
    <div class="info_box">
      <div class="text">{{ infoText }}</div>
    </div>
    <div class="btn_box">
      <button class="btn" @click="autoPlay(0)">电脑自动对战</button>
      <button class="btn" @click="autoPlay(1)">人机对战</button>
      <button class="btn" @click="autoPlay(2)">机人对战</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Board from "@/components/Game/board.vue";
import { getWinner } from "@/utils/game";
import { gobangAI } from "@/utils/GobangAI";
@Component({
  components: {
    Board
  }
})
export default class Gobang extends Vue {
  leftPlayer: string = "白子";
  rightPlayer: string = "黑子";
  gameState: number = 0; // 0 初始化 1 左边玩家 2 右边玩家 3 结束
  infoText: string = "暂无可用信息";
  board: Array<Array<any>> = new Array(15).fill([]).map(item =>
    Array(15)
      .fill(null)
      .map(cl => ({
        value: null, // 标记棋手
        index: null, // 标记顺序
        state: null // 标记棋子状态，可以用来显示五连
      }))
  );
  playerIndex: number = 0;
  initGame(): void {
    this.gameState = 0;
    this.infoText = "游戏重新开始";
    this.playerIndex = 0;
  }
  startGame(): void {
    this.gameState = 1;
    this.infoText = "游戏已开始";
    this.playerIndex = 0;
    this.board = new Array(15).fill([]).map(item =>
      Array(15)
        .fill(null)
        .map(cl => ({
          value: null, // 标记棋手
          index: null, // 标记顺序
          state: null // 标记棋子状态，可以用来显示五连
        }))
    );
  }
  endGame(player: number): void {
    this.gameState = 3;
    this.infoText =
      "游戏已结束,玩家" + (player == 0 ? "白子" : "黑子") + "获得胜利";
  }
  playHandle(i: number, j: number): void {
    if (this.gameState == 0) {
      this.startGame();
      return;
    } else if (this.board[i][j].value == 0 || this.board[i][j].value == 1) {
      return;
    } else if (this.gameState == 1) {
      this.board[i][j].value = 0;
      this.board[i][j].index = ++this.playerIndex;
      this.gameState = 2;
      if (this.rightPlayer == "黑子-电脑") {
        setTimeout(() => {
          this.pcPlayer(1);
        }, 10);
      }
    } else if (this.gameState == 2) {
      this.board[i][j].value = 1;
      this.board[i][j].index = ++this.playerIndex;
      this.gameState = 1;
      if (this.leftPlayer == "白子-电脑") {
        setTimeout(() => {
          this.pcPlayer(0);
        }, 10);
      }
    } else if (this.gameState == 3) {
      this.gameState = 0;
      return;
    }
    this.getWinner({
      x: i,
      y: j
    });
  }
  getWinner(position?: { x: number; y: number }): any {
    let res = getWinner(
      this.board.map(item => {
        return item.map(cl => cl && cl.value);
      }),
      position
    );
    if (res.length > 0) {
      const winner = res[0];
      this.endGame(winner.player);
    } else {
      return false;
    }
  }
  pcPlayer(player: number) {
    const position = gobangAI(
      this.board.map(item => {
        return item.map(cl => cl && cl.value);
      }),
      player
    );
    if (position) {
      this.playHandle(position.x, position.y);
    } else {
      alert("没有找到可下子的地方");
    }
  }
  autoPlay(type: number) {
    this.initGame();
    this.startGame();
    if (type == 0 || type == 1) {
      this.setPlayer({
        player: "rightPlayer",
        type: "黑子-电脑"
      });
    }
    if (type == 0 || type == 2) {
      this.setPlayer({
        player: "leftPlayer",
        type: "白子-电脑"
      });
      setTimeout(() => {
        this.playHandle(7, 7);
      }, 10);
    }
  }
  setPlayer(info: { player: "leftPlayer" | "rightPlayer"; type: string }) {
    this[info.player] = info.type;
  }
}
</script>

<style lang="less" scoped>
.gobang {
  .title_box {
    display: flex;
    align-items: center;
    padding: 0.1rem;
    border-bottom: 0.02rem solid #333;
    .left,
    .right {
      flex: 1;
      font-size: 0.2rem;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    .middle {
      .icon {
        font-size: 0.26rem;
        color: #666;
        text-align: center;
      }
    }
  }
  .info_box {
    padding: 0.1rem;
    .text {
      font-size: 0.2rem;
      color: lightsalmon;
    }
  }
  .btn_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem;
    .btn {
      width: 1rem;
      height: 0.3rem;
      background-color: darkmagenta;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    }
  }
}
</style>
