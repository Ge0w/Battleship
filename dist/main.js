/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/Gameboard.js":
/*!************************************!*\
  !*** ./src/factories/Gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Gameboard\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/factories/Ship.js\");\n\n\n// Gameboard factory function\nconst Gameboard = () => {\n  const width = 10;\n  //Create ships\n  const ship1 = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(\"destroyer\", 2, width);\n  const ship2 = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(\"submarine\", 3, width);\n  const ship3 = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(\"cruiser\", 3, width);\n  const ship4 = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(\"battleship\", 4, width);\n  const ship5 = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(\"carrier\", 5, width);\n  const ships = [ship1, ship2, ship3, ship4, ship5];\n\n  // Create dom gameboard\n  const createBoard = (grid, squares) => {\n    for (let i = 0; i < width * width; i++) {\n      const square = document.createElement(\"div\");\n      square.dataset.id = i;\n      grid.appendChild(square);\n      squares.push(square);\n    }\n  };\n\n  return { createBoard, ships };\n};\n\n\n//# sourceURL=webpack://battleship/./src/factories/Gameboard.js?");

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\n// Ship factory function\nconst Ship = (name, length, width) => {\n  let hits = 0;\n  const hit = () => {\n    hits++;\n  };\n  const isSunk = () => {\n    if (hits === length) {\n      hits = 10;\n    }\n  };\n  const directions = [[], []];\n  for (let i = 0; i < length; i++) {\n    directions[0].push(0 + i);\n    directions[1].push(width * i);\n  }\n  return { name, directions, hit, isSunk, hits };\n};\n\n\n//# sourceURL=webpack://battleship/./src/factories/Ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_factories_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/factories/Gameboard */ \"./src/factories/Gameboard.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const userGrid = document.querySelector(\".user-grid\");\n  const computerGrid = document.querySelector(\".computer-grid\");\n  const displayGrid = document.querySelector(\".grid-display\");\n  const ships = document.querySelectorAll(\".ship\");\n  const destroyer = document.querySelector(\".destroyer-container\");\n  const submarine = document.querySelector(\".submarine-container\");\n  const cruiser = document.querySelector(\".cruiser-container\");\n  const battleship = document.querySelector(\".battleship-container\");\n  const carrier = document.querySelector(\".carrier-container\");\n  const startButton = document.querySelector(\"#start\");\n  const rotateButton = document.querySelector(\"#rotate\");\n  const turnDisplay = document.querySelector(\"#whose-go\");\n  const infoDisplay = document.querySelector(\"#info\");\n  const width = 10;\n  let isHorizontal = true;\n  let isGameOver = false;\n  let currentPlayer = \"user\";\n  let userSquares = [];\n  let computerSquares = [];\n  let gameMode = \"\";\n  let playerNum = 0;\n  let ready = false;\n  let enemyReady = false;\n  let allShipsPlaced = false;\n  let shotFired = -1;\n\n  //Create Gameboard\n  const userGameboard = (0,_src_factories_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\n  const computerGameboard = (0,_src_factories_Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\n\n  //Create gameboard DOM\n  userGameboard.createBoard(userGrid, userSquares);\n  computerGameboard.createBoard(computerGrid, computerSquares);\n\n  //Generate ships in random location & direction\n  const generate = (ship) => {\n    let direction;\n    let randomDirection = Math.floor(Math.random() * ship.directions.length);\n    let current = ship.directions[randomDirection];\n    if (randomDirection === 0) direction = 1;\n    if (randomDirection === 1) direction = 10;\n    let randomStart = Math.abs(\n      Math.floor(\n        Math.random() * computerSquares.length -\n          ship.directions[0].length * direction\n      )\n    );\n\n    const isTaken = current.some((index) =>\n      computerSquares[randomStart + index].classList.contains(\"taken\")\n    );\n    const isAtRightEdge = current.some(\n      (index) => (randomStart + index) % width === width - 1\n    );\n    const isAtLeftEdge = current.some(\n      (index) => (randomStart + index) % width === 0\n    );\n\n    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)\n      current.forEach((index) =>\n        computerSquares[randomStart + index].classList.add(\"taken\", ship.name)\n      );\n    else generate(ship);\n  };\n  // Game Logic for Single Player\n  const playGameSingle = () => {\n    if (isGameOver) return;\n    if (currentPlayer === \"user\") {\n      turnDisplay.innerHTML = \"Your Go\";\n      computerSquares.forEach((square) =>\n        square.addEventListener(\"click\", function (e) {\n          shotFired = square.dataset.id;\n          revealSquare(square.classList);\n        })\n      );\n    }\n    if (currentPlayer === \"enemy\") {\n      turnDisplay.innerHTML = \"Computers Go\";\n      setTimeout(enemyGo, 1000);\n    }\n  };\n  // Create game\n  const createGame = (() => {\n    gameMode = \"singlePlayer\";\n\n    generate(computerGameboard.ships[0]);\n    generate(computerGameboard.ships[1]);\n    generate(computerGameboard.ships[2]);\n    generate(computerGameboard.ships[3]);\n    generate(computerGameboard.ships[4]);\n\n    startButton.addEventListener(\"click\", playGameSingle);\n  })();\n  // Allow rotation of ships\n  const rotate = () => {\n    if (isHorizontal) {\n      destroyer.classList.toggle(\"destroyer-container-vertical\");\n      submarine.classList.toggle(\"submarine-container-vertical\");\n      cruiser.classList.toggle(\"cruiser-container-vertical\");\n      battleship.classList.toggle(\"battleship-container-vertical\");\n      carrier.classList.toggle(\"carrier-container-vertical\");\n      isHorizontal = false;\n      // console.log(isHorizontal)\n      return;\n    }\n    if (!isHorizontal) {\n      destroyer.classList.toggle(\"destroyer-container-vertical\");\n      submarine.classList.toggle(\"submarine-container-vertical\");\n      cruiser.classList.toggle(\"cruiser-container-vertical\");\n      battleship.classList.toggle(\"battleship-container-vertical\");\n      carrier.classList.toggle(\"carrier-container-vertical\");\n      isHorizontal = true;\n      // console.log(isHorizontal)\n      return;\n    }\n  };\n\n  let selectedShipNameWithIndex;\n  let draggedShip;\n  let draggedShipLength;\n\n  ships.forEach((ship) =>\n    ship.addEventListener(\"mousedown\", (e) => {\n      selectedShipNameWithIndex = e.target.id;\n      console.log(selectedShipNameWithIndex);\n    })\n  );\n\n  const dragStart = () => {\n    draggedShip = undefined;\n    draggedShipLength = undefined.childNodes.length;\n    console.log(draggedShip);\n  };\n\n  const dragOver = (e) => {\n    e.preventDefault();\n  };\n\n  const dragEnter = (e) => {\n    e.preventDefault();\n  };\n\n  const dragDrop = () => {\n    let shipNameWithLastId = draggedShip.lastChild.id;\n    let shipClass = shipNameWithLastId.slice(0, -2);\n    // console.log(shipClass)\n    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));\n    let shipLastId = lastShipIndex + parseInt(undefined.dataset.id);\n    // console.log(shipLastId)\n    const notAllowedHorizontal = [\n      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81,\n      91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83,\n      93,\n    ];\n    const notAllowedVertical = [\n      99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82,\n      81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,\n      63, 62, 61, 60,\n    ];\n\n    let newNotAllowedHorizontal = notAllowedHorizontal.splice(\n      0,\n      10 * lastShipIndex\n    );\n    let newNotAllowedVertical = notAllowedVertical.splice(\n      0,\n      10 * lastShipIndex\n    );\n\n    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));\n\n    shipLastId = shipLastId - selectedShipIndex;\n    // console.log(shipLastId)\n\n    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {\n      for (let i = 0; i < draggedShipLength; i++) {\n        userSquares[\n          parseInt(undefined.dataset.id) - selectedShipIndex + i\n        ].classList.add(\"taken\", shipClass);\n      }\n      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its\n      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.\n    } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {\n      for (let i = 0; i < draggedShipLength; i++) {\n        userSquares[\n          parseInt(undefined.dataset.id) - selectedShipIndex + width * i\n        ].classList.add(\"taken\", shipClass);\n      }\n    } else return;\n\n    displayGrid.removeChild(draggedShip);\n    if (!displayGrid.querySelector(\".ship\")) allShipsPlaced = true;\n  };\n\n  //Move around user ship\n  ships.forEach((ship) => ship.addEventListener(\"click\", dragStart));\n  userSquares.forEach((square) =>\n    square.addEventListener(\"dragstart\", dragStart)\n  );\n  userSquares.forEach((square) =>\n    square.addEventListener(\"dragover\", dragOver)\n  );\n  userSquares.forEach((square) =>\n    square.addEventListener(\"dragenter\", dragEnter)\n  );\n\n  userSquares.forEach((square) => square.addEventListener(\"drop\", dragDrop));\n\n  const playerReady = (num) => {\n    let player = `.p${parseInt(num) + 1}`;\n    document.querySelector(`${player} .ready span`).classList.toggle(\"green\");\n  };\n\n  //User go, reveal square\n  const revealSquare = (classList) => {\n    const enemySquare = computerGrid.querySelector(\n      `div[data-id='${shotFired}']`\n    );\n    const obj = Object.values(classList);\n    if (\n      !enemySquare.classList.contains(\"boom\") &&\n      currentPlayer === \"user\" &&\n      !isGameOver\n    ) {\n      if (obj.includes(\"destroyer\")) computerGameboard.ships[0].hit();\n      if (obj.includes(\"submarine\")) computerGameboard.ships[1].hit();\n      if (obj.includes(\"cruiser\")) computerGameboard.ships[2].hit();\n      if (obj.includes(\"battleship\")) computerGameboard.ships[3].hit();\n      if (obj.includes(\"carrier\")) computerGameboard.ships[4].hit();\n    }\n    if (obj.includes(\"taken\")) {\n      enemySquare.classList.add(\"boom\");\n    } else {\n      enemySquare.classList.add(\"miss\");\n    }\n    checkForWins();\n    currentPlayer = \"enemy\";\n    if (gameMode === \"singlePlayer\") playGameSingle();\n  };\n\n  //Enemy go\n  const enemyGo = (square) => {\n    if (gameMode === \"singlePlayer\")\n      square = Math.floor(Math.random() * userSquares.length);\n    if (!userSquares[square].classList.contains(\"boom\")) {\n      userSquares[square].classList.add(\"boom\");\n      if (userSquares[square].classList.contains(\"destroyer\"))\n        userGameboard.ships[0].hit();\n      if (userSquares[square].classList.contains(\"submarine\"))\n        userGameboard.ships[1].hit();\n      if (userSquares[square].classList.contains(\"cruiser\"))\n        userGameboard.ships[2].hit();\n      if (userSquares[square].classList.contains(\"battleship\"))\n        userGameboard.ships[3].hit();\n      if (userSquares[square].classList.contains(\"carrier\"))\n        userGameboard.ships[4].hit();\n      checkForWins();\n    } else if (gameMode === \"singlePlayer\") enemyGo();\n    currentPlayer = \"user\";\n    turnDisplay.innerHTML = \"Your Go\";\n  };\n\n  //Check for win\n  const checkForWins = () => {\n    let enemy = \"computer\";\n    if (userGameboard.ships[0].hits === 2) {\n      infoDisplay.innerHTML = `You sunk the ${enemy}'s destroyer`;\n      userGameboard.ships[0].hits = 10;\n    }\n    if (userGameboard.ships[1].hits === 3) {\n      infoDisplay.innerHTML = `You sunk the ${enemy}'s submarine`;\n      userGameboard.ships[1].hits = 10;\n    }\n    if (userGameboard.ships[2].hits === 3) {\n      infoDisplay.innerHTML = `You sunk the ${enemy}'s cruiser`;\n      userGameboard.ships[2].hits = 10;\n    }\n    if (userGameboard.ships[3].hits === 4) {\n      infoDisplay.innerHTML = `You sunk the ${enemy}'s battleship`;\n      userGameboard.ships[3].hits = 10;\n    }\n    if (userGameboard.ships[4].hits === 5) {\n      infoDisplay.innerHTML = `You sunk the ${enemy}'s carrier`;\n      userGameboard.ships[4].hits = 10;\n    }\n    if (computerGameboard.ships[0].hits === 2) {\n      infoDisplay.innerHTML = `${enemy} sunk your destroyer`;\n      computerGameboard.ships[0].hits = 10;\n    }\n    if (computerGameboard.ships[1].hits === 3) {\n      infoDisplay.innerHTML = `${enemy} sunk your submarine`;\n      computerGameboard.ships[1].hi = 10;\n    }\n    if (computerGameboard.ships[2].hits === 3) {\n      infoDisplay.innerHTML = `${enemy} sunk your cruiser`;\n      computerGameboard.ships[2].hits = 10;\n    }\n    if (computerGameboard.ships[3].hits === 4) {\n      infoDisplay.innerHTML = `${enemy} sunk your battleship`;\n      computerGameboard.ships[3].hits = 10;\n    }\n    if (computerGameboard.ships[4].hits === 5) {\n      infoDisplay.innerHTML = `${enemy} sunk your carrier`;\n      computerGameboard.ships[4].hits = 10;\n    }\n\n    if (\n      userGameboard.ships[0].hits +\n        userGameboard.ships[1].hits +\n        userGameboard.ships[2].hits +\n        userGameboard.ships[3].hits +\n        userGameboard.ships[4].hits ===\n      50\n    ) {\n      infoDisplay.innerHTML = \"YOU WIN\";\n      gameOver();\n    }\n    if (\n      computerGameboard.ships[0].hits +\n        computerGameboard.ships[1].hits +\n        computerGameboard.ships[2].hits +\n        computerGameboard.ships[3].hits +\n        computerGameboard.ships[4].hits ===\n      50\n    ) {\n      infoDisplay.innerHTML = `${enemy.toUpperCase()} WINS`;\n      gameOver();\n    }\n  };\n\n  const gameOver = () => {\n    isGameOver = true;\n    startButton.removeEventListener(\"click\", playGameSingle);\n  };\n});\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;