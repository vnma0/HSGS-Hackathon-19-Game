let ima = ['one', 'two', 'three', 'four', 'five'];
let col = ['#00ff00', '#0000ff', '#00ffff', '#ff00ff', '#ffff00', '#0ffff0', '#ff0ff0'];
let imawin, imalose, bualiem, de, thuong, kho, sandbox;
let starttime, endtime; // tinh thoi gian choi
let counlose;
let size_p_o;
//Load anh de lam cac thu cac thu
function preload() {
  de = loadImage('pic/easy.jpg');
  thuong = loadImage('pic/med.jpg');
  kho = loadImage('pic/hard.jpg');
  sandbox = loadImage('pic/Sandbox.png');
  bualiem = loadImage('pic/bua liem.png');
  imawin = loadImage('pic/phatngontwin.jpg');
  imalose = loadImage('pic/phatngon.jpg');
  for (let i = 0; i < 5; i++) {
    let tmp = 'pic/' + ima[i] + '.jpg';
    ima[i] = loadImage(tmp);
  }
}

let board = [],
  size = 8,
  coun = 0,
  cnt = 0,
  limit = 5,
  tt = '';
let blaced, da_chon, thutu, dc = 0;
let isWin, chose;
let coun_hang = [], // coun_hang(i,j) : dem so lan xuat hien so j o hang i
  coun_cot = [], // coun_cot(i,j) : dem so lan xuat hien so j o cot i
  coun_ans; // so hang sai va so cot sai

// duoi day la ham spawn random
function spawn() {
  size_p_o = 600 / size;
  starttime = millis();
  tt = '';
  dc = 0;
  board = [];
  blaced = [];
  coun_hang = [];
  coun_cot = [];
  da_chon = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    blaced.push([]);
    coun_hang.push([]);
    coun_cot.push([]);
    da_chon.push([]);
    for (let j = 0; j < size; j++) {
      da_chon[i].push(0);
      board[i].push(0);
      blaced[i].push(0);
    }
    for (let j = 0; j < 2 * size; j++) {
      coun_hang[i].push(0);
      coun_cot[i].push(0);
    }
  }

  // Random cac o sai
  for (let i = 0; i < limit; i++) {
    x = int(random(0, size - 0.0001));
    y = int(random(0, size - 0.0001));
    if (blaced[x][y] == 1) i--;
    blaced[x][y] = 1;
  }
  thutu = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (blaced[i][j] == 0) {
        coun++;
        thutu.push([i, j]);
      }
    }
  }

  thutu = shuffle(thutu);

  // Sinh board dung truoc voi cac o khong phai o sai
  for (let i of thutu) {
    for (let j = 1; j < 2 * size; j++) {
      if (coun_hang[i[1]][j] == 0 && coun_cot[i[0]][j] == 0) {
        coun_hang[i[1]][j]++;
        coun_cot[i[0]][j]++;
        board[i[0]][i[1]] = j;
        break;
      }
    }
  }

  coun_ans = 0;
  chose = [];
  // Danh sach cac so co the chon
  for (let i = 1; i < size * 2; i++) {
    chose.push(i);
  }

  //Bat dau random
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] == 0) {
        chose = shuffle(chose);
        for (let k of chose) {
          if (coun_hang[j][k] == 1 || coun_cot[i][k] == 1) {
            coun_hang[j][k]++;

            coun_cot[i][k]++;
            if (coun_hang[j][k] == 2) {
              coun_ans++;
            }
            if (coun_cot[i][k] == 2) {
              coun_ans++;
            }
            board[i][j] = k;
            // console.log(j + ' ' + i + ' ' + coun_hang[j][k] + ' ' + coun_cot[i][k]);
            break;
          }

        }
      }
    }
  }

}
//hoan thanh
function hienthi() {
  counlose = millis();
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      da_chon[i][j] = 0;
      if (blaced[i][j] == 1) { // blaced(i,j)==1 neu la 1 trong nhung o duoc chon lam o sai ban dau
        da_chon[i][j] = 1;
      }
    }
  }
  tt = 'lose';
  dc = limit;
  coun_ans = 0;
}

