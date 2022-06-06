// Gameboard factory function
const Gameboard = () => {
  //Generate ships in random location & direction
  const generate = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * computerSquares.length -
          ship.directions[0].length * direction
      )
    );

    const isTaken = current.some((index) =>
      computerSquares[randomStart + index].classList.contains("taken")
    );
    const isAtRightEdge = current.some(
      (index) => (randomStart + index) % width === width - 1
    );
    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % width === 0
    );

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((index) =>
        computerSquares[randomStart + index].classList.add("taken", ship.name)
      );
    else generate(ship);
  };

  // Start singleplayer game
  const startSinglePlayer = (ship1, ship2, ship3, ship4, ship5) => {
    gameMode = "singlePlayer";

    generate(ship1);
    generate(ship2);
    generate(ship3);
    generate(ship4);
    generate(ship5);

    startButton.addEventListener("click", playGameSingle);
  };

  // Create dom gameboard
  const createBoard = (grid, squares, width) => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  };

  // Allow rotation of ships
  let isHorizontal = true;
  const rotate = () => {
    if (isHorizontal) {
      destroyer.classList.toggle("destroyer-container-vertical");
      submarine.classList.toggle("submarine-container-vertical");
      cruiser.classList.toggle("cruiser-container-vertical");
      battleship.classList.toggle("battleship-container-vertical");
      carrier.classList.toggle("carrier-container-vertical");
      isHorizontal = false;
      // console.log(isHorizontal)
      return;
    }
    if (!isHorizontal) {
      destroyer.classList.toggle("destroyer-container-vertical");
      submarine.classList.toggle("submarine-container-vertical");
      cruiser.classList.toggle("cruiser-container-vertical");
      battleship.classList.toggle("battleship-container-vertical");
      carrier.classList.toggle("carrier-container-vertical");
      isHorizontal = true;
      // console.log(isHorizontal)
      return;
    }
  };
};

module.exports = { Gameboard };
