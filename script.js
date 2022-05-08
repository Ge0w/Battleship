const Ship = (length) => {
  const hits = [...Array(length).keys()].map((e) => (e = 0));
  return {
    length: length,
    hits: hits,
    sunk: false,
  };
};

module.exports = { Ship };
