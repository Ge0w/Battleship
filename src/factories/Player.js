//Player factory function
const Player = (name, turn) => {
  let isTurn = turn;
  const takeTurn = () => {
    if (isTurn) {
      isTurn = false;
    } else {
      isTurn = true;
    }
  };
  return { name, isTurn, takeTurn };
};

module.exports = { Player };
