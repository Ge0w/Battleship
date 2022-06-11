import { Ship } from "./Ship";

// Gameboard factory function
export const Gameboard = () => {
  const width = 10;
  //Create ships
  const ship1 = Ship("destroyer", 2, width);
  const ship2 = Ship("submarine", 3, width);
  const ship3 = Ship("cruiser", 3, width);
  const ship4 = Ship("battleship", 4, width);
  const ship5 = Ship("carrier", 5, width);
  const ships = [ship1, ship2, ship3, ship4, ship5];

  // Create dom gameboard
  const createBoard = (grid, squares) => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  };

  return { createBoard, ships };
};
