import { Ship, isSunk, Gameboard, Player } from "./factories";

const gameboard = document.querySelector("#gameboard");

for (let i = 0; i < Gameboard.gameBoard.length; i++) {
  for (let j = 0; j < Gameboard.gameBoard[i].length; j++) {
    const cell = document.createElement("div");
    gameboard.append(cell);
    console.log(cell, "Complete");
  }
}
