var solveSudoku = function (board) {
  const hashmap = {};
  solve(board, hashmap);
};

const solve = (board, hashmap) => {
  if (!findEmptyCell(board, hashmap)) return true;

  let row = hashmap["row"];
  let col = hashmap["col"];

  for (let i = 1; i < 10; i++) {
    let num = `${i}`;

    if (
      !usedInRow(board, row, num) &&
      !usedInCol(board, col, num) &&
      !usedInGrid(board, row - (row % 3), col - (col % 3), num)
    ) {
      board[row][col] = num;

      if (solve(board, hashmap)) return true;

      board[row][col] = ".";
    }
  }

  // triggers backtracking
  return false;
};

const findEmptyCell = (board, hashmap) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        hashmap["row"] = i;
        hashmap["col"] = j;
        return true;
      }
    }
  }
  return false;
};

const usedInRow = (board, row, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return true;
  }
  return false;
};

const usedInCol = (board, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return true;
  }
  return false;
};

const usedInGrid = (board, row, col, num) => {
  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      if (board[i][j] === num) return true;
    }
  }
  return false;
};

solveSudoku([
  [".", ".", "9", "7", "4", "8", ".", ".", "."],
  ["7", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "2", ".", "1", ".", "9", ".", ".", "."],
  [".", ".", "7", ".", ".", ".", "2", "4", "."],
  [".", "6", "4", ".", "1", ".", "5", "9", "."],
  [".", "9", "8", ".", ".", ".", "3", ".", "."],
  [".", ".", ".", "8", ".", "3", ".", "2", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", "2", "7", "5", "9", ".", "."],
]);
