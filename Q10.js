/*
Outline:
- Gameplay
  + Generate game
    > Generate full grid (Backtrack sudoku solver)
    > Calculate side sums
    > Remove all squares except 9: different rows, different columns, different blocks
  + Ingame
    > Draw board: 
      = Find errors (to color correctly)
      = Draw empty board (draw borders, fill colors, highlight pointer, highlight same row - column - block)
      = Fill numbers (draw numbers, fill colors)
      = Draw side sums
    > Respond to input (left, right, up, down, mouse, 1-9, clear)
  + Check
   > Check all rows, columns, blocks (normal Sudoku rules)
   > Check if summation conditions are met
   > If won: congratulate + if play again -> back to menu
- Game menu
  + Play
  + Mode (4x4 or 9x9)
  + Rules
*/

const WIDTH = 700;
const HEIGHT = 700;
const SQUARE_SIZE = 50;
var BLOCK = 3;
var LENGTH = BLOCK * BLOCK;
var sameBlockWithPointer = (row, col) => (int(row / BLOCK) === int(ptrRow / BLOCK) && int(col / BLOCK) === int(ptrCol / BLOCK));

var LEFT_X = (WIDTH - SQUARE_SIZE * LENGTH) / 2;
var RIGHT_X = LEFT_X + SQUARE_SIZE * LENGTH;
var TOP_Y = (HEIGHT - SQUARE_SIZE * LENGTH) / 2;
var BOTTOM_Y = TOP_Y + SQUARE_SIZE * LENGTH;

var topList, bottomList, leftList, rightList;
var board, fixed, solution;
var boardErrors, topErrors, bottomErrors, leftErrors, rightErrors;
var ptrRow, ptrCol;
var keepSquares = 2;

const MENU = 0, GAME = 1, MODE = 2, RULES = 3, WON = 4;
var state = MENU;

var playButton = {x: WIDTH * 0.5, y: HEIGHT * 0.5, w: WIDTH * 0.3, h: HEIGHT * 0.125, inColor: "rgb(255, 255, 0)", outColor: "rgb(255, 128, 0)", txt: "play"};
var modeButton = {x: WIDTH * 0.5, y: HEIGHT * 0.7, w: WIDTH * 0.3, h: HEIGHT * 0.125, inColor: "rgb(255, 0, 0)", outColor: "rgb(128, 0, 0)", txt: "mode"};
var rulesButton = {x: WIDTH * 0.5, y: HEIGHT * 0.9, w: WIDTH * 0.3, h: HEIGHT * 0.125, inColor: "rgb(0, 255, 0)", outColor: "rgb(0, 128, 0)", txt: "rules"};
var mode4x4Button = {x: WIDTH * 0.5, y: HEIGHT * 0.4, w: WIDTH * 0.3, h: HEIGHT * 0.125, inColor: "rgb(0, 255, 0)", outColor: "rgb(0, 128, 0)", txt: "4x4"};
var mode9x9Button = {x: WIDTH * 0.5, y: HEIGHT * 0.6, w: WIDTH * 0.3, h: HEIGHT * 0.125, inColor: "rgb(255, 255, 0)", outColor: "rgb(255, 128, 0)", txt: "9x9"};
var backToMenuButton = {x: WIDTH * 0.3, y: HEIGHT * 0.9, w: WIDTH * 0.5, h: HEIGHT * 0.1, inColor: "rgb(255, 128, 255)", outColor: "rgb(128, 128, 255)", txt: "Back to Menu"};
var hintButton = {x: WIDTH * 0.9, y: HEIGHT * 0.1, w: WIDTH * 0.15, h: HEIGHT * 0.075, inColor: "rgb(224, 224, 224)", outColor: "rgb(128, 128, 128)", txt: "Hint"};

function calculateCoordinates()
{
  LENGTH = BLOCK * BLOCK;
  LEFT_X = (WIDTH - SQUARE_SIZE * LENGTH) / 2;
  RIGHT_X = LEFT_X + SQUARE_SIZE * LENGTH;
  TOP_Y = (HEIGHT - SQUARE_SIZE * LENGTH) / 2;
  BOTTOM_Y = TOP_Y + SQUARE_SIZE * LENGTH;
}

