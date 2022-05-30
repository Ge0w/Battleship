// Create Gameboard function
const createGameboard = (player) => {
  //Create initial gameboard elements and append board to gameboard
  const gameboard = document.querySelector("#gameboard");
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("container", "d-flex");
  gameboard.append(boardContainer);
  //Container to contain grid
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid");
  //Coordinates containers
  const coordXContainer = document.createElement("div");
  coordXContainer.classList.add("coord-x-container");
  const coordYContainer = document.createElement("div");
  coordYContainer.classList.add("coord-y-container");
  //Container to wrap x-axis & grid
  const gridAxis = document.createElement("div");
  gridAxis.classList.add("d-flex", "flex-column");
  //Finally append elements to board
  boardContainer.append(coordYContainer);
  boardContainer.append(gridAxis);
  gridAxis.append(coordXContainer);
  gridAxis.append(gridContainer);

  //Loop through gameboard array to create grid divs
  for (let i = 0; i < player.gameBoard.length; i++) {
    for (let j = 0; j < player.gameBoard[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridContainer.append(cell);
    }
  }

  //Create coordinates

  for (let i = 0; i < player.gameBoard.length; i++) {
    const coordY = document.createElement("div");
    coordY.classList.add("coord-y");
    coordYContainer.append(coordY);
    coordY.textContent = String.fromCharCode(65 + i);
  }

  for (let i = 0; i < player.gameBoard.length; i++) {
    if (i === 9) {
      const coordX = document.createElement("div");
      coordX.classList.add("coord-x");
      coordXContainer.append(coordX);
      coordX.textContent = 10;
    } else {
      const coordX = document.createElement("div");
      coordX.classList.add("coord-x");
      coordXContainer.append(coordX);
      coordX.textContent = String.fromCharCode(49 + i);
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
