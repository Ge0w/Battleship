// Create Gameboard function
const createGameboard = (player) => {
  const gameboard = document.querySelector("#gameboard");
  const gridContainer = document.createElement("div");
  gameboard.append(gridContainer);
  gridContainer.classList.add("grid");

  //Loop through gameboard array to create grid divs
  for (let i = 0; i < player.gameBoard.length; i++) {
    for (let j = 0; j < player.gameBoard[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridContainer.append(cell);
      if (j < 1 && i < 9) {
        const coordY = document.createElement("div");
        coordY.classList.add("coord-y");
        cell.append(coordY);
        coordY.textContent = String.fromCharCode(49 + i);
      } else if (j < 1 && i === 9) {
        const coordY = document.createElement("div");
        coordY.classList.add("coord-y");
        cell.append(coordY);
        coordY.textContent = 10;
      }
      if (i < 1) {
        const coordX = document.createElement("div");
        coordX.classList.add("coord-x");
        cell.append(coordX);
        coordX.textContent = String.fromCharCode(65 + j);
      }
    }
  }
};

const takeTurn = (user) => {
  if (user.isTurn) {
    user.isTurn = false;
  } else {
    user.isTurn = true;
  }
};

module.exports = { createGameboard, takeTurn };