const CORNER_RADIUS = 20;
const TEXT_COLOR = 'rgb(0, 0, 0)';
function buttonPointed(button) {
  return abs(button.x - mouseX) <= button.w / 2 && abs(button.y - mouseY) <= button.h / 2;
}
function drawButton(button) {
  fill(button.inColor);
  stroke(button.outColor);
  strokeWeight(7);
  rect(button.x - button.w / 2, button.y - button.h / 2, button.w, button.h, CORNER_RADIUS);

  fill(TEXT_COLOR);
  noStroke();
  textSize(button.h / 2);
  textAlign(CENTER, CENTER);
  if (buttonPointed(button)) textStyle(ITALIC);
  text(button.txt, button.x, button.y);
  textStyle(NORMAL);
}

function findBoardErrors() {
  boardErrors = [];
  for (let row = 0; row < LENGTH; row++) {
    boardErrors[row] = [];
    for (let col = 0; col < LENGTH; col++) {
      boardErrors[row][col] = false;
    }
  }

  for (let row = 0; row < LENGTH; row++) {
    let count = [];
    for (let val = 1; val <= LENGTH; val++) count[val] = 0;
    for (let col = 0; col < LENGTH; col++) count[board[row][col]]++;
    for (let col = 0; col < LENGTH; col++) {
      if (count[board[row][col]] > 1) boardErrors[row][col] = true;
    }
  }

  for (let col = 0; col < LENGTH; col++) {
    let count = [];
    for (let val = 1; val <= LENGTH; val++) count[val] = 0;
    for (let row = 0; row < LENGTH; row++) count[board[row][col]]++;
    for (let row = 0; row < LENGTH; row++) {
      if (count[board[row][col]] > 1) boardErrors[row][col] = true;
    }
  }

  for (let topRow = 0; topRow < LENGTH; topRow += BLOCK) {
    for (let leftCol = 0; leftCol < LENGTH; leftCol += BLOCK) {
      let count = [];
      for (let val = 1; val <= LENGTH; val++) count[val] = 0;

      for (let dRow = 0; dRow < BLOCK; dRow++) {
        for (let dCol = 0; dCol < BLOCK; dCol++) {
          count[board[topRow + dRow][leftCol + dCol]]++;
        }
      }

      for (let dRow = 0; dRow < BLOCK; dRow++) {
        for (let dCol = 0; dCol < BLOCK; dCol++) {
          if (count[board[topRow + dRow][leftCol + dCol]] > 1) {
            boardErrors[topRow + dRow][leftCol + dCol] = true;
          }
        }
      }

    }
  }
}
function findErrors() { // find errors to color correctly
  // board errors
  findBoardErrors();

  // left errors
  leftErrors = [];
  for (let row = 0; row < LENGTH; row++) {
    let allFilled = true;
    let currentTotal = 0;
    for (let col = 0; col < BLOCK; col++) {
      if (board[row][col] > 0) currentTotal += board[row][col];
      else allFilled = false;
    }
    leftErrors[row] = (allFilled && currentTotal !== leftList[row]);
  }

  // right errors
  rightErrors = [];
  for (let row = 0; row < LENGTH; row++) {
    let allFilled = true;
    let currentTotal = 0;
    for (let col = LENGTH - BLOCK; col < LENGTH; col++) {
      if (board[row][col] > 0) currentTotal += board[row][col];
      else allFilled = false;
    }
    rightErrors[row] = (allFilled && currentTotal !== rightList[row]);
  }

  // top errors
  topErrors = [];
  for (let col = 0; col < LENGTH; col++) {
    let allFilled = true;
    let currentTotal = 0;
    for (let row = 0; row < BLOCK; row++) {
      if (board[row][col] > 0) currentTotal += board[row][col];
      else allFilled = false;
    }
    topErrors[col] = (allFilled && currentTotal !== topList[col]);
  }

  // bottom errors
  bottomErrors = [];
  for (let col = 0; col < LENGTH; col++) {
    let allFilled = true;
    let currentTotal = 0;
    for (let row = LENGTH - BLOCK; row < LENGTH; row++) {
      if (board[row][col] > 0) currentTotal += board[row][col];
      else allFilled = false;
    }
    bottomErrors[col] = (allFilled && currentTotal !== bottomList[col]);
  }
}
function allFilled() {
  for (let row = 0; row < LENGTH; row++) {
    for (let col = 0; col < LENGTH; col++) {
      if (board[row][col] === 0) return false;
    }
  }
  return true;
}
function haveBoardErrors() {
  findBoardErrors();
  for (let i = 0; i < LENGTH; i++) {
    for (let j = 0; j < LENGTH; j++) {
      if (board[i][j] > 0 && boardErrors[i][j]) return true;
    }
  }
  return false;
}
function checkVictory() { // if already findErrors()
  for (let row = 0; row < LENGTH; row++) {
    for (let col = 0; col < LENGTH; col++) {
      if (boardErrors[row][col]) return false;
      if (board[row][col] === 0) return false;
    }
  }
  
  for (let i = 0; i < LENGTH; i++) {
    if (leftErrors[i]) return false;
    if (rightErrors[i]) return false;
    if (topErrors[i]) return false;
    if (bottomErrors[i]) return false;
  }
  
  return true;
}


