//game state:
//0: menu
//1: game
//2: win
let state = 0;
let numbers = new Array(6); // array of game numbers
let inp = 0; //number player 
//position of numbers
let pos = [
    [200,100],
    [150,200],
    [200,300],
    [450,100],
    [500,200],
    [450,300]
];
//position of number buttons;
let numButtonPos = [
    [50, 400],
    [100, 400],
    [150, 400],
    [200, 400],
    [250, 400],
    [300, 400],
    [350, 400],
    [400, 400],
    [450, 400],
    [500, 400]
];
//numbers buttons array
let ans = 0;
let factorArr = new Array(); //factors arrray of numbers
let buttons = new Array(10);
let backspace = new Button('X');
let submit = new Button('Submit');
let verdict = 1; //verdict of submission

function gcd(a,b) {
    while(b) {
        let tmp = b;
        b = a % b;
        a = tmp;
    }
    return a;
}


function menu() {
    push();
    textStyle(BOLD);
    textSize(30);
    text('    N10: Kiểm soát tình hình', 100, 50);
    pop();
    push();
    textSize(20);
    text('Sau khi vào được kén cứu sinh, phi hành gia Yuri lại phải', 50, 100);
    text('nhập một mật mã khác, chính là đáp án của câu đố dưới đây', 30, 125);
    text('để khởi động máy. Mật mã để nhập vào ô trống trung tâm là', 30, 150);
    text('một ước số chung lớn nhất của tất cả các số hiển thị trên bảng', 30, 175);
    text(' điều khiển. Cú rơi tàu vừa rồi khá nặng khiến Yuri vẫn còn ', 30, 200);
    text('choáng đầu, vậy nên bạn hãy cố gắng giúp anh ý lần nữa nhé! Lời ', 30, 225);
    text('khuyên là hãy cố gắng tính nhẩm nếu có thể.', 30, 250);
    pop();
    startButton = new Button('Bắt đầu');
    startButton.drawButtonText(225, 350, 150, 70, 20, 260, 390);
    if(startButton.isClicked()) {
        factorArr = [];
        state = 1; //change state to game
        ans = round(random(2,100));
        for(let i = 0; i <= 5; ++i) { 
            numbers[i] = ans * round(random(1,10)); //random game numbers
        }
        ans = numbers[5];
        for(let i = 0; i <= 4; ++i) {
            ans = gcd(ans, numbers[i]);
        }
        for(let i = 0; i <= 9; ++i) {
            buttons[i] = new Button(i);
        }
        verdict = true;
        console.log(ans);
    }
}

function game() {
    push();
    textSize(20);
    for(let i = 0; i <= 5; ++i) { 
        circle(pos[i][0], pos[i][1], 100);
        text(numbers[i],pos[i][0]-30,pos[i][1]+10);
    } 
    circle(325, 200, 100);
    text(inp, 300, 210);
    for(let i = 0; i <= 9; ++i) {
        buttons[i].drawButtonText(numButtonPos[i][0], numButtonPos[i][1], 30, 30, 20, numButtonPos[i][0] + 10, numButtonPos[i][1] + 20);
    }
    push();
    textStyle(BOLD);
    backspace.drawButtonText(550, 400, 30, 30, 20, 560, 423);
    for(let i = 0; i <= 9; ++i) {
        if(buttons[i].isClicked()) {
           inp *= 10;
           inp += buttons[i].value;
        }
    }
    if(backspace.isClicked()) {
        inp /= 10;
        inp = floor(inp);
    }
    if(!verdict) {
        push();
        fill('red');
        text('WRONG ANSWER!!!', 225, 375);
        pop();
    }
    submit.drawButtonText(220, 450, 140, 50, 30, 240, 480);
    if(submit.isClicked()) {
        if(ans === inp) {
            state++;
        }
        else {
            verdict = 0;
        }
    }
    pop();
}

function win() {
    push();
    fill('red');
    textStyle(BOLD);
    textSize(50);
    text('CHÚC MỪNG', 150, 200);
    text(' BẠN ĐÃ THẮNG!!!!!!!!!!', 50, 300);
    pop();
}

function setup() {
    createCanvas(600,600);
    frameRate(8);
}

function draw() {
    background(255);
    if(state === 0) menu();
    else if(state === 1) game();
    else if(state === 2) win();
}