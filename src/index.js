import { createGameboard } from "./dom-listener";
import { Gameboard, Player, Ship } from "./factories";

// Create player and opponent Gameboard grid
const myGrid = Gameboard();
const opponentGrid = Gameboard();

//My grid fleet
const myShip2 = Ship(2);
const myShip3a = Ship(3);
const myShip3b = Ship(3);
const myShip4 = Ship(4);
const myShip5 = Ship(5);

//Place my grid fleet
myGrid.placeShip(myShip2, 1, 1, true);

//Create player and opponent
const player = Player("Your", true);
const opponent = Player(`Opponent's`, false);

//Create gameboards
createGameboard(myGrid, player);
createGameboard(opponentGrid, opponent);

const shipCells = document.querySelectorAll(".cell");
shipCells.forEach((e) =>
  e.addEventListener("click", (e) => renderFleet(myGrid.ships))
);
