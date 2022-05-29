import { createGameboard } from "./dom-listener";
import { Gameboard, Player, Ship } from "./factories";

// Create player and opponent Gameboard grid
const myGrid = Gameboard();
const opponentGrid = Gameboard();
createGameboard(myGrid);
createGameboard(opponentGrid);

//Create player and opponent
const player = Player("Your", true);
const opponent = Player(`Opponent's`, false);

//test
const ship5 = Ship(5);
myGrid.placeShip(ship5, 3, 3, true);
myGrid.receiveAttack(3, 3);