function ez() { //Easy
  size = 5;
  limit = 5;
  spawn();
}

function med() { // Medium
  size = 8;
  limit = 10;
  spawn();
}

function hard() { //Hard
  size = 10;
  limit = 15;
  spawn();
}

let sizein, limitin; // Custom
function cus() {
  size = min(12, sizein.value());
  limit = min(int(size * size / 3), limitin.value());
  spawn();
}

function hamrieng() { // Introduction
  if (tt != 'introduction') {
    tt = 'introduction';
  } else {
    spawn();
  }
}

function setup() {
  createCanvas(900, 700);
  // Tao cac button lua chon muc do
  let intro = createButton('INTRODUCTION');
  let solution = createButton('SOLUTION :(');
  let easy = createButton('EASY');
  let inter = createButton('INTERMEDIATE');
  let har = createButton('HARD');
  let custom = createButton('CUSTOM');
  sizein = createInput();
  limitin = createInput();
  intro.position(660, 10);
  intro.size(150, 20);
  intro.mousePressed(hamrieng);
  solution.position(660, 50);
  solution.size(150, 20);
  solution.mousePressed(hienthi);
  easy.position(660, 185);
  easy.size(150, 20);
  easy.mousePressed(ez);
  inter.position(660, 310);
  inter.size(150, 20);
  inter.mousePressed(med);
  har.position(660, 435);
  har.size(150, 20);
  har.mousePressed(hard);
  sizein.position(660, 590);
  sizein.size(150, 15);
  limitin.size(150, 15);
  limitin.position(660, 615);
  custom.position(660, 640);
  custom.size(150, 20);
  custom.mousePressed(cus);
  ez();
}

function layer1() {
  //cute board here

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[j][i] <= 5) {
        image(ima[board[j][i] - 1], j * size_p_o, i * size_p_o + 50, size_p_o, size_p_o);
      } else if (board[j][i] <= 8) {
        fill(col[board[j][i] - 5]);
        square(j * size_p_o, i * size_p_o + 50, size_p_o);
      } else {
        fill('white');
        square(j * size_p_o, i * size_p_o + 50, size_p_o);
        textSize(30);
        textAlign(CENTER, CENTER);
        fill('black');
        text(board[j][i] - 8, j * size_p_o, i * size_p_o + 50, size_p_o, size_p_o);
      }
      if (da_chon[j][i] > 0) {
        noFill();
        strokeWeight(3);
        stroke('red');
        square(j * size_p_o, i * size_p_o + 50, size_p_o);
        line(j * size_p_o, i * size_p_o + 50, j * size_p_o + size_p_o, i * size_p_o + size_p_o + 50);
        line(j * size_p_o + size_p_o, i * size_p_o + 50, j * size_p_o, i * size_p_o + size_p_o + 50);
        strokeWeight(1);
        stroke('black');
        fill('black');
      }
    }
  }
}

