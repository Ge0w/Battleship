import { Gameboard } from "../src/factories/Gameboard";

test("Creates Gameboard", () => {
  const gameboard = Gameboard();
  expect(gameboard.ships.length).toBe(5);
});

test("Hits destroyer", () => {
  const gameboard = Gameboard();
  gameboard.ships[0].hits++;
  expect(gameboard.ships[0].hits).toBe(1);
});
