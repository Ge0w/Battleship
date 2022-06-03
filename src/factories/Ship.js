// Ship factory function
const Ship = (length) => {
  const hits = [...Array(length).keys()].map((e) => (e = 0));
  const hit = (index) => {
    hits[index] = 1;
    return hits;
  };
  const isSunk = () => {
    hits.every((e) => e === 1);
  };
  return {
    length,
    hits,
    hit,
    isSunk,
  };
};

module.exports = { Ship };
