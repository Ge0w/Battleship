import { Ship, isSunk, Gameboard } from "./script";

test("Creates ship of length 5", () => {
  expect(Ship(5).length).toBe(5);
});

test("Hits ship of length 5 at index 0", () => {
  const ship = Ship(5);
  ship.hit(0);
  expect(ship.hits).toStrictEqual([1, 0, 0, 0, 0]);
});

test("Checks ship of length 5 is sunk", () => {
  const ship = Ship(5);
  ship.hits = [1, 1, 1, 1, 1];
  isSunk(ship);
  expect(ship.sunk).toBe(true);
});

test("Place ship of length 5 at coordinate B.2", () => {
  Gameboard.placeShip(5, 1, 1);
  expect(Gameboard.gameBoard[1][1]).toBe(1);
});
