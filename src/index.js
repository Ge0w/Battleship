import { createGameboard } from "./dom-listener";
import { Gameboard, Player } from "./factories";

// Create player and opponent Gameboard grid
const myGrid = Gameboard();
const opponentGrid = Gameboard();
createGameboard(myGrid);
createGameboard(opponentGrid);

//Create player and opponent
const player = Player("Your", true);
const opponent = Player(`Opponent's`, false);
