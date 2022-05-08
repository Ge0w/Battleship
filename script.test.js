import { Ship } from "./script";

test("Creates ship of length 5", () => {
  expect(Ship(5)).toStrictEqual({
    length: 5,
    hits: [0, 0, 0, 0, 0],
    sunk: false,
  });
});
