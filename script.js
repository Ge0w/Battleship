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
  const placeShip = (type, x, y) => {
    const ship = Ship(type);
    for (let i = 0; i < ship.length; i++) {
      gameBoard[x][y + i] = 1;
    }
  };
  const receiveAttack = (x, y) => {
    if (gameBoard[x][y] === 1) {
    }
  };
  return { gameBoard, placeShip };
})();

module.exports = { Ship, isSunk, Gameboard };
