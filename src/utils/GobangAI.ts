import { extend } from "@/utils/base";

/**
 * 配置信息
 */
const config = {
  deeper: 1
};

/**
 * 目标是设计一个五子棋AI，AI支持深度递归遍历给出最优走法
 * @param [board] Array 棋盘现状
 * @param [player] number 棋手
 */
export function gobangAI(
  board: Array<Array<any>>,
  player: number
): null | { x: number; y: number } {
  let bestList: Array<{
    score: number;
    position: { x: number; y: number };
  }> = positionAndScore(board, player, config.deeper);
  // let bestList: Array<{
  //   score: number;
  //   position: { x: number; y: number };
  // }> = [];
  let worstList: Array<{
    score: number;
    position: { x: number; y: number };
  }> = positionAndScore(board, player === 0 ? 1 : 0, config.deeper);
  let result = [...bestList, ...worstList].sort((a, b) => {
    return b.score - a.score;
  });
  if (result.length > 0) {
    return result[0].position;
  } else {
    return null;
  }
}

/**
 * 递归算法寻找所有可落子位置和权值分
 * @param [board] Array 棋盘现状
 * @param [player] number 棋手
 * @param [deeper] number 遍历深度
 */
function positionAndScore(
  board: Array<Array<any>>,
  player: number,
  deeper: number = 0
): Array<{ score: number; position: { x: number; y: number } }> {
  const emptyPositionList: Array<any> = getAllEmptyPositionList(board);
  const res = emptyPositionList
    .map(item => {
      return {
        score: getWeightScore(board, player, item, deeper),
        position: item
      };
    })
    .sort((a, b) => {
      return b.score - a.score;
    })
    .slice(0, 3);
  return res;
}

/**
 * 获取五子棋中所有的空位置
 *  @param [board] Array 棋盘现状
 */
function getAllEmptyPositionList(
  board: Array<Array<any>>
): Array<{ x: number; y: number }> {
  let res: Array<{ x: number; y: number }> = [];
  board.forEach((item, i) => {
    item.forEach((cl, j) => {
      if (cl === null) {
        res.push({
          x: i,
          y: j
        });
      }
    });
  });
  return res;
}

/**
 * 根据当前棋盘和落子位置判定权值
 * @param [board] Array 棋盘现状
 * @param [player] number 棋手
 * @param [position] Object 落子位置
 * @param [deeper] number 遍历深度
 */
function getWeightScore(
  board: Array<Array<any>>,
  player: number,
  position: { x: number; y: number },
  deeper: number
): number {
  const newBoard: Array<Array<any>> = JSON.parse(JSON.stringify(board));
  newBoard[position.x][position.y] = player;
  let score = 0;
  let result: Array<any> = [
    getCommonPostion(position, newBoard, 0),
    getCommonPostion(position, newBoard, 1),
    getCommonPostion(position, newBoard, 2),
    getCommonPostion(position, newBoard, 3)
  ];
  result.forEach(item => {
    score += weightScore(item.list.length, item.value);
  });
  deeper--;
  if (deeper >= 0) {
    const clList: Array<{
      score: number;
      position: { x: number; y: number };
    }> = positionAndScore(newBoard, player, deeper);
    if (clList.length > 0) {
      const clScore = clList.sum((item: any) => {
        return item.score;
      });
      score += clScore * 0.5;
    }
  }
  return score;
}

/**
 * 寻找某一个方向，某一个位置与当前棋子同色的所有棋子
 * @param [position] Object 测试位置
 * @param [board] Array 棋盘
 * @param [direction] number 0 横向 1 竖向 2左斜 3 右斜
 */
function getCommonPostion(
  position: { x: number; y: number },
  board: Array<Array<any>>,
  direction: number
): { list: Array<{ x: number; y: number }>; value: number } {
  let res = [position],
    x = position.x,
    y = position.y,
    value = 0; // 价值，两边有空隙，价值较大
  switch (direction) {
    case 0:
      for (let j = y + 1; j < board[x].length; j++) {
        if (board[x][j] >= 0 && board[x][j] == board[x][y]) {
          res.push({
            x: x,
            y: j
          });
        } else {
          if (board[x][j] === null) {
            value++;
          }
          break;
        }
      }
      for (let j = y - 1; j >= 0; j--) {
        if (board[x][j] >= 0 && board[x][j] == board[x][y]) {
          res.unshift({
            x: x,
            y: j
          });
        } else {
          if (board[x][j] === null) {
            value++;
          }
          break;
        }
      }
      break;
    case 1:
      for (let i = x + 1; i < board.length; i++) {
        if (board[i][y] >= 0 && board[i][y] == board[x][y]) {
          res.push({
            x: i,
            y: y
          });
        } else {
          if (board[i][y] === null) {
            value++;
          }
          break;
        }
      }
      for (let i = x - 1; i >= 0; i--) {
        if (board[i][y] >= 0 && board[i][y] == board[x][y]) {
          res.unshift({
            x: i,
            y: y
          });
        } else {
          if (board[i][y] === null) {
            value++;
          }
          break;
        }
      }
      break;
    case 2:
      for (
        let i = x + 1, j = y + 1;
        i < board.length && j < board[i].length;
        i++, j++
      ) {
        if (board[i][j] >= 0 && board[i][j] == board[x][y]) {
          res.push({
            x: i,
            y: j
          });
        } else {
          if (board[i][j] === null) {
            value++;
          }
          break;
        }
      }
      for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] >= 0 && board[i][j] == board[x][y]) {
          res.unshift({
            x: i,
            y: j
          });
        } else {
          if (board[i][j] === null) {
            value++;
          }
          break;
        }
      }
      break;
    case 3:
      for (let i = x - 1, j = y + 1; i >= 0 && j < board[i].length; i--, j++) {
        if (board[i][j] >= 0 && board[i][j] == board[x][y]) {
          res.push({
            x: i,
            y: j
          });
        } else {
          if (board[i][j] === null) {
            value++;
          }
          break;
        }
      }
      for (let i = x + 1, j = y - 1; i < board.length && j >= 0; i++, j--) {
        if (board[i][j] >= 0 && board[i][j] == board[x][y]) {
          res.unshift({
            x: i,
            y: j
          });
        } else {
          if (board[i][j] === null) {
            value++;
          }
          break;
        }
      }
      break;
  }
  return {
    list: res,
    value: value
  };
}

/**
 * 确实权值的算法
 * @param [length] number 符合条件长度
 * @param [value] number 两边空隙情况
 */
function weightScore(length: number, value: number) {
  switch (length) {
    case 5:
      return 1000;
    case 4:
      if (value == 2) {
        return 100;
      } else if (value == 1) {
        return 20;
      } else {
        return 0;
      }
    case 3:
      if (value == 2) {
        return 18;
      } else if (value == 1) {
        return 8;
      } else {
        return 0;
      }
    default:
      if (value > 0) {
        return Math.pow(2, length) * value;
      } else {
        return 0;
      }
  }
}