function randomArray(low, high) {
  let arr = [];
  let len = high - low;
  for (let i = 0; i < len; i++) arr[i] = low + i;
  for (let i = len - 1; i >= 0; i--) {
    let j = floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function fillBoard(row, col) {
  let nextRow = row, nextCol = col + 1;
  if (col === LENGTH) {
    nextRow++;
    nextCol = 0;
  }
  if (row === LENGTH) return true;
  
  let arr = randomArray(1, LENGTH + 1);
  for (let i = 0; i < LENGTH; i++) {
    board[row][col] = arr[i];
    if (haveBoardErrors()) continue;
    if (fillBoard(nextRow, nextCol)) return true;
  }
  board[row][col] = 0;
  
  return false;
}
function generateNewGame() {
  // fill board
  board = [];
  for (let row = 0; row < LENGTH; row++) {
    board[row] = [];
    for (let col = 0; col < LENGTH; col++) {
      board[row][col] = 0;
    }
  }
  
  fillBoard(0, 0);

  solution = [];
  for (let row = 0; row < LENGTH; row++) {
    solution[row] = [];
    for (let col = 0; col < LENGTH; col++) {
      solution[row][col] = board[row][col];
    }
  }
  
  // fill outside lists
  // leftList
  leftList = [];
  for (let row = 0; row < LENGTH; row++) {
    leftList[row] = 0;
    for (let col = 0; col < BLOCK; col++) {
      leftList[row] += board[row][col];
    }
  }
  
  // rightList
  rightList = [];
  for (let row = 0; row < LENGTH; row++) {
    rightList[row] = 0;
    for (let col = LENGTH - BLOCK; col < LENGTH; col++) {
      rightList[row] += board[row][col];
    }
  }
  
  // topList
  topList = [];
  for (let col = 0; col < LENGTH; col++) {
    topList[col] = 0;
    for (let row = 0; row < BLOCK; row++) {
      topList[col] += board[row][col];
    }
  }
  
  // bottomList
  bottomList = [];
  for (let col = 0; col < LENGTH; col++) {
    bottomList[col] = 0;
    for (let row = LENGTH - BLOCK; row < LENGTH; row++) {
      bottomList[col] += board[row][col];
    }
  }
  
  fixed = [];
  for (let row = 0; row < LENGTH; row++) {
    fixed[row] = [];
    for (let col = 0; col < LENGTH; col++) {
      fixed[row][col] = false;
    }
  }
  for (let i = 0; i < keepSquares; i++) {
    let row = floor(random(LENGTH)), col = floor(random(LENGTH));
    while (fixed[row][col]) {
      row = floor(random(LENGTH));
      col = floor(random(LENGTH));
    }
    fixed[row][col] = true;
  }
  
  for (let row = 0; row < LENGTH; row++) {
    for (let col = 0; col < LENGTH; col++) {
      if (!fixed[row][col]) {
        board[row][col] = 0;
      }
    }
  }
}

const BOARD_BORDER = 'rgb(0, 0, 0)';
const SQUARE_BORDER = 'rgb(128, 128, 128)';
const PTR_COLOR = 'rgb(255, 255, 0)';
const PTR_BORDER = 'rgb(255, 0, 0)';
const FIXED_COLOR = 'rgb(64, 64, 64)';

function fillSquareColor(row, col) { // fill color with best choice
  if (fixed[row][col]) {
    fill(FIXED_COLOR);
    return;
  }

  if (row === ptrRow && col === ptrCol) {
    fill(PTR_COLOR);
    return;
  }

  let r = 184,
    g = 184,
    b = 184;
  if (row === ptrRow) b = 255;
  if (col === ptrCol) g = 255;
  if (sameBlockWithPointer(row, col)) r = 255;
  fill(r, g, b);
}

function drawEmptyBoard() {
  // fill square colors
  stroke(SQUARE_BORDER);
  strokeWeight(1);
  y = TOP_Y;
  for (let row = 0; row < LENGTH; row++) {
    x = LEFT_X;
    for (let col = 0; col < LENGTH; col++) {
      fillSquareColor(row, col);
      square(x, y, SQUARE_SIZE);

      x += SQUARE_SIZE;
    }
    y += SQUARE_SIZE;
  }

  // draw borders
  noFill();
  stroke(BOARD_BORDER);
  strokeWeight(1);
  y = TOP_Y;
  for (let row = 0; row < LENGTH; row += BLOCK) {
    x = LEFT_X;
    for (let col = 0; col < LENGTH; col += BLOCK) {
      square(x, y, SQUARE_SIZE * BLOCK);

      x += SQUARE_SIZE * BLOCK;
    }
    y += SQUARE_SIZE * BLOCK;
  }

  // highlight pointer
  noFill();
  stroke(PTR_BORDER);
  strokeWeight(2);
  x = LEFT_X + ptrCol * SQUARE_SIZE;
  y = TOP_Y + ptrRow * SQUARE_SIZE;
  square(x, y, SQUARE_SIZE);
}

const NUMBER_COLOR_NORMAL = 'rgb(0, 0, 0)';
const NUMBER_COLOR_FIXED = 'rgb(255, 255, 255)';
const NUMBER_COLOR_ERROR = 'rgb(255, 0, 0)';
const NUMBER_SIZE = 20;

function fillNumberColor(row, col) {
  if (boardErrors[row][col]) fill(NUMBER_COLOR_ERROR);
  else if (fixed[row][col]) fill(NUMBER_COLOR_FIXED);
  else fill(NUMBER_COLOR_NORMAL);
}

function drawNumbers() {
  noStroke();
  textSize(NUMBER_SIZE);
  textAlign(CENTER, CENTER);

  y = TOP_Y + SQUARE_SIZE / 2;
  for (let row = 0; row < LENGTH; row++) {
    x = LEFT_X + SQUARE_SIZE / 2;

    for (let col = 0; col < LENGTH; col++) {
      if (board[row][col] > 0) {
        fillNumberColor(row, col);
        if (row === ptrRow && col === ptrCol) textStyle(BOLD);
        text(board[row][col], x, y);
        textStyle(NORMAL);
      }

      x += SQUARE_SIZE;
    }
    y += SQUARE_SIZE;
  }
}

const OUT_NUMBER_COLOR = 'rgb(0, 0, 0)';
const OUT_NUMBER_SIZE = 14;
const OUT_NUMBER_DIST = 7;

function drawOutsideNumbers() {
  noStroke();
  textSize(OUT_NUMBER_SIZE);
  
  textAlign(CENTER, BOTTOM); // top
  x = LEFT_X + SQUARE_SIZE / 2;
  y = TOP_Y - OUT_NUMBER_DIST;
  for (let col = 0; col < LENGTH; col++) {
    fill(topErrors[col] ? NUMBER_COLOR_ERROR : NUMBER_COLOR_NORMAL);
    text(topList[col], x, y);
    x += SQUARE_SIZE;
  }

  textAlign(CENTER, TOP); // bottom
  x = LEFT_X + SQUARE_SIZE / 2;
  y = BOTTOM_Y + OUT_NUMBER_DIST;
  for (let col = 0; col < LENGTH; col++) {
    fill(bottomErrors[col] ? NUMBER_COLOR_ERROR : NUMBER_COLOR_NORMAL);
    text(bottomList[col], x, y);
    x += SQUARE_SIZE;
  }

  textAlign(RIGHT, CENTER); // left
  x = LEFT_X - OUT_NUMBER_DIST;
  y = TOP_Y + SQUARE_SIZE / 2;
  for (let row = 0; row < LENGTH; row++) {
    fill(leftErrors[row] ? NUMBER_COLOR_ERROR : NUMBER_COLOR_NORMAL);
    text(leftList[row], x, y);
    y += SQUARE_SIZE;
  }

  textAlign(LEFT, CENTER); // right
  x = RIGHT_X + OUT_NUMBER_DIST;
  y = TOP_Y + SQUARE_SIZE / 2;
  for (let row = 0; row < LENGTH; row++) {
    fill(rightErrors[row] ? NUMBER_COLOR_ERROR : NUMBER_COLOR_NORMAL);
    text(rightList[row], x, y);
    y += SQUARE_SIZE;
  }
}

function drawBoard() {
  drawEmptyBoard();
  drawNumbers();
  drawOutsideNumbers();
}


var backgroundR, backgroundG, backgroundB;
function newBackground()
{
  backgroundR = 192 + floor(random(256 - 192));
  backgroundG = 192 + floor(random(256 - 192));
  backgroundB = 192 + floor(random(256 - 192));
}
function drawBackground()
{
  if (backgroundR > 192 && Math.random() < 0.75) backgroundR--;
  if (backgroundR < 255 && Math.random() < 0.75) backgroundR++;
  if (backgroundG > 192 && Math.random() < 0.75) backgroundG--;
  if (backgroundG < 255 && Math.random() < 0.75) backgroundG++;
  if (backgroundB > 192 && Math.random() < 0.75) backgroundB--;
  if (backgroundB < 255 && Math.random() < 0.75) backgroundB++;
  background(backgroundR, backgroundG, backgroundB);
}

function setup() {
  
  // canvas
  createCanvas(WIDTH, HEIGHT);

  ptrRow = 0;
  ptrCol = 0;
 

  newBackground();
}

const TITLE_COLOR = 'rgb(128, 0, 128)';
const TITLE = " SUDOKU+";
const TITLE_X = WIDTH / 2, TITLE_Y = HEIGHT * 0.25;
const TITLE_SIZE = HEIGHT * 0.15;
function drawTitle() {
  fill(TITLE_COLOR);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(TITLE_SIZE);
  text(TITLE, TITLE_X, TITLE_Y);
  textStyle(NORMAL);
}

const CONGRATS_COLOR = 'rgb(0, 128, 128)';
const CONGRATS = "You won!";
const CONGRATS_X = WIDTH / 2, CONGRATS_Y = HEIGHT * 0.4;
const CONGRATS_SIZE = HEIGHT * 0.15;
function drawCongrats() {
  fill(CONGRATS_COLOR);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(CONGRATS_SIZE);
  text(CONGRATS, CONGRATS_X, CONGRATS_Y);
  textStyle(NORMAL);
}

const RULES_COLOR = 'rgb(0, 0, 0)';
const RULES_TEXT = `
                    Mode 4x4
Sắp xếp các số 1-4 sao cho mỗi số 
chỉ xuất hiện ở mỗi hàng, cột, và 
miền 2x2; mỗi số bên ngoài là tổng 2
số trong ô đầu tiên/cuối cùng 
của hàng hoặc cột tương ứng

                    Mode 9x9
Sắp xếp các số 1-9 sao cho mỗi số 
chỉ xuất hiện ở mỗi hàng, cột, và 
miền 3x3; mỗi số bên ngoài là tổng 3
số trong ô đầu tiên/cuối cùng 
của hàng hoặc cột tương ứng
`;
const RULES_X = WIDTH * 0.1, RULES_Y = HEIGHT * 0.45;
const RULES_SIZE = HEIGHT * 0.04;
function drawRules() {
  fill(RULES_COLOR);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(RULES_SIZE);
  text(RULES_TEXT, RULES_X, RULES_Y);
  textStyle(NORMAL);
}

function draw() {
  drawBackground();
  if (state === MENU) {
    drawTitle();
    drawButton(playButton);
    drawButton(modeButton);
    drawButton(rulesButton);
  } else if (state === GAME) {
    findErrors();
    drawBoard();
    drawButton(hintButton);

    if (checkVictory()) {
      state = WON;
    }
  } else if (state === MODE) {
    drawButton(backToMenuButton);
    drawButton(mode4x4Button);
    drawButton(mode9x9Button);
  } else if (state === RULES) {
    drawRules();
    drawButton(backToMenuButton);
  } else if (state === WON) {
    drawCongrats();
    drawButton(backToMenuButton);
  }
}

function keyPressed() {
  // console.log(key);
  if (state === MENU) {
  } else if (state === GAME) {
    if (0 <= key && key <= LENGTH) {
      if (!fixed[ptrRow][ptrCol]) board[ptrRow][ptrCol] = keyCode - 48;
    } else if (keyCode === LEFT_ARROW) {
      if (ptrCol - 1 >= 0) ptrCol--;
    } else if (keyCode === RIGHT_ARROW) {
      if (ptrCol + 1 < LENGTH) ptrCol++;
    } else if (keyCode === UP_ARROW) {
      if (ptrRow - 1 >= 0) ptrRow--;
    } else if (keyCode === DOWN_ARROW) {
      if (ptrRow + 1 < LENGTH) ptrRow++;
    } else if (keyCode === BACKSPACE) {
      board[ptrRow][ptrCol] = 0;
    }
  } else if (state === MODE) {

  } else if (state === RULES) {

  } else if (state === WON) {
    
  }
}

function mousePressed() {
  if (state === MENU) {
    if (buttonPointed(playButton)) {
      newBackground();
      state = GAME;
      generateNewGame();
    } else if (buttonPointed(modeButton)) {
      newBackground();
      state = MODE;
    } else if (buttonPointed(rulesButton)) {
      newBackground();
      state = RULES;
    }
  } else if (state === GAME) {
    if (LEFT_X <= mouseX && mouseX <= RIGHT_X && TOP_Y <= mouseY && mouseY <= BOTTOM_Y) {
      ptrRow = floor((mouseY - TOP_Y) / SQUARE_SIZE);
      ptrCol = floor((mouseX - LEFT_X) / SQUARE_SIZE);
    } else if (buttonPointed(hintButton)) {
      fixed[ptrRow][ptrCol] = true;
      board[ptrRow][ptrCol] = solution[ptrRow][ptrCol];
    }
  } else if (state === MODE) {
    if (buttonPointed(backToMenuButton)) {
      newBackground();
      state = MENU;
    } else if (buttonPointed(mode4x4Button)) {
      BLOCK = 2;
      calculateCoordinates();
      newBackground();
      state = MENU;
    } else if (buttonPointed(mode9x9Button)) {
      BLOCK = 3;
      calculateCoordinates();
      newBackground();
      state = MENU;
    }
  } else if (state === RULES) {
    if (buttonPointed(backToMenuButton)) {
      newBackground();
      state = MENU;
    }
  } else if (state === WON) {
    if (buttonPointed(backToMenuButton)) {
      newBackground();
      state = MENU;
    }
  }
  
}