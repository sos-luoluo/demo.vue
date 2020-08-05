/**
 * 五子棋中判定胜利的方法
 * @param [board] Array 棋盘现状
 * @param [position] Object 最后落子位置
 */
export function getWinner(
  board: Array<Array<any>>,
  position?: { x: number; y: number }
): Array<any> {
  let positionList: Array<{ x: number; y: number }> = position
    ? [position]
    : getAllPositionList(board);
  return getWinnerPosition(board, positionList);
}
/**
 * 获取五子棋中所有需要判定的位置
 *  @param [board] Array 棋盘现状
 */
function getAllPositionList(
  board: Array<Array<any>>
): Array<{ x: number; y: number }> {
  let res: Array<{ x: number; y: number }> = [];
  board.forEach((item, i) => {
    item.forEach((cl, j) => {
      if (cl == 0 || cl == 1) {
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
 * 根据列表寻找满足五子棋条件的棋子位置
 * @param [board] Array 棋盘现状
 * @param [positionList] Array 待处理的列表
 * @param [testAll] boolean 是否测试所有可能性，否则找到符合条件的即返回
 */
function getWinnerPosition(
  board: Array<Array<any>>,
  positionList: Array<{ x: number; y: number }>,
  testAll: boolean = true
): Array<any> {
  let res: Array<any> = [];
  for (let i = 0; i < positionList.length; i++) {
    if (positionList[i]) {
      let result = testOnPostion(board, positionList[i]);
      for (let j = 0; j < result.length; j++) {
        if (result[j].result) {
          if (!testAll) {
            return [result[j]];
          }
          res.push(result[j]);
        }
        delItem(positionList, result[j].commonPostionList, i);
      }
    }
  }
  return res;
}
/**
 * 测试某一个位置是否满足条件，为了缩短处理时间，针对检测过了的位置需要及时抛弃
 * @param [position] Object 测试位置
 * @param [board] Array 棋盘
 * @param [arr] Array 数组列表
 */
function testOnPostion(
  board: Array<Array<any>>,
  position: { x: number; y: number }
): Array<any> {
  let result: Array<any> = [
    getCommonPostion(position, board, 0),
    getCommonPostion(position, board, 1),
    getCommonPostion(position, board, 2),
    getCommonPostion(position, board, 3)
  ];
  return result.map(item => {
    return {
      result: item.length == 5,
      player: board[item[0].x][item[0].y],
      commonPostionList: item
    };
  });
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
): Array<{ x: number; y: number }> {
  let res = [position],
    x = position.x,
    y = position.y;
  switch (direction) {
    case 0:
      for (let j = y + 1; j < board[x].length; j++) {
        if (board[x][j] >= 0 && board[x][j] == board[x][y]) {
          res.push({
            x: x,
            y: j
          });
        } else {
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
          break;
        }
      }
      break;
  }
  return res;
}
/**
 * 删除数组中已经遍列过的棋子
 * @param [position] Array 要处理的数组
 * @param [board] Array 需要删除的数组
 * @param [startIndex] Number 开始序号
 */
function delItem(
  positionList: Array<{ x: number; y: number }>,
  ItemList: Array<{ x: number; y: number }>,
  startIndex: number
): void {
  ItemList.forEach(item => {
    for (let i = startIndex + 1; i < positionList.length; i++) {
      if (item.x == positionList[i].x && item.y == positionList[i].y) {
        positionList.splice(i);
      }
    }
  });
}
