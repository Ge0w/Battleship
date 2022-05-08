const Ship = (length) => {
  const hits = [...Array(length).keys()].map((e) => (e = 0));
  const hit = (index, ship) => {
    hits[index] = 1;
  };
  return {
    length: length,
    hits: hits,
    sunk: false,
    hit,
  };
};

const isSunk = (ship) => {
  if (ship.hits.every((e) => e === 1)) {
    return (ship.sunk = true);
  }
};

const Gameboard = () => {};

module.exports = { Ship, isSunk };
