/*
    This game (S35) give the player a board contains symbols,
    and the number on the end of the columm/row which is the
    sum of the values that the symbols represent. The player's
    task is to find the value of each of the symbol.
*/

let N;// the number of rows/collums (num_of_rows = num_of_collums);
let board = [];// the board
let val = [];// the value of the symbols, generated randomly
let ind = [];// the index of the symbol of a[i][j] (0 for circle, 1 for cross, 2 for pentagon, ...)
let sumcol = [];// the given collum sums
let sumrow = [];// the given row sums
let state = 1;// state of the game: 1 if there has been no answer, 0 for win and 2 for wrong answer
let inputs = [];// to input the answers
let inpN;// to input N;
let circles, cross, pentagon, squares, star, hourglass, infinity, minus, triangles, win, lose;// photos
let page = 1;// which page the player's in
let frame = 0;// anti-lagging (lag -> player double-click -> can't see the verdict)

function preload(){// preload the images for use
    circles = loadImage('./Photos/circle.png');
    cross = loadImage('./Photos/cross.png');
    pentagon = loadImage('./Photos/pentagon.png');
    squares = loadImage('./Photos/square.png');
    star = loadImage('./Photos/star.png');
    hourglass = loadImage('./Photos/hourglass.png');
    infinity = loadImage('./Photos/infinity.png');
    minus = loadImage('./Photos/minus.png');
    triangles = loadImage('./Photos/triangle.png');
    win = loadImage('./Photos/you_win.png');
    lose = loadImage('./Photos/wrong_answer.png');
}

function setup(){
    createCanvas(800, 800);
    frameRate(10);
}

function khoitao(){
    for(let i = 0; i < N - 1; i++) val[i] = Math.floor(Math.random() * 10 + 1);// generate the numbers
    for(let i = 0; i < N; i++) ind[i] = [];
    for(let i = 0; i < N; i++) board[i] = [];
    for(let i = 0; i < N; i++){
      for(let j = 0; j < N; j++){
          // the index of a[i][j];
          let tmp = (Math.floor(Math.random() * (N - 1)));
          ind[i][j] = tmp;
          board[i][j] = val[tmp];
        }
    }
    // the sum for each row/collum
    for(let i = 0; i < N; i++){
        let sums = 0;
        for(let j = 0; j < N; j++) sums = sums + board[i][j];
        sumrow[i] = sums;
    }
    for(let j = 0; j < N; j++){
        let sums = 0;
        for(let i = 0; i < N; i++) sums = sums + board[i][j];
        sumcol[j] = sums;
    }
}


function check(){// check if the player's answer is valid
    let ok = 1;// ok: 1 for right answer and 0 for wrong answer
    for(let i = 0; i < N; i++){
        let sum = 0;
        for(let j = 0; j < N; j++) sum += parseInt(inputs[ind[i][j]].value());
        if(sum != sumrow[i]) ok = 0;
    }
    for(let j = 0; j < N; j++){
        let sum = 0;
        for(let i = 0; i < N; i++) sum += parseInt(inputs[ind[i][j]].value());
        if(sum != sumcol[j]) ok = 0;
    }
    if(ok == 0) state = 2;
    else state = 0;
}

/*
    Page 1: Introduction of the game
    Page 2: Enter N
    Page 3: The game
    Page 4/5: Verdict: + Page 4: You win!
                       + Page 5: Wrong answer!
*/

// x: to check if the "Enter N" input has been drawn to ensure it won't be drawn again every frame
// y: to check if the answer inputs have been drawn to ensure they won't be drawn again every frame
let x = false;
let y = false;

function clickpage1(){// change to page 2
    page++;
    x = false;
    y = false;
    state = 1;
}

function clickpage2(){// change to page 3
    page++;
    N = parseInt(inpN.value());
    inpN.hide();
}

