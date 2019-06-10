let bg, ngnl;

function preload() {
    ngnl = loadFont('assets/no_game_no_life.ttf');
    gothic = loadFont('assets/JLSDataGothicC_NC.otf')
}

function setup() {
    frameRate(30);
    init();
}

let play, help, back, restart, menu, timer;
let started = false, end = true;

function init() {
    createCanvas(540, 540);
    started = false;
    textSize(100);
    textFont(ngnl);
    fill(0);
    text('Sudoku', 105, 230);
    textFont(gothic);
    play = createDiv('Play');
    play.position(240, 270);
    play.style('font-size', '35px');
    play.style('font-family', 'no_game_no_life');
    play.mouseOver(pglow);
    play.mouseOut(pnoglow);
    play.mousePressed(start);
    help = createDiv('Help');
    help.position(240, 320);
    help.style('font-size', '35px');
    help.style('font-family', 'no_game_no_life');
    help.mouseOver(hglow);
    help.mouseOut(hnoglow);
    help.mousePressed(howtoplay);
    if (back) back.hide();
    if (restart) restart.hide();
    if (menu) menu.hide();
    if (timer) timer.hide();
}

function pglow() {
    play.style('text-shadow', '0 0 10px gray');
}

function pnoglow() {
    play.style('text-shadow', 'none');
}

function hglow() {
    help.style('text-shadow', '0 0 10px gray');
}

function hnoglow() {
    help.style('text-shadow', 'none');
}

function bglow() {
    back.style('text-shadow', '0 0 10px gray');
}

function bnoglow() {
    back.style('text-shadow', 'none');
}

function howtoplay() {
    play.hide();
    help.hide();
    textSize(40);
    text('How to play', 195, 280);
    textSize(16);
    text('The classic Sudoku game involves a grid of 81 squares. The grid is divided into nine blocks, each containing nine squares.\nThe rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.\nThe difficulty lies in that each vertical nine-square column, or horizontal nine-square line across, within the larger square, must also contain the numbers 1-9, without repetition or omission.\nEvery puzzle has just one correct solution.', 60, 300, 440, 500);
    back = createDiv('Back');
    back.position(65, 500);
    back.style('font-size', '25px');
    back.style('font-family', 'no_game_no_life');
    back.mouseOver(bglow);
    back.mouseOut(bnoglow);
    back.mousePressed(init);
}

let counter = 0;
let sudoku, interval;
let numberOfHoles = Math.floor(Math.random() * 11 + 47);

console.log(numberOfHoles);

function start() {
    counter = 0;
    sudoku = new Sudoku(60);
    sudoku.generateGrid(numberOfHoles);
    if (!started) restart = createDiv('Restart');
    restart.position(575, 450);
    restart.style('font-size', '25px');
    restart.style('font-family', 'no_game_no_life');
    restart.mouseOver(rglow);
    restart.mouseOut(rnoglow);
    restart.mousePressed(start);
    if (!started) menu = createDiv('Back');
    menu.position(593, 480);
    menu.style('font-size', '25px');
    menu.style('font-family', 'no_game_no_life');
    menu.mouseOver(mglow);
    menu.mouseOut(mnoglow);
    menu.mousePressed(init);
    if (!started) timer = createDiv('');
    timer.position(593, 70);
    timer.style('font-size', '20px');
    timer.style('font-family', 'JLSDataGothicC_NC');
    if (interval) clearInterval(interval);
    timeIt();
    interval = setInterval(timeIt, 1000);
    started = true; end = false;
}

function rglow() {
    restart.style('text-shadow', '0 0 10px gray');
}

function rnoglow() {
    restart.style('text-shadow', 'none');
}

function mglow() {
    menu.style('text-shadow', '0 0 10px gray');
}

function mnoglow() {
    menu.style('text-shadow', 'none');
}

function draw() {
    if (started) {
        if (play) play.hide();
        if (help) help.hide();
        if (back) back.hide();
        createCanvas(690, 540);
        background(250, 250, 250);
        textSize(20);
        fill(0);
        text('Timer', 595, 50);
        sudoku.drawGrid();
        if (sudoku.checkGrid()) {
            end = true;
            clearInterval(interval);
            fill('rgba(255, 255, 255, 0.9)');
            rect(0, 0, 540, 540);
            fill(0);
            textSize(50);
            textAlign(CENTER, CENTER);
            text('Finished!', 270, 240);
            text('Time: ' + timer.html(), 270, 300);
        }
    }
}

let seconds, minutes, hours;

function timeIt() {
    counter++;
    seconds = counter % 60;
    minutes = floor(counter / 60);
    hours = floor(counter / 3600);
    timer.html(nf(hours, 2) + ':' + nf(minutes, 2) + ':' + nf(seconds, 2));
}

function mousePressed() {
    if (!end) {
        let x = mouseX;
        let y = mouseY;
        let cell = sudoku.getCellAt(x, y);
        if (cell !== undefined) {
            if (cell === sudoku.selectedCell) {
                sudoku.setCellValue(cell, ((sudoku.selectedCell.number + 1) % 10));
            } else {
                sudoku.setSelectedCell(cell);
            }
        }
    }
}

function keyPressed() {
    if (!end) {
        if (keyCode === UP_ARROW) {
            sudoku.moveSelection(0)
        } else if (keyCode === RIGHT_ARROW) {
            sudoku.moveSelection(1);
        } else if (keyCode === DOWN_ARROW) {
            sudoku.moveSelection(2);
        } else if (keyCode === LEFT_ARROW) {
            sudoku.moveSelection(3);
        } else if (keyCode === 96 || keyCode === 48 || keyCode === BACKSPACE || keyCode === DELETE || keyCode === RETURN || keyCode === ESCAPE) {
            sudoku.setCellValue(sudoku.selectedCell, 0);
        } else if (49 <= keyCode && keyCode <= 57) {
            sudoku.setCellValue(sudoku.selectedCell, keyCode - 48);
        } else if (97 <= keyCode && keyCode <= 105) {
            sudoku.setCellValue(sudoku.selectedCell, keyCode - 96);
        } else if (keyCode === 72) {
            sudoku.setShowPossiblities(!sudoku.showPossiblities);
        }
    }
}