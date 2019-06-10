let time, screen = 0,
    imgchair, imgumb, backg, font, sz = 8,
    Maxtime = 60,
    instimg, optimg;

function setup() {
    createCanvas(800, 800);
}

function preload() {
    font = loadFont('assets/ShowcaseSans.ttf');
    imgchair = loadImage('assets/chair2.png');
    imgumb = loadImage('assets/um2.png');
    backg = loadImage('assets/Asset 1.png');
    instimg = loadImage('assets/instback.jpg');
    optimg = loadImage('assets/optback.jpg');
}

function startscreen() {
    image(backg, 0, 0);
    textFont(font);
    textSize(60);
    fill('black');
    text('BEACH PARTY TIME!!!', 400, 200);
    //text('Summer Party Game',400,100);
    textSize(40);
    if (mouseX >= 335 && mouseX <= 465 && mouseY >= 420 && mouseY <= 464) {
        fill('cyan');
        rect(335, 420, 130, 44, 70);
        fill('brown');
        text('PLAY', 400, 440);
    } else {
        fill('pink');
        rect(335, 420, 130, 44, 70);
        fill('blue');
        text('PLAY', 400, 440);
    }
    if (mouseX >= 310 && mouseX <= 490 && mouseY >= 510 && mouseY <= 554) {
        fill('cyan');
        rect(310, 510, 180, 44, 70);
        fill('brown');
        text('OPTIONS', 400, 530);
    } else {
        fill('pink');
        rect(310, 510, 180, 44, 70);
        fill('blue');
        text('OPTIONS', 400, 530);
    }
    if (mouseX >= 280 && mouseX <= 520 && mouseY >= 600 && mouseY <= 644) {
        fill('cyan');
        rect(280, 600, 240, 44, 70);
        fill('brown');
        text('INSTRUCTION', 400, 620);
    } else {
        fill('pink');
        rect(280, 600, 240, 44, 70);
        fill('blue');
        text('INSTRUCTION', 400, 620);
    }
}
function optionscreen() {
    image(optimg, 0, 0);
    fill('black');
    stroke(15);
    textFont(font);
    textSize(25);
    text('Mức độ:', 200, 390);
    text('Độ lớn:', 200, 540);
    textSize(40);
    if (mouseX >= 75 && mouseX <= 185 && mouseY >= 690 && mouseY <= 800) {
        fill('cyan');
        rect(75, 690, 110, 44, 70);
    } else {
        noFill();
        rect(75, 690, 110, 44, 70);
    }
    fill('black');
    text('Back', 130, 710);
}
function instscreen() {
    fill('black');
    stroke(10);
    image(instimg, 0, 0);
    textFont(font);
    textSize(25);
    text('LUẬT CHƠI:', 160, 100);
    text('thao tác:', 160, 360);
    textSize(18);
    stroke(2);
    text('Bờ biển được chia thành một bảng N x N. Một số ô vuông có chứa', 370, 130);
    text('ghế. Xung quanh (chung cạnh) mỗi chiếc ghế có 1 chiếc ô.', 380, 150);
    text('Số ở đầu cột và hàng cho biết số chiếc ô trên hàng,', 385, 170);
    text('cột đó. Mục tiêu của bạn là tìm ra toàn bộ các', 370, 190);
    text('ô vuông chứa ô trên bờ biển trong thời gian cho phép.', 385, 210);
    text('Click chuột trái vào 1 ô vuông để đặt ô', 370, 390);
    text('Click chuột trái vào 1 ô vuông có ô để xóa ô', 370, 410);
    text("khi bạn đã chắc chắn với câu trả lời, click 'submit'", 370, 430);
    if (mouseX >= 530 && mouseX <= 670 && mouseY >= 580 && mouseY <= 630) {
        fill('cyan');
        rect(530, 580, 140, 50, 70);
    } else {
        noFill();
        rect(530, 580, 140, 50, 70);
    }
    fill('black');
    textSize(40);
    text('Đã rõ!', 600, 600);
}

function mouseClicked() {
    if (screen == 0) {
        if (mouseX >= 335 && mouseX <= 465 && mouseY >= 420 && mouseY <= 464) {
            screen = 3;
        } else if (mouseX >= 310 && mouseX <= 490 && mouseY >= 510 && mouseY <= 554) {
            screen = 1;
        } else if (mouseX >= 280 && mouseX <= 520 && mouseY >= 600 && mouseY <= 644) {
            screen = 2;
        }
    }
    if (screen == 2) {
        if (mouseX >= 530 && mouseX <= 670 && mouseY >= 580 && mouseY <= 630) screen = 0;
    }
    if (screen == 1) {
        if (mouseX >= 75 && mouseX <= 185 && mouseY >= 690 && mouseY <= 800) screen = 0;
    }
}

function draw() {
    textAlign(CENTER, CENTER);
    if (screen == 0) startscreen();
    else if (screen == 1) optionscreen();
    else if (screen == 2) instscreen();
    else if (screen == 3) play();
}
function play() {
    Ppreload()
    Psetup()
    mouseClicked = PmouseClicked
    return draw = Pdraw;
}