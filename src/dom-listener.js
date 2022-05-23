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
    }
  }
};

export { createGameboard };
