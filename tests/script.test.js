import { Ship, Gameboard, Player } from "../src/factories";
import { takeTurn } from "../src/dom-listener";

test("Creates ship of length 5", () => {
  const ship5 = Ship(5);
  expect(ship5.length).toBe(5);
});

test("Hits ship of length 5 at index 0", () => {
  const ship5 = Ship(5);
  ship5.hit(0);
  expect(ship5.hits).toStrictEqual([1, 0, 0, 0, 0]);
});

// test("Checks ship of length 5 is sunk", () => {
//   const ship5 = Ship(5);
//   ship5.hits = [1, 1, 1, 1, 1];
//   expect(ship5.isSunk()).toBe(true);
// });

test("Place ship of length 5 horizontally at coordinate B.2", () => {
  const ship5 = Ship(5);
  const board = Gameboard();
  board.placeShip(ship5, 1, 1, true);
  expect(board.gameBoard).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Place ship of length 3 vertically at coordinate A.10", () => {
  const ship3 = Ship(3);
  const board = Gameboard();
  board.placeShip(ship3, 0, 9, false);
  expect(board.gameBoard).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Receive attack at coordinate D.4", () => {
  const board = Gameboard();
  board.receiveAttack(3, 3);
  expect(board.gameBoard).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Reset board", () => {
  const ship5 = Ship(5);
  const board = Gameboard();
  board.placeShip(ship5, 1, 1, true);
  board.resetBoard();
  expect(board.gameBoard).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Change player turn to false", () => {
  const player1 = Player("George", true);
  takeTurn(player1);
  expect(player1.isTurn).toBe(false);
});

test("Receive attack and hit ship", () => {
  const ship5 = Ship(5);
  const board = Gameboard();
  board.placeShip(ship5, 1, 1, true);
  board.receiveAttack(1, 1);
  expect(ship5.hits).toStrictEqual([1, 0, 0, 0, 0]);
});
