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
    shipType.axis = axis;
    if (axis) {
      for (let i = 0; i < shipType.length; i++) {
        gameBoard[y][x + i] = 1;
        shipType.placementArray.push(`${x + i},${y}`);
      }
    } else {
      for (let i = 0; i < shipType.length; i++) {
        gameBoard[y + i][x] = 1;
        shipType.placementArray.push(`${x},${y + i}`);
      }
    }
  };
  // Removes ship
  const removeShip = (fleet, coord, board) => {
    fleet.forEach((ship) => {
      ship.placementArray.forEach((shipCoord) => {
        if (shipCoord === coord) {
          if (ship.axis) {
            for (let i = 0; i < ship.placementArray.length; i++) {
              board.gameBoard[ship.placementArray[0][2]][
                parseInt(ship.placementArray[0][0]) + i
              ] = 0;
            }
          } else {
            for (let i = 0; i < ship.placementArray.length; i++) {
              board.gameBoard[parseInt(ship.placementArray[0][2]) + i][
                ship.placementArray[0][0]
              ] = 0;
            }
          }
        }
      });
    });
  };

  // Receives attack and hits ship
  const receiveAttack = (x, y) => {
    if (gameBoard[x][y] === 0 || gameBoard[x][y] === 1) {
      gameBoard[x][y] = 2;
      ships.forEach((shipp) => {
        shipp.placementArray.forEach((coord) => {
          if (coord[0] === x && coord[2] === y) {
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
  return { gameBoard, placeShip, resetBoard, receiveAttack, ships, removeShip };
};

module.exports = { Gameboard };
