const Ship = (length) => {
  const hits = [...Array(length).keys()].map((e) => (e = 0));
  const hit = (index) => {
    hits[index] = 1;
  };
  return {
    length: length,
    hits: hits,
    sunk: false,
    hit,
  };
};

const isSunk = (ship) => {
  if (ship.hits.every((e) => e === 1)) {
    return (ship.sunk = true);
  }
};

const Gameboard = (() => {
  let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const placeShip = (type, x, y, axis) => {
    const ship = Ship(type);
    if (axis) {
      for (let i = 0; i < ship.length; i++) {
        gameBoard[x][y + i] = 1;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        gameBoard[x + i][y] = 1;
      }
    }
  };
  const receiveAttack = (x, y) => {
    if (gameBoard[x][y] === 1) {
    }
  };

  const resetBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = 0;
      }
    }
  };
  return { gameBoard, placeShip, resetBoard };
})();

module.exports = { Ship, isSunk, Gameboard };
