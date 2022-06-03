import { createGameboard } from "./dom-listener";
import { Ship } from "../src/factories/Ship";
import { Gameboard } from "../src/factories/Gameboard";
import { Player } from "../src/factories/Player";

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
myGrid.placeShip(myShip2, 1, 1, false);
myGrid.placeShip(myShip3a, 3, 1, false);
myGrid.placeShip(myShip3b, 5, 1, false);
myGrid.placeShip(myShip4, 7, 1, false);
myGrid.placeShip(myShip5, 2, 7, true);

//Create player and opponent
const player = Player("Your", true);
const opponent = Player(`Opponent's`, false);

//Create gameboards
const myGridDom = createGameboard(myGrid, player);
const opponentGridDom = createGameboard(opponentGrid, opponent);

//Render initial gameboard
myGridDom.createInitial();
opponentGridDom.createInitial();

//Render fleet
myGridDom.renderFleet(myGrid.ships);

//test
const placedShip = document.querySelectorAll(".placed-ship");
placedShip.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    console.log(e.target.dataset.coord);
  });
});

myGrid.removeShip(myGrid.ships, "3,1", myGrid);
myGrid.addShip(myGrid, 3, 3, false);
