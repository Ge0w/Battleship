// Ship factory function
const Ship = (length) => {
  const hits = [...Array(length).keys()].map((e) => (e = 0));
  const hit = (index) => {
    hits[index] = 1;
    return hits;
  };
  const isSunk = () => {
    hits.every((e) => e === 1);
  };
  return {
    length,
    hits,
    hit,
    isSunk,
  };
};

// Gameboard factory function
const Gameboard = () => {
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

  const ships = [];

  // Place ship function: places ship in array and pushes coordinates to ship
  const placeShip = (shipType, x, y, axis) => {
    ships.push(shipType);
    shipType.placementArray = [];
    if (axis) {
      for (let i = 0; i < shipType.length; i++) {
        gameBoard[x][y + i] = 1;
        shipType.placementArray.push([x, y + i]);
      }
    } else {
      for (let i = 0; i < shipType.length; i++) {
        gameBoard[x + i][y] = 1;
        shipType.placementArray.push([x + i, y]);
      }
    }
  };
  // Receives attack and hits ship
  const receiveAttack = (x, y) => {
    if (gameBoard[x][y] === 0 || gameBoard[x][y] === 1) {
      gameBoard[x][y] = 2;
      ships.forEach((shipp) => {
        shipp.placementArray.forEach((coord) => {
          if (coord[0] === x && coord[1] === y) {
            shipp.hit(shipp.placementArray.indexOf(coord));
          }
        });
      });
    }
  };

  // Resets board
  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        gameBoard[i][j] = 0;
      }
    }
  };
  return { gameBoard, placeShip, resetBoard, receiveAttack, ships };
};

//Player factory function
const Player = (name, turn) => {
  let isTurn = turn;
  const takeTurn = () => {
    if (isTurn) {
      isTurn = false;
    } else {
      isTurn = true;
    }
  };
  return { name, isTurn, takeTurn };
};

module.exports = { Ship, Gameboard, Player };
