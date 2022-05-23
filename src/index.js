import { createGameboard } from "./dom-listener";
import { Gameboard } from "./factories";

// Create player and opponent Gameboard grid
const myGrid = Gameboard();
const opponentGrid = Gameboard();
createGameboard(myGrid);
createGameboard(opponentGrid);
