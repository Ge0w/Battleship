import { Gameboard } from "../src/factories/Gameboard";

document.addEventListener("DOMContentLoaded", () => {
  const userGrid = document.querySelector(".user-grid");
  const computerGrid = document.querySelector(".computer-grid");
  const displayGrid = document.querySelector(".grid-display");
  const ships = document.querySelectorAll(".ship");
  const destroyer = document.querySelector(".destroyer-container");
  const submarine = document.querySelector(".submarine-container");
  const cruiser = document.querySelector(".cruiser-container");
  const battleship = document.querySelector(".battleship-container");
  const carrier = document.querySelector(".carrier-container");
  const startButton = document.querySelector("#start");
  const rotateButton = document.querySelector("#rotate");
  const turnDisplay = document.querySelector("#whose-go");
  const infoDisplay = document.querySelector("#info");
  const width = 10;
  let isHorizontal = true;
  let isGameOver = false;
  let currentPlayer = "user";
  let userSquares = [];
  let computerSquares = [];
  let gameMode = "";
  let playerNum = 0;
  let ready = false;
  let enemyReady = false;
  let allShipsPlaced = false;
  let shotFired = -1;

  //Create Gameboard
  const userGameboard = Gameboard();
  const computerGameboard = Gameboard();

  //Create gameboard DOM
  userGameboard.createBoard(userGrid, userSquares);
  computerGameboard.createBoard(computerGrid, computerSquares);

  //Generate ships in random location & direction
  const generate = (ship) => {
    let direction;
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

  // Create game
  const createGame = (() => {
    gameMode = "singlePlayer";

    generate(computerGameboard.ships[0]);
    generate(computerGameboard.ships[1]);
    generate(computerGameboard.ships[2]);
    generate(computerGameboard.ships[3]);
    generate(computerGameboard.ships[4]);
  })();
  // Game Logic for Single Player
  const playGameSingle = () => {
    if (isGameOver) return;
    if (currentPlayer === "user") {
      turnDisplay.innerHTML = "Your Go";
      computerSquares.forEach((square) =>
        square.addEventListener("click", function (e) {
          shotFired = square.dataset.id;
          revealSquare(square.classList);
        })
      );
    }
    if (currentPlayer === "enemy") {
      turnDisplay.innerHTML = "Computers Go";
      setTimeout(enemyGo, 1000);
    }
  };

  startButton.addEventListener("click", playGameSingle);

  // Allow rotation of ships
  const rotate = () => {
    console.log("click");
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

  rotateButton.addEventListener("click", rotate);

  //move around user ship
  ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
  userSquares.forEach((square) =>
    square.addEventListener("dragstart", dragStart)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragover", dragOver)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragenter", dragEnter)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragleave", dragLeave)
  );
  userSquares.forEach((square) => square.addEventListener("drop", dragDrop));
  userSquares.forEach((square) => square.addEventListener("dragend", dragEnd));

  let selectedShipNameWithIndex;
  let draggedShip;
  let draggedShipLength;

  ships.forEach((ship) =>
    ship.addEventListener("mousedown", (e) => {
      selectedShipNameWithIndex = e.target.id;
      console.log(parseInt(selectedShipNameWithIndex.substr(-1)));
    })
  );

  function dragStart() {
    draggedShip = this;
    draggedShipLength = this.children.length;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    // console.log('drag leave')
  }

  function dragDrop() {
    let shipNameWithLastId = draggedShip.lastElementChild.id;
    let shipClass = shipNameWithLastId.slice(0, -2);
    // console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
    let shipLastId = lastShipIndex + parseInt(this.dataset.id);
    // console.log(shipLastId)
    const notAllowedHorizontal = [
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81,
      91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83,
      93,
    ];
    const notAllowedVertical = [
      99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82,
      81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,
      63, 62, 61, 60,
    ];

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(
      0,
      10 * lastShipIndex
    );
    let newNotAllowedVertical = notAllowedVertical.splice(
      0,
      10 * lastShipIndex
    );

    let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

    shipLastId = shipLastId - selectedShipIndex;
    // console.log(shipLastId)

    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[
          parseInt(this.dataset.id) - selectedShipIndex + i
        ].classList.add("taken", shipClass);
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[
          parseInt(this.dataset.id) - selectedShipIndex + width * i
        ].classList.add("taken", shipClass);
      }
    } else return;

    displayGrid.removeChild(draggedShip);
    if (!displayGrid.querySelector(".ship")) allShipsPlaced = true;
  }

  function dragEnd() {
    // console.log('dragend')
  }

  const playerReady = (num) => {
    let player = `.p${parseInt(num) + 1}`;
    document.querySelector(`${player} .ready span`).classList.toggle("green");
  };

  //User go, reveal square
  const revealSquare = (classList) => {
    const enemySquare = computerGrid.querySelector(
      `div[data-id='${shotFired}']`
    );
    const obj = Object.values(classList);
    if (
      !enemySquare.classList.contains("boom") &&
      currentPlayer === "user" &&
      !isGameOver
    ) {
      if (obj.includes("destroyer")) computerGameboard.ships[0].hit();
      if (obj.includes("submarine")) computerGameboard.ships[1].hit();
      if (obj.includes("cruiser")) computerGameboard.ships[2].hit();
      if (obj.includes("battleship")) computerGameboard.ships[3].hit();
      if (obj.includes("carrier")) computerGameboard.ships[4].hit();
    }
    if (obj.includes("taken")) {
      enemySquare.classList.add("boom");
    } else {
      enemySquare.classList.add("miss");
    }
    checkForWins();
    currentPlayer = "enemy";
    if (gameMode === "singlePlayer") playGameSingle();
  };

  //Enemy go
  const enemyGo = (square) => {
    if (gameMode === "singlePlayer")
      square = Math.floor(Math.random() * userSquares.length);
    if (!userSquares[square].classList.contains("boom")) {
      userSquares[square].classList.add("boom");
      if (userSquares[square].classList.contains("destroyer"))
        userGameboard.ships[0].hit();
      if (userSquares[square].classList.contains("submarine"))
        userGameboard.ships[1].hit();
      if (userSquares[square].classList.contains("cruiser"))
        userGameboard.ships[2].hit();
      if (userSquares[square].classList.contains("battleship"))
        userGameboard.ships[3].hit();
      if (userSquares[square].classList.contains("carrier"))
        userGameboard.ships[4].hit();
      checkForWins();
    } else if (gameMode === "singlePlayer") enemyGo();
    currentPlayer = "user";
    turnDisplay.innerHTML = "Your Go";
  };

  //Check for win
  const checkForWins = () => {
    let enemy = "computer";
    if (userGameboard.ships[0].hits === 2) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s destroyer`;
      userGameboard.ships[0].hits = 10;
    }
    if (userGameboard.ships[1].hits === 3) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s submarine`;
      userGameboard.ships[1].hits = 10;
    }
    if (userGameboard.ships[2].hits === 3) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s cruiser`;
      userGameboard.ships[2].hits = 10;
    }
    if (userGameboard.ships[3].hits === 4) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s battleship`;
      userGameboard.ships[3].hits = 10;
    }
    if (userGameboard.ships[4].hits === 5) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s carrier`;
      userGameboard.ships[4].hits = 10;
    }
    if (computerGameboard.ships[0].hits === 2) {
      infoDisplay.innerHTML = `${enemy} sunk your destroyer`;
      computerGameboard.ships[0].hits = 10;
    }
    if (computerGameboard.ships[1].hits === 3) {
      infoDisplay.innerHTML = `${enemy} sunk your submarine`;
      computerGameboard.ships[1].hi = 10;
    }
    if (computerGameboard.ships[2].hits === 3) {
      infoDisplay.innerHTML = `${enemy} sunk your cruiser`;
      computerGameboard.ships[2].hits = 10;
    }
    if (computerGameboard.ships[3].hits === 4) {
      infoDisplay.innerHTML = `${enemy} sunk your battleship`;
      computerGameboard.ships[3].hits = 10;
    }
    if (computerGameboard.ships[4].hits === 5) {
      infoDisplay.innerHTML = `${enemy} sunk your carrier`;
      computerGameboard.ships[4].hits = 10;
    }

    if (
      userGameboard.ships[0].hits +
        userGameboard.ships[1].hits +
        userGameboard.ships[2].hits +
        userGameboard.ships[3].hits +
        userGameboard.ships[4].hits ===
      50
    ) {
      infoDisplay.innerHTML = "YOU WIN";
      gameOver();
    }
    if (
      computerGameboard.ships[0].hits +
        computerGameboard.ships[1].hits +
        computerGameboard.ships[2].hits +
        computerGameboard.ships[3].hits +
        computerGameboard.ships[4].hits ===
      50
    ) {
      infoDisplay.innerHTML = `${enemy.toUpperCase()} WINS`;
      gameOver();
    }
  };

  const gameOver = () => {
    isGameOver = true;
    startButton.removeEventListener("click", playGameSingle);
  };
});