function draw(){
    if(page == 1){
        background(255);
        push();
        textSize(30);
        text('Ai thông minh hơn học sinh lớp 5'.toUpperCase(), 100, 70);
        pop();
        push();
        textSize(15);
        text(`Chào mừng các bạn đến với game ai thông minh hơn học sinh lớp 5.
Nhiệm vụ của trò chơi này là chứng minh bạn thông minh hơn học sinh lớp 5
Để làm được điều đó, bạn phải giải được câu đố của chúng tôi.`,100, 110);
        text(`Cho 1 bảng N * N (2 <= N <= 10), N do bạn nhập
trong đó mỗi ô là 1 trong N - 1 biểu tượng coder đã chọn.
Ở cuối mỗi hàng/cột là tổng của các biểu tượng đã cho.`, 100, 175);
        text(`Bạn cần điền giá trị của các biểu tượng vào các ô trống.
Khi nào bạn muốn nộp bài, ấn vào chữ "ANSWER".'
Nếu câu trả lời của bạn sai, chương trình sẽ đưa ra chữ "wrong answer".
Còn không, chương trình sẽ đưa ra chữ "you win".'
Nếu bạn muốn chơi lại, chỉ cần ấn vào biểu tượng "you win" hoặc "wrong answer" ở màn hình`, 100, 240);
        text('Bạn đã sẵn sàng chưa? Nếu bạn đã sẵn sàng, nhấp vào chữ "bắt đầu" ở dưới.', 100, 340);
        pop();
        rect(200, 440, 50, 50);
        text('Bắt đầu', 205, 465);
        if(mouseX >= 200 && mouseX <= 250 && mouseY >= 440 && mouseY <= 490 && mouseIsPressed) clickpage1();
        // Stimulate the start button, because the coder can't erase the button
    }
    else if(page == 2 && x == false){
        background(255);
        text('Enter N', 20, 75);
        inpN = createInput('');
        inpN.position(70, 60);
        x = true;
        rect(245, 60, 40, 30);
        text('Enter', 250, 77);
    }
    if(page == 2 && mouseX >= 245 && mouseX <= 285 && mouseY >= 60 && mouseY <= 90 && !isNaN(parseInt(inpN.value())) && parseInt(inpN.value()) > 1 && parseInt(inpN.value()) <= 10 && mouseIsPressed) clickpage2();
    // Stimulate the enter button, because the coder can't erase the button
    else if(page == 3){
        background(255);
        rect(345, 30 * N + 115, 50, 30);
        text('Answer', 350, 30 * N + 133);
        if(mouseX >= 350 && mouseX <= 400 && mouseY >= (30 * N + 115) && mouseY <= (30 * N + 145) && mouseIsPressed) check();
        // Stimulate the answer button, because the coder can't erase the button
        if(!isNaN(N) && N != 1){
            if(val[0] == undefined){
                khoitao();
            }
            if(N >= 2){
                image(circles, 20, 30 * N + 110, 30, 30);
                text('=', 60, 30 * N + 130);
                if(y == false) inputs[0] = createInput('');
                if(y == false) inputs[0].position(80, 30 * N + 115);
            }
            if(N >= 3){
                image(cross, 20, 30 * N + 140, 30, 30);
                text('=', 60, 30 * N + 160);
                if(y == false) inputs[1] = createInput('');
                if(y == false) inputs[1].position(80, 30 * N + 145);
            }
            if(N >= 4){
                image(pentagon, 20, 30 * N + 170, 30, 30);
                text('=', 60, 30 * N + 190);
                if(y == false) inputs[2] = createInput('');
                if(y == false) inputs[2].position(80, 30 * N + 175);
            }
            if(N >= 5){
                image(squares, 20, 30 * N + 200, 30, 30);
                text('=', 60, 30 * N + 220);
                if(y == false) inputs[3] = createInput('');
                if(y == false) inputs[3].position(80, 30 * N + 205);
            }
            if(N >= 6){
                image(star, 20, 30 * N + 230, 30, 30);
                text('=', 60, 30 * N + 250);
                if(y == false) inputs[4] = createInput('');
                if(y == false) inputs[4].position(80, 30 * N + 235);
            }
            if(N >= 7){
                image(hourglass, 20, 30 * N + 260, 30, 30);
                text('=', 60, 30 * N + 280);
                if(y == false) inputs[5] = createInput('');
                if(y == false) inputs[5].position(80, 30 * N + 265);
            }
            if(N >= 8){
                image(infinity, 20, 30 * N + 290, 30, 30);
                text('=', 60, 30 * N + 310);
                if(y == false) inputs[6] = createInput('');
                if(y == false) inputs[6].position(80, 30 * N + 295);
            }
            if(N >= 9){
                image(minus, 20, 30 * N + 320, 30, 30);
                text('=', 60, 30 * N + 340);
                if(y == false) inputs[7] = createInput('');
                if(y == false) inputs[7].position(80, 30 * N + 325);
            }
            if(N >= 10){
                image(triangles, 20, 30 * N + 350, 30, 30);
                text('=', 60, 30 * N + 370);
                if(y == false) inputs[8] = createInput('');
                if(y == false) inputs[8].position(80, 30 * N + 355);
            }
        y = true;
    }
    // show the sum of rows + collums
    for(let i = 0; i < N; i++){
        text(sumcol[i], 60 + 30 * N, 109 + 31 * i);
        text(sumrow[i], 58 + 30 * i, 110 + 30 * N);
    }  
    // Appear the icons
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            if(ind[i][j] == 0) image(circles, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 1) image(cross, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 2) image(pentagon, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 3) image(squares, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 4) image(star, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 5) image(hourglass, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 6) image(infinity, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 7) image(minus, 50 + 30 * i, 90 + 30 * j, 30, 30);
            if(ind[i][j] == 8) image(triangles, 50 + 30 * i, 90 + 30 * j, 30, 30);
        }
    }
    // Appear the verdict for the player's answer
    if(state == 2) page = 5;
    if(state == 0) page = 4;
    }
    else if(page == 4){// win page
        frame++;
        background(255);
        for(let i = 0; i < N - 1; i++) inputs[i].hide();
        image(win, 0, 0, 800, 800);
        N = NaN;
        val[0] = undefined;
        if(mouseX <= 800 && mouseY <= 800 && mouseIsPressed && frame >= 20){    
            page = 1;
            frame = 0;
        }
    }
    else if(page == 5){// lose page
        background(255);
        frame++;
        for(let i = 0; i < N - 1; i++) inputs[i].hide();
        image(lose, 0, 0, 800, 800);
        N = NaN;
        val[0] = undefined;
        if(mouseX <= 800 && mouseY <= 800 && mouseIsPressed && frame >= 20){   
            page = 1;
            frame = 0;
        }
    }
}
