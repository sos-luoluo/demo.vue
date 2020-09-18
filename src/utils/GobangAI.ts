import { extend } from "@/utils/base";

/**
 * 配置信息
 */
const config = {
  deeper: 3,
  layer: 0.5
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
  deeper: number,
  position?: { x: number; y: number }
): Array<{ score: number; position: { x: number; y: number } }> {
  const emptyPositionList: Array<any> = getAllEmptyPositionList(
    board,
    position
  );
  const res = emptyPositionList
    .map((item, i) => {
      return {
        score: getWeightScore(board, player, item, deeper),
        position: item
      };
    })
    .sort((a, b) => {
      return b.score - a.score;
    })
    .slice(0, 2);
  return res;
}

/**
 * 获取五子棋中所有的空位置
 *  @param [board] Array 棋盘现状
 */
function getAllEmptyPositionList(
  board: Array<Array<any>>,
  position?: { x: number; y: number }
): Array<{ x: number; y: number }> {
  let res: Array<{ x: number; y: number }> = [];
  let iStart = position && position.x - 4 > 0 ? position.x - 4 : 0,
    iEnd =
      position && position.x + 4 <= board.length
        ? position.x + 4
        : board.length,
    jStart = position && position.y - 4 > 0 ? position.y - 4 : 0,
    jEnd =
      position && position.y + 4 <= board.length
        ? position.y + 4
        : board.length;

  for (let i = iStart; i < iEnd; i++) {
    for (let j = jStart; j < jEnd; j++) {
      if (board[i][j] === null) {
        res.push({
          x: i,
          y: j
        });
      }
    }
  }
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
  if (score > 200) {
    score = 200;
  }
  if (deeper >= 0 && score < 200) {
    const clList: Array<{
      score: number;
      position: { x: number; y: number };
    }> = positionAndScore(newBoard, player, score <= 16 ? 0 : deeper, position);
    const clScore = clList.sum((item: any) => {
      return item.score;
    });
    if (clList.length > 0) {
      score = score * config.layer;
      score += (clScore * (1 - config.layer)) / clList.length;
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
 * 确认权值的算法
 * @param [length] number 符合条件长度
 * @param [value] number 两边空隙情况
 */
function weightScore(length: number, value: number) {
  if (length >= 5) {
    return 200;
  }
  switch (length) {
    case 4:
      if (value == 2) {
        return 50;
      } else if (value == 1) {
        return 18;
      } else {
        return 0;
      }
    case 3:
      if (value == 2) {
        return 16;
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

// 测试程序
declare var window: any;
export function testParam(startCtrl: Function) {
  const testData: Array<any> = [];
  (config.layer = 0), (config.deeper = 0);
  function startGame() {
    if (config.layer < 0.9) {
      config.layer += 0.1;
    } else if (config.deeper < 3) {
      config.layer = 0.1;
      config.deeper++;
    } else if (config.layer >= 0.9 && config.deeper >= 3) {
      console.log("测试程序已经结束");
      return;
    }
    startCtrl();
  }
  function endGame(res: 0 | 1 | null) {
    testData.push({
      ...config,
      result: res
    });
    setTimeout(() => {
      startGame();
    }, 10);
  }
  window.startTest = startGame;
  window.getTestData = function() {
    console.log(testData);
    window.testResult = testData;
  };
  return endGame;
}
// 测试结果数据
const resultData = [
  {
    deeper: 0,
    layer: 0.1,
    result: null
  },
  {
    deeper: 0,
    layer: 0.2,
    result: null
  },
  {
    deeper: 0,
    layer: 0.30000000000000004,
    result: null
  },
  {
    deeper: 0,
    layer: 0.4,
    result: null
  },
  {
    deeper: 0,
    layer: 0.5,
    result: null
  },
  {
    deeper: 0,
    layer: 0.6,
    result: null
  },
  {
    deeper: 0,
    layer: 0.7,
    result: null
  },
  {
    deeper: 0,
    layer: 0.7999999999999999,
    result: null
  },
  {
    deeper: 0,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 0,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 1,
    layer: 0.1,
    result: 1
  },
  {
    deeper: 1,
    layer: 0.2,
    result: null
  },
  {
    deeper: 1,
    layer: 0.30000000000000004,
    result: 1
  },
  {
    deeper: 1,
    layer: 0.4,
    result: null
  },
  {
    deeper: 1,
    layer: 0.5,
    result: 0
  },
  {
    deeper: 1,
    layer: 0.6,
    result: null
  },
  {
    deeper: 1,
    layer: 0.7,
    result: null
  },
  {
    deeper: 1,
    layer: 0.7999999999999999,
    result: null
  },
  {
    deeper: 1,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 1,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 2,
    layer: 0.1,
    result: 1
  },
  {
    deeper: 2,
    layer: 0.2,
    result: null
  },
  {
    deeper: 2,
    layer: 0.30000000000000004,
    result: 1
  },
  {
    deeper: 2,
    layer: 0.4,
    result: 0
  },
  {
    deeper: 2,
    layer: 0.5,
    result: 1
  },
  {
    deeper: 2,
    layer: 0.6,
    result: null
  },
  {
    deeper: 2,
    layer: 0.7,
    result: null
  },
  {
    deeper: 2,
    layer: 0.7999999999999999,
    result: null
  },
  {
    deeper: 2,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 2,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 3,
    layer: 0.1,
    result: 1
  },
  {
    deeper: 3,
    layer: 0.2,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.30000000000000004,
    result: null
  },
  {
    deeper: 3,
    layer: 0.4,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.5,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.6,
    result: null
  },
  {
    deeper: 3,
    layer: 0.7,
    result: null
  },
  {
    deeper: 3,
    layer: 0.7999999999999999,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 3,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 4,
    layer: 0.1,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.2,
    result: null
  },
  {
    deeper: 4,
    layer: 0.30000000000000004,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.4,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.5,
    result: null
  },
  {
    deeper: 4,
    layer: 0.6,
    result: null
  },
  {
    deeper: 4,
    layer: 0.7,
    result: null
  },
  {
    deeper: 4,
    layer: 0.7999999999999999,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 4,
    layer: 0.9999999999999999,
    result: null
  }
];

const resultData2 = [
  {
    deeper: 0,
    layer: 0.1,
    result: null
  },
  {
    deeper: 0,
    layer: 0.2,
    result: null
  },
  {
    deeper: 0,
    layer: 0.30000000000000004,
    result: null
  },
  {
    deeper: 0,
    layer: 0.4,
    result: null
  },
  {
    deeper: 0,
    layer: 0.5,
    result: null
  },
  {
    deeper: 0,
    layer: 0.6,
    result: null
  },
  {
    deeper: 0,
    layer: 0.7,
    result: null
  },
  {
    deeper: 0,
    layer: 0.7999999999999999,
    result: null
  },
  {
    deeper: 0,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 0,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 1,
    layer: 0.1,
    result: 1
  },
  {
    deeper: 1,
    layer: 0.2,
    result: null
  },
  {
    deeper: 1,
    layer: 0.30000000000000004,
    result: 1
  },
  {
    deeper: 1,
    layer: 0.4,
    result: null
  },
  {
    deeper: 1,
    layer: 0.5,
    result: 0
  },
  {
    deeper: 1,
    layer: 0.6,
    result: null
  },
  {
    deeper: 1,
    layer: 0.7,
    result: null
  },
  {
    deeper: 1,
    layer: 0.7999999999999999,
    result: null
  },
  {
    deeper: 1,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 1,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 2,
    layer: 0.1,
    result: 1
  },
  {
    deeper: 2,
    layer: 0.2,
    result: null
  },
  {
    deeper: 2,
    layer: 0.30000000000000004,
    result: 1
  },
  {
    deeper: 2,
    layer: 0.4,
    result: 0
  },
  {
    deeper: 2,
    layer: 0.5,
    result: 1
  },
  {
    deeper: 2,
    layer: 0.6,
    result: null
  },
  {
    deeper: 2,
    layer: 0.7,
    result: null
  },
  {
    deeper: 2,
    layer: 0.7999999999999999,
    result: null
  },
  {
    deeper: 2,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 2,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 3,
    layer: 0.1,
    result: 1
  },
  {
    deeper: 3,
    layer: 0.2,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.30000000000000004,
    result: null
  },
  {
    deeper: 3,
    layer: 0.4,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.5,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.6,
    result: null
  },
  {
    deeper: 3,
    layer: 0.7,
    result: null
  },
  {
    deeper: 3,
    layer: 0.7999999999999999,
    result: 0
  },
  {
    deeper: 3,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 3,
    layer: 0.9999999999999999,
    result: null
  },
  {
    deeper: 4,
    layer: 0.1,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.2,
    result: null
  },
  {
    deeper: 4,
    layer: 0.30000000000000004,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.4,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.5,
    result: null
  },
  {
    deeper: 4,
    layer: 0.6,
    result: null
  },
  {
    deeper: 4,
    layer: 0.7,
    result: null
  },
  {
    deeper: 4,
    layer: 0.7999999999999999,
    result: 0
  },
  {
    deeper: 4,
    layer: 0.8999999999999999,
    result: null
  },
  {
    deeper: 4,
    layer: 0.9999999999999999,
    result: null
  }
];
