// Ship factory function
export const Ship = (name, length, width) => {
  let hits = 0;
  const hit = () => {
    hits++;
  };
  const isSunk = () => {
    if (hits === length) {
      hits = 10;
    }
  };
  const directions = [[], []];
  for (let i = 0; i < length; i++) {
    directions[0].push(0 + i);
    directions[1].push(width * i);
  }
  return { name, directions, hit, isSunk, hits };
};