function draw() {
  background(255);
  fill(123, 97, 74);
  rect(0, 0, 900, 700);
  fill(122);
  rect(605,0,295,700);
  layer1();
  // textAlign(LEFT,TOP);
  // text(thutu,10,510,500,500);
  // text(coun_ans, 515, 15);
  textAlign(LEFT);
  textSize(30);
  fill('black');
  text('Bạn còn ' + (limit - dc) + ' lượt !!!!', 10, 25);
  if (coun_ans == 0 && tt == '') {
    tt = 'win';
    endtime = millis();
  }
  textSize(14);
  textAlign(LEFT, CENTER);
  fill('black');
  text('Size: ', 620, 590, 50, 25);
  text('Lượt: ', 620, 615, 50, 25);
  if (tt == 'introduction') { //Introduction
    fill('white');
    rect(0, 0, 600, 700);
    fill('black');
    textAlign(LEFT, TOP);
    textSize(20);
    text('Phùng Xuân Nhạ là nhân vật nổi tiếng trong lòng con dân đất Việt. Gần đây ông phải tham dự rất nhiều buổi họp báo. Ông đương nhiên không thể dự hết các buổi họp báo này nên đã tạo ra các phân thân để dự họp báo. Trong n ngày liên tiếp, mỗi ngày có n cuộc họp, tại n địa điểm như nhau, vì không khôn cho lắm nên phân thân của ông nhận việc rất ngu. Trong một ngày một phân thân không thể tham gia hơn một cuộc họp, một phân thân cũng không xuất hiện tại một địa điểm hai lần để tránh tạo ra sự chán nản cho người dự.\n\t Vì bạn thông minh hơn họ, hãy bỏ bớt tối đa x cuộc họp để thỏa mãn điều kiện trên, tránh tiếng xấu cho Nhạ.\n\n P/S: mỗi hàng trong bảng là 1 ngày, mỗi cột là 1 địa điểm.\n\tsize chỉ hoạt động từ 3 - 12\n\tsố lượt tối đa bằng 1/3 số cuộc họp', 10, 10, 580, 680);
  } else if (tt == 'win') {
    if(millis() - endtime < 2000){
      return;
    }
    fill(123, 97, 74);
    rect(0, 0, 900, 700);
    textSize(14);
    textAlign(LEFT, CENTER);
    fill('black');
    text('Size: ', 620, 190, 50, 25);
    text('Lượt: ', 620, 215, 50, 25);
    image(imawin, 0, 0, 600, 400);
    textSize(90);
    fill('#00ff00');
    textAlign(LEFT, TOP);
    text('You win. Time: ' + int((endtime - starttime) / 1000) + ' s', 10, 500);
  } else if (tt == 'lose') {
    if (millis() - counlose < 2000) return;
    fill(123, 97, 74);
    rect(0, 0, 900, 700);
    textSize(14);
    textAlign(LEFT, CENTER);
    fill('black');
    text('Size: ', 620, 190, 50, 25);
    text('Lượt: ', 620, 215, 50, 25);
    image(imalose, 0, 0, 600, 400);
    textSize(100);
    fill('#00ff00');
    textAlign(LEFT, TOP);
    text('You lose. Gà!!!!!!!', 10, 500);
  } else {
    //Hien thoi gian choi
    text('Time: ' + int((millis() - starttime) / 1000) + ' s', 400, 25);
  }
  tint(80,80,80,120);
  image(bualiem,0,50,600,600);
  noTint();
  image(de,660,85,150,100);
  image(thuong,660,210,150,100);
  image(kho,660,335,150,100);
  image(sandbox,660,480,150,100);
}

function mousePressed() {
  if (tt != '') return;
  if (mouseX >= 600 || mouseY >= 650 || mouseY < 50) return;
  var i = Math.floor((mouseY - 50) / size_p_o);
  var j = Math.floor(mouseX / size_p_o);
  // console.log(size + ' ' + limit + ' ' + mouseX + ' ' + mouseY + ' ' + i + ' ' + j);
  if (da_chon[j][i] == 0) {
    if (dc >= limit) return;
    da_chon[j][i] = 1;
    if (coun_cot[j][board[j][i]] == 2) {
      coun_ans--;
    }
    if (coun_hang[i][board[j][i]] == 2) {
      coun_ans--;
    }
    coun_cot[j][board[j][i]]--;
    coun_hang[i][board[j][i]]--;

    dc++;
  } else {
    da_chon[j][i] = 0;
    coun_cot[j][board[j][i]]++;
    coun_hang[i][board[j][i]]++;
    if (coun_cot[j][board[j][i]] == 2) {
      coun_ans++;
    }
    if (coun_hang[i][board[j][i]] == 2) {
      coun_ans++;
    }
    dc--;
  }
}