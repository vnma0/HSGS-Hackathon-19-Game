let a = [],
  val = []; //mảng a để lưu số trong bảng và mảng val để                         lưu các số sẽ được điền vào trong bảng
let dem1, sum, b = 0,
  c = 0;
let start, kcach1, kcach2, ktra;
let score = 0,
  times, realTime, fakescore = 0,
  waittime = 10;

function setup() {
  createCanvas(600, 450);
  frameRate(60);
  for (let i = 0; i < 4; i++) {
    a.push([]);
    for (let j = 0; j < 4; j++) {
      a[i].push('');
    }
  }
  for (let i = 0; i < 16; i++) {
    val.push();
  }

}

let state = 0; //các trạng thái của trò chơi
let x = 0,
  y = 0; // tọa độ của ô được chọn trong bảng
//hàm để điền số vào bảng
function keyTyped() {
  if ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) {
    a[x][y] = a[x][y] + str(key);
  }
}
//hàm để thao tác chuột trong trò chơi
function mouseClicked() {
  //xác định ô được điền trong bảng
  if (mouseX >= 150 && mouseY >= 100 && mouseX < 450 && mouseY < 400 && state == 2) {
    x = int((mouseX - 150) / 75);
    y = int((mouseY - 100) / 75);
  } //nếu click vào ô 'submit' sẽ chạy hàm kiểm tra 
  else if (mouseX >= 483 && mouseY >= 215 && mouseX < 557 && mouseY < 235 && state == 2) {
    check();
  } //nếu click vào ô 'Chơi' thì sẽ bắt đầu vào phần chơi
  else if (mouseX >= 265 && mouseY >= 230 && mouseX < 335 && mouseY < 260 && state == 0) {
    state = 1;
  } //nếu click vào ô 'Hướng dẫn' thì sẽ chuyển sang phần hướng dẫn chơi 
  else if (mouseX >= 215 && mouseY >= 300 && mouseX < 385 && mouseY < 330 && state == 0) {
    state = 5;
  }
}
//hàm thiết lập phím
function keyPressed() {
  //nếu nhấn phím 'Backspace' thì sẽ xóa đi 1 kí tự
  if (keyCode == 8) {
    a[x][y] = a[x][y].substring(0, a[x][y].length - 1);
  } //nếu nhấn phím mũi tên sẽ thay đổi được vị trí điền số trong bảng
  else if (keyCode == 37 && x > 0) {
    x--;
  } else if (keyCode == 39 && x <= 2) {
    x++;
  } else if (keyCode == 38 && y > 0) {
    y--;
  } else if (keyCode == 40 && y <= 2) {
    y++;
  }
}
//hàm khởi tạo bảng sau mỗi lần chơi
function init() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      a[i][j] = '';
    }
  }
}
//hàm kiểm tra xem cách điền có thỏa mãn hay không
function check() {
  dem1 = 0;
  for (let i = 0; i < 4; i++) {
    sum = 0;
    for (let j = 0; j < 4; j++) {
      sum = sum + int(a[i][j]);
    }
    if (sum == ktra) dem1++;
  }
  for (let j = 0; j < 4; j++) {
    sum = 0;
    for (let i = 0; i < 4; i++) {
      sum = sum + int(a[i][j]);
    }
    if (sum == ktra) dem1++;
  }
  sum = 0;
  for (let i = 0; i < 4; i++) {
    sum = sum + int(a[i][i]);
  }
  if (sum == ktra) dem1++;
  sum = 0;
  for (let i = 0; i < 4; i++) {
    sum = sum + int(a[i][3 - i]);
  }
  if (sum == ktra) dem1++;
  if (dem1 == 10) state = 3;
  else {
    state = 4;
  }
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  // màn hình chính của trò chơi
  if (state == 0) {
    //khởi tạo điểm số,thời gian
    score = 0;
    fakescore = 0;
    times = 0;
    textSize(50);
    //phần viết tên game,tạo nút 'Chơi' và nút 'Hướng dẫn'
    stroke('black');
    fill('green');
    text("NGÔI", 100, 100);
    fill('red');
    text("NHÀ", 235, 100);
    fill('yellow');
    text("TOÁN", 375, 100);
    fill('blue');
    text("HỌC", 520, 100);
    circle(100, 300, 100);
    fill('red');
    square(450, 250, 100);
    fill('black');
    textSize(30);
    noStroke();
    if (mouseX >= 265 && mouseY >= 230 && mouseX < 335 && mouseY < 260) {
      stroke('grey');
    }
    fill('white');
    rect(265, 230, 70, 30);
    fill('black');
    text("Chơi", 300, 250);
    noStroke();
    if (mouseX >= 215 && mouseY >= 300 && mouseX < 385 && mouseY < 330) {
      stroke('grey');
    }
    fill('white');
    rect(215, 300, 170, 30);
    fill('black');
    text("Hướng dẫn", 300, 320);
  }
  //màn hình chờ để chuẩn bị vào chơi
  if (state == 1) {
    // đây là phần để thiết lập mảng val
    //biến b và c được dùng để ngăn không cho random chạy nhiều lần
    if (b == 0) {
      start = int(random(100));
      kcach1 = int(random(250));
      kcach2 = int(random(250));
      b++;
    }
    val[0] = start;
    for (let i = 1; i < 16; i++) {
      if (i % 4 == 0) val[i] = val[i - 4] + kcach2;
      else val[i] = val[i - 1] + kcach1;
    }
    ktra = val[0] + val[7] + val[11] + val[12];
    if (c == 0) {
      val = shuffle(val);
      c++;
    }
    //đây là phần để thiết lập thời gian chờ (waittime) và điểm số
    fakescore = score;
    init();
    realTime = 120;
    if (times < 50) times++;
    else if (times == 50) {
      waittime--;
      times = 0;
    }
    if (waittime == 0) state = 2;
    //nếu nhấn phím 'S' sẽ chuyển sang màn hình chơi
    if (keyIsPressed) {
      if (keyIsDown(83)) {
        state = 2;
      }
    }
    //phần viết đề và hiển thị thời gian chờ
    textSize(20);
    text("Hãy điền các số sau vào bảng sao cho tổng các số ở mỗi hàng", 300, 20);
    text("ngang,dọc và chéo đều bằng " + ktra + ".", 300, 40);
    textSize(15);
    text(val, 300, 70);
    fill('white');
    stroke('black');
    square(150, 100, 300);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        square(150 + i * 75, 100 + j * 75, 75);
      }
    }
    textSize(20);
    fill('green');
    noStroke();
    text("Game sẽ bắt đầu sau: " + waittime + " .Hoặc nhấn 'S' để chơi luôn", 300, 430);
    fill('black');

  }
  //phần màn hình chơi
  if (state == 2) {
    waittime = 10; //đặt lại waittime cho lượt chơi sau
    //cài đặt thời gian cho màn chơi (120s)
    if (times < 50) times++;
    else if (times == 50) {
      realTime--;
      times = 0;
    }
    if (realTime == 0) {
      state = 4;
    }
    //phần tạo bảng,hiển thị điểm số và thời gian
    textSize(15);
    fill('black');
    noStroke();
    text(val, 300, 70);
    textSize(20);
    text("Score:", 60, 160);
    text(score, 60, 190);
    textSize(25);
    text("Goal: " + ktra, 300, 30);
    textSize(20);
    text("Time left:", 60, 250);
    text(realTime, 60, 280);
    fill('white');
    noStroke();
    square(150, 100, 300);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i == x && j == y) {
          strokeWeight(4);
          stroke('blue');
        } else {
          strokeWeight(1);
          stroke('black');
        }
        square(150 + i * 75, 100 + j * 75, 75);
        fill('black');
        noStroke();
        textSize(20);
        text(a[i][j], 150 + i * 75, 100 + j * 75, 75, 75);
        //kiểm tra nếu số được điền không có trong các số đã cho thì sẽ chuyển sang màu đỏ
        if (a[i][j].length > 0) {
          dem = 0;
          for (let k = 0; k < 16; k++) {
            if (int(a[i][j]) == val[k]) {
              dem++;
            }
          }
          if (dem == 0) {
            fill('red');
            square(150 + i * 75, 100 + j * 75, 75);
            fill('black');
            textSize(20);
            text(a[i][j], 150 + i * 75, 100 + j * 75, 75, 75);
            fill('white');
          } else fill('white');
        } else fill('white');
      }
    }
    noStroke();
    //phần tạo nút 'Submit'
    if (mouseX >= 483 && mouseY >= 215 && mouseX < 557 && mouseY < 235) {
      stroke('grey');
    }
    rect(483, 210, 75, 30);
    fill('black');
    text("Submit", 520, 225);
    fill('white');
    //nếu nhấn nút 'R' sẽ chơi lại màn đó
    if (keyIsPressed) {
      if (keyIsDown(82)) state = 1;
    }
  }
  //phần hiệu ứng khi qua màn
  if (state == 3) {
    textSize(30);
    fill('green');
    stroke('black');
    text("Chúc mừng! Bạn đã qua màn! 😊", 300, 200);
    textSize(19);
    fill('black');
    noStroke();
    text("Nhấn 'Z' để chơi tiếp", 300, 260);
    b = 0;
    c = 0;
    stroke('black');
    fill('blue');
    circle(100, 300, 100);
    fill('red');
    square(450, 250, 100);
    score = fakescore + 1; //cộng 1 điểm khi qua màn
    //nếu nhấn 'Z' sẽ chuyển qua màn tiếp theo
    if (keyIsPressed) {
      if (keyIsDown(90)) state = 1;
    }
  }
  //phần hiệu ứng khi thua cuộc
  if (state == 4) {
    textSize(30);
    fill('red');
    stroke('black');
    text("Bạn đã thua cuộc 😢", 300, 200);
    textSize(19);
    fill('black');
    noStroke();
    text("Score: " + score, 300, 260); //hiển thị điểm số đã đạt được
    text("Nhấn 'R' để thử lại", 300, 300);
    b = 0;
    c = 0;
    stroke('black');
    fill('blue');
    circle(100, 300, 100);
    fill('red');
    square(450, 250, 100);
    //Nhấn nút 'R' để quay lại màn hình chính
    if (keyIsPressed) {
      if (keyIsDown(82)) state = 0;
    }
  }
  //phần hướng dẫn chơi
  if (state == 5) {
    //hiển thị đoạn hướng dẫn
    textSize(40);
    text("Hướng dẫn", 300, 30);
    line(200, 50, 400, 50);
    textSize(20);
    text("-Nhiệm vụ của bạn là phải điền các số đề bài cho vào bảng 4x4", 300, 70);
    text("sao cho thỏa mãn với yêu cầu của đề bài.Để điền số bạn chỉ cần", 300, 95);
    text("click vào ô trống trên bảng sau đó điền số mà bạn muốn.Lưu ý là", 300, 120);
    text("mỗi số chỉ được điền 1 lần.Khi đã chắc chắn về kết quả, bạn có ", 300, 145);
    text("thể nhấn nút 'Submit' bên phải để nộp bài.Bạn có 120s cho mỗi  ", 300, 170);
    textAlign(LEFT, CENTER);
    text("màn chơi.", 17, 195);
    textAlign(CENTER, CENTER);
    text("-Nếu bạn điền đúng và hoàn thành trong thời gian quy định thì", 300, 230);
    text("bạn sẽ thắng và qua màn chơi tiếp theo. Ngược lại bạn sẽ thua.", 300, 255);
    text("-Bạn có thể quay trở về màn hình chính bất cứ lúc nào bằng ", 300, 290);
    textAlign(LEFT, CENTER);
    text("cách nhấn phím 'B'.", 15, 315);
    textAlign(CENTER, CENTER);
    fill('green');
    text("So easy, right 😀", 300, 350);
    text("Nhấn 'R' để quay trở lại", 300, 390);
    fill('black');
    //Nhấn nút 'R' để quay lại màn hình chính
    if (keyIsPressed) {
      if (keyIsDown(82)) state = 0;
    }
  }

}