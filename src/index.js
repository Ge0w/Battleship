import { createGameboard } from "./dom-listener";
import { Gameboard } from "./factories";

const myGrid = Gameboard();
const opponentGrid = Gameboard();

createGameboard(myGrid);
createGameboard(opponentGrid);
