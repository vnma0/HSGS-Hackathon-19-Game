let size = 8;
let number_of_umbrellas = 10;
let cellSize = 40;
let limit = 0; //maximum number of umbrellas
let arr = []; // randomize array
let board = [], curr = [], check = [];
let dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let chair_picture;
let posX = 300 - size / 2 * cellSize, posY = 300 - size / 2 * cellSize;
let umbrella = [];
let cntRow = [], cntCol = [];

let isEqual = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);

function Ppreload() {
    umbrella_picture = loadImage("assets/umbrella.png");
    chair_picture = loadImage("assets/chair.png");
}

function draw_chair(x, y) {
    image(chair_picture, x, y, cellSize, cellSize);
}

function draw_umbrella(x, y) {
    image(umbrella_picture, x, y, cellSize, cellSize);
}

function Psetup() {
    createCanvas(600, 600);
    background(200);
    if (size & 1)
        limit = (size + 1) * (size + 1) / 4;
    else
        limit = size * size / 4;
    for (let i = 0; i < limit; i++)
        arr[i] = i < number_of_umbrellas;
    shuffle(arr, 1); //randomize
    let cnt = 0, pos = 0;
    for (let i = 0; i < size; i++) {
        board[i] = [];
        curr[i] = [];
        check[i] = [];
        if (i & 1) continue;
        for (let j = 0; j < size; j++) {
            if (j & 1) continue;
            if (arr[cnt]) {
                umbrella[pos++] = [i, j];
                board[i][j] = 1; //1 is umbrella
            }
            else
                board[i][j] = 0;
            cnt++;
        }
    }

    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
            if (board[i][j] == undefined) board[i][j] = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] == 1)
                for (let k = 0; k < 4; k++) {
                    if (i + dir[k][0] < 0 || i + dir[k][0] >= size || j + dir[k][1] < 0 || j + dir[k][1] >= size)
                        continue;
                    if (board[i + dir[k][0]][j + dir[k][1]] == 0) {
                        board[i + dir[k][0]][j + dir[k][1]] = 2; //2 is chair
                        shuffle(dir, 1); //shuffle for randomness
                        break;
                    }
                }
        }
    }
    for (let i = 0; i < size; i++)
        console.log(board[i]);
    for (let i = 0; i < size; i++) {
        cntRow[i] = 0;
        cntCol[i] = 0;
    }
    for (let i = 0; i < size; i++) {
        //console.log(board[i])
        for (let j = 0; j < size; j++) {
            if (board[i][j] == 1) {
                cntRow[i]++;
                cntCol[j]++;
            }
        }
    }
    //console.log(cntRow,cntCol);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            square(posX + j * cellSize, posY + i * cellSize, cellSize);
            if (board[i][j] == 2)
                draw_chair(posX + j * cellSize, posY + i * cellSize);
        }
    }
    let i = umbrella[floor(random(0, number_of_umbrellas))][0], j = umbrella[floor(random(0, number_of_umbrellas))][1];
    check[i][j] = 1;
    cntRow[i]--;
    cntCol[j]--;
    draw_umbrella(posX + j * cellSize, posY + i * cellSize);
}

function PmouseClicked() {
    let x = mouseX, y = mouseY;
    if (isEqual(get(x, y).slice(0, 3), [200, 200, 200])) return;
    let posi = floor((y - posY) / cellSize), posj = floor((x - posX) / cellSize);
    console.log(posi, posj, curr[posi][posj], board[posi][posj]);
    if (board[posi][posj] == 2) return;
    curr[posi][posj] = !curr[posi][posj];
    if (curr[posi][posj]) {
        cntRow[posi]--;
        cntCol[posj]--;
    }
    else {
        cntRow[posi]++;
        cntCol[posj]++;
    }
}

function checkWin() {
    let win = 1;
    let tmp_row = 0, tmp_col = 0;
    for (let i = 0; i < size; i++) {
        if (cntRow[i] != 0) {
            win = 0;
            return;
        }
    }
    for (let j = 0; j < size; j++) {
        if (cntCol[j] != 0) {
            win = 0;
            return;
        }
    }
    let umb = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (curr[i][j])
                umb.push([i, j]);
        }
    }
    for (let i = 0; i < umb.length; i++) {
        for (let j = i + 1; j < umb.length; j++) {
            if (abs(umb[i][0] - umb[j][0]) <= 1 && abs(umb[i][1] - umb[j][1]) <= 1) {
                win = 0;
                return;
            }
        }
    }
    if (win == 1) {
        fill('green')
        textSize(50);
        text("YOU WIN", 300, 300);
        return;
    }
}

function Pdraw() {
    background(200);
    textSize(20);
    for (let j = 0; j < size; j++) {
        fill('black')
        text(cntCol[j], j * cellSize + posX + 14, posY - 25);
    }
    for (let i = 0; i < size; i++) {
        fill('black')
        text(cntRow[i], posX - cellSize + 15, i * cellSize + posY + cellSize - 20);
    }
    fill('white')
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            square(posX + j * cellSize, posY + i * cellSize, cellSize);
            //      if (board[i][j] == 1)
            //        draw_umbrella(posX+
            if (board[i][j] == 2)
                draw_chair(posX + j * cellSize, posY + i * cellSize, cellSize);
            else if (check[i][j] == 1)
                draw_umbrella(posX + j * cellSize, posY + i * cellSize, cellSize);
            else if (curr[i][j]) draw_umbrella(posX + j * cellSize, posY + i * cellSize, cellSize);
        }
    }
    checkWin();
}
