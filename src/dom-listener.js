// Create Gameboard function
const createGameboard = (board, player) => {
  const gameboard = document.querySelector("#gameboard");
  const createInitial = () => {
    //Create initial gameboard elements and append board to gameboard
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
    coordYContainer.classList.add(
      "coord-y-container",
      "d-flex",
      "justify-content-center",
      "flex-column"
    );
    //Container to wrap x-axis & grid
    const gridAxis = document.createElement("div");
    gridAxis.classList.add("d-flex", "flex-column", "justify-content-center");
    //Finally append elements to board
    boardContainer.append(coordYContainer);
    boardContainer.append(gridAxis);
    gridAxis.append(coordXContainer);
    gridAxis.append(gridContainer);

    //Loop through gameboard array to create grid divs
    for (let i = 0; i < board.gameBoard.length; i++) {
      for (let j = 0; j < board.gameBoard[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-coord", `${j},${i}`);
        gridContainer.append(cell);
      }
    }

    //Create coordinates Y
    for (let i = 0; i < board.gameBoard.length; i++) {
      const coordY = document.createElement("div");
      coordY.classList.add("coord-y");
      coordYContainer.append(coordY);
      coordY.textContent = String.fromCharCode(65 + i);
    }
    //Create coordinates X
    for (let i = 0; i < board.gameBoard.length; i++) {
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

    //Add board names
    const name = document.createElement("div");
    name.textContent = `${player.name} board`;
    name.classList.add("text-center", "m-2");
    gridAxis.append(name);

    //Add ships indicators
    const shipIndicatorContainer = document.createElement("div");
    shipIndicatorContainer.classList.add(
      "ship-container",
      "d-flex",
      "flex-column",
      "justify-content-center",
      "p-1"
    );
    boardContainer.insertBefore(shipIndicatorContainer, coordYContainer);
    const shipIndicator = (length) => {
      const shipRow = document.createElement("div");
      shipRow.classList.add("d-flex", "m-1");
      for (let i = 0; i < length; i++) {
        const shipCell = document.createElement("div");
        shipCell.classList.add("ship-cell");
        shipRow.append(shipCell);
      }
      shipIndicatorContainer.append(shipRow);
    };
    shipIndicator(2);
    shipIndicator(3);
    shipIndicator(3);
    shipIndicator(4);
    shipIndicator(5);
  };

  // Render fleet
  const renderFleet = (fleet) => {
    fleet.forEach((ship) => {
      ship.placementArray.forEach((coord) => {
        const cell = document.querySelector(
          `[data-coord='${coord[0]},${coord[2]}']`
        );
        if (!cell.classList.contains("placed-ship")) {
          cell.classList.toggle("placed-ship");
        }
      });
    });
  };

  return { renderFleet, createInitial };
};

const takeTurn = (user) => {
  if (user.isTurn) {
    user.isTurn = false;
  } else {
    user.isTurn = true;
  }
};

module.exports = { createGameboard, takeTurn };
