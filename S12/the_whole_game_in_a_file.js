var size = 75; //kich co mot hinh luc giac
var canvassize = 600; //self-explanatory
var alreadypressed = 0; //kiem tra xem chuot da duoc bam chua
var buttonpressed = 0; //kiem tra xem bat ki cai gi da duoc bam chua
var px = canvassize / 2, //toa do x cua hinh luc giac giua
  py = canvassize / 2; //toa do y cua hinh luc giac giua
var won = 0; // kiem tra xem da thang chua
let myfont; 
var hesor = 6 / 8,
  hesog = 4 / 8,
  hesob = 4 / 8; 
var bgr = 150,
  bgg = 150,
  bgb = 150,
  offsetr = 20,
  offsetg = 20,
  offsetb = 20; 
var giatoc = 99 / 100; 
var layers; 
var distx, disty; 
var startsp = 2.5; 
var chosen; 
var button = 0; 
var pos = [
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2]
]; 
var last = [
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2],
  [px = canvassize / 2, py = canvassize / 2]
]
var playtime = 0; 
var val = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
var speed = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0]
]; 
var shadecolor = [
  [+offsetr * 2, +offsetg * 2, +offsetb * 2],
  [+offsetr, +offsetg, +offsetb],
  [-offsetr, -offsetg, -offsetb],
  [-offsetr * 2, -offsetg * 2, -offsetb * 2],
  [-offsetr, -offsetg, -offsetb],
  [+offsetr, +offsetg, +offsetb]
]; 
let chose = [0, 0, 0, 0, 0, 0, 0]; 
let clipcnt = 0; 
let arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]; 
let arr1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]; 

var clipped = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
var isclipped = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]; 

function Init() {

  let cnt = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  for (let j = 0; j <= 5; j++) {
    while (1) {
      arr[0][j] = floor(random(1, 9)); 
      if (cnt[0][arr[0][j]] == 0) {
        cnt[0][arr[0][j]] = 1; 
        break; 
      }
    }
  }
  arr[1][1] = arr[0][4]; 
  arr[2][2] = arr[0][5]; 
  arr[3][3] = arr[0][0]; 
  arr[4][4] = arr[0][1]; 
  arr[5][5] = arr[0][2]; 
  arr[6][0] = arr[0][3]; 
  cnt[1][arr[1][1]] = 1; 
  cnt[2][arr[2][1]] = 1; 
  cnt[3][arr[3][1]] = 1; 
  cnt[4][arr[4][1]] = 1; 
  cnt[5][arr[5][1]] = 1; 
  cnt[6][arr[6][0]] = 1; 
  for (let i = 1; i <= 6; i++) {
    while (1) {
      arr[i][i - 1] = floor(random(1, 9)); 
      if (cnt[i][arr[i][i - 1]] == 0) {
        cnt[i][arr[i][i - 1]] = 1; 
        break; 
      }
    }
  }
  arr[2][3] = arr[1][0]; 
  arr[3][4] = arr[2][1]; 
  arr[4][5] = arr[3][2]; 
  arr[5][0] = arr[4][3]; 
  arr[6][1] = arr[5][4]; 
  arr[1][2] = arr[6][5]; 
  cnt[2][arr[2][3]] = 1; 
  cnt[3][arr[3][4]] = 1; 
  cnt[4][arr[4][5]] = 1; 
  cnt[5][arr[5][0]] = 1; 
  cnt[6][arr[6][1]] = 1; 
  cnt[1][arr[1][2]] = 1; 
  for (let i = 1; i <= 6; i++) {
    for (let j = i; j <= i + 2; j++) {
      let k = (j + 2) % 6; 
      while (1) {
        arr[i][k] = floor(random(1, 9)); 
        if (cnt[i][arr[i][k]] == 0) {
          cnt[i][arr[i][k]] = 1; 
          break; 
        }
      }
    }
  }
}

function initialize() {
  won = 1; 
  playtime = 0; 
  for (let i = 0; i < 7; i++) {
    let rtt = random(2); 
    speed[i][0] = cos(PI * rtt) * startsp; 
    pos[i][0] = canvassize / 2; 
    last[i][0] = pos[i][0]; 
    speed[i][1] = sin(PI * rtt) * startsp; 
    pos[i][1] = canvassize / 2; 
    last[i][1] = pos[i][1]; 
  }
  clipcnt = 0; 
  // bgb=150; 
  // bgr=150; 
  // bgg=150; 
  for (let i = 0; i <= 14;  i++) {
    for (let j = 0;  j <= 9;  j++) {
      arr1[i][j] = 0; 
      arr[i][j] = 0; 
    }
  }
  for (let i = 0;  i <= 7;  i++) {
    clipped[i] = 0; 
    isclipped[i] = 10; 
  }
}

function setup() {
  createCanvas(canvassize, canvassize); 
  frameRate(60); 
  myfont = loadFont('thefont.otf'); 
  textFont(myfont); 
  initialize(); 
  Init(); 
  isclipped[0] = 0; 
  button = 250; 
  bgg = 220; 
  clipcnt = 7; 
  won = 0; 
}

function generate_() {
  hexa(px, py); 
  for (let i = 0;  i <= 5;  i++) {
    var dist = sqrt(3) / 2 * size + 5; 
    hexa(px + dist * cos(PI / 6 + PI / 3 * i) * 2, px + dist * sin(PI / 6 + PI / 3 * i) * 2); 
  }
}

function hexa(tx, ty) {
  push(); 
  translate(tx, ty); 
  for (let i = 0;  i <= 5;  i++) {
    let px1 = size * cos(PI / 3 * i); 
    let py1 = size * sin(PI / 3 * i); 
    let px2 = size * cos(PI / 3 * (i + 1)); 
    let py2 = size * sin(PI / 3 * (i + 1)); 
    strokeWeight(2); 
    stroke(bgr - 20, bgg - 20, bgb - 20); 
    line(0, 0, px1, py1); 
    strokeWeight(5); 
    stroke(shadecolor[i][0] + bgr, bgg + shadecolor[i][1], bgb + shadecolor[i][2]); 
    line(px1, py1, px2, py2); 
  }
  pop(); 
}

function hexanoi(tx, ty, cac, id) {
  push(); 
  translate(tx, ty); 
  let distt = sqrt(3) * size / 3; 
  for (let i = 0;  i <= 5;  i++) {
    let px1 = size * cos(PI / 3 * i); 
    let py1 = size * sin(PI / 3 * i); 
    let px2 = size * cos(PI / 3 * (i + 1)); 
    let py2 = size * sin(PI / 3 * (i + 1)); 
    fill(bgr + cac, bgg + cac, bgb + cac); 
    triangle(0, 0, px1, py1, px2, py2); 
  }
  for (let i = 0;  i <= 5;  i++) {
    let px1 = size * cos(PI / 3 * i); 
    let py1 = size * sin(PI / 3 * i); 
    let px2 = size * cos(PI / 3 * (i + 1)); 
    let py2 = size * sin(PI / 3 * (i + 1)); 
    strokeWeight(2); 
    stroke(bgr - 20 + cac, bgg - 20 + cac, bgb - 20 + cac); 
    line(0, 0, px1, py1); 
    strokeWeight(5); 
    stroke(bgr + shadecolor[(i + 3) % 6][0] + cac, bgg + shadecolor[(i + 3) % 6][1] + cac, bgb + shadecolor[(i + 3) % 6][2] + cac); 
    line(px1, py1, px2, py2); 
  }
  textAlign(CENTER); 
  textSize(15); 
  for (var i = 0;  i <= 5;  i++) {
    let px1 = distt * cos(PI / 3 * i + PI / 6) + 1; 
    let py1 = distt * sin(PI / 3 * i + PI / 6) + 10; 
    // console.log(id,arr[id]); 
    strokeWeight(2); 
    fill(bgr + 20 + cac, bgg + 20 + cac, bgb + 20 + cac); 
    stroke(bgr + 20 + cac, bgg + 20 + cac, bgb + 20 + cac); 
    // console.log(arr[id]); 
    text(arr[id][i], px1, py1); 
    strokeWeight(5); 
  }
  pop(); 
}

function getdist(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)); 
}

function slowdown(i) {
  speed[i][0] *= giatoc; 
  speed[i][1] *= giatoc; 
  // speed[i][0]+=trux; 
  // speed[i][1]+=truy; 
  // if(i==1)
  // console.log(speed[i])
}


function shadow(tx, ty) {
  push(); 
  strokeWeight(0); 
  translate(tx, ty); 
  for (let i = 0;  i <= 5;  i++) {
    let px1 = (size - 4) * cos(PI / 3 * i); 
    let py1 = (size - 4) * sin(PI / 3 * i); 
    let px2 = (size - 4) * cos(PI / 3 * (i + 1)); 
    let py2 = (size - 4) * sin(PI / 3 * (i + 1)); 
    fill(0, 0, 0, 80); 
    triangle(0, 0, px1, py1, px2, py2); 
  }
  pop(); 
}
var totfr = 0; 
var notpressedyet = 1,
  theone = 10,
  ddx, ddy, notchosenyet = 1; 

function clip(id, des) {
  speed[id] = [0, 0]; 
  for (let i = 0;  i < 6;  i++) {
    arr1[des][i] = arr[id][i]; 
  }
}

function unclip(des) {
  for (let i = 0;  i < 6;  i++) {
    arr1[des][i] = 0; 
  }
}

function hexagon_hole() {
  translate(px, py); 
  let distt = sqrt(3) * size / 3; 
  for (let i = 0;  i <= 5;  i++) {
    let px1 = size * cos(PI / 3 * i); 
    let py1 = size * sin(PI / 3 * i); 
    let px2 = size * cos(PI / 3 * (i + 1)); 
    let py2 = size * sin(PI / 3 * (i + 1)); 
    let fillcol = 60; 
    fill(fillcol, fillcol, fillcol); 
    stroke(fillcol, fillcol, fillcol); 
    triangle(0, 0, px1, py1, px2, py2); 
  }
}

function animation(time) {
  push(); 
  translate(0, 0); 
  let time1 = min(time, size); 
  hexagon_hole(); 
}

function hexathing() {
  push(); 
  translate(px, py); 
  let distt = sqrt(3) * size / 3; 
  for (let i = 0;  i <= 5;  i++) {
    let px1 = (size - 3) * cos(PI / 3 * i); 
    let py1 = (size - 3) * sin(PI / 3 * i); 
    let px2 = (size - 3) * cos(PI / 3 * (i + 1)); 
    let py2 = (size - 3) * sin(PI / 3 * (i + 1)); 
    let fillcol = 60; 
    fill(150, 210, 150, button); 
    stroke(150, 210, 150, button); 
    strokeWeight(1); 
    triangle(0, 0, px1, py1, px2, py2); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  }
  fill(150, 190, 150, button); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  stroke(150, 190, 150, button); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  strokeWeight(0); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  let ss = 5; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  triangle(-3 * ss, -5 * ss, -3 * ss, 5 * ss, 5 * ss, 0 * ss); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  pop(); /* Noi that la em cung khong nho em viet cai gi vao day nua */
}

function check() {
  if (arr1[1][1] != arr1[0][4] && arr1[1][1] != 0 && arr1[0][4] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[2][2] != arr1[0][5] && arr1[2][2] != 0 && arr1[0][5] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[3][3] != arr1[0][0] && arr1[3][3] != 0 && arr1[0][0] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[4][4] != arr1[0][1] && arr1[4][4] != 0 && arr1[0][1] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[5][5] != arr1[0][2] && arr1[5][5] != 0 && arr1[0][2] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[6][0] != arr1[0][3] && arr1[6][0] != 0 && arr1[0][3] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[2][3] != arr1[1][0] && arr1[2][3] != 0 && arr1[1][0] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[3][4] != arr1[2][1] && arr1[3][4] != 0 && arr1[2][1] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[4][5] != arr1[3][2] && arr1[4][5] != 0 && arr1[3][2] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[5][0] != arr1[4][3] && arr1[5][0] != 0 && arr1[4][3] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[6][1] != arr1[5][4] && arr1[6][1] != 0 && arr1[5][4] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (arr1[1][2] != arr1[6][5] && arr1[1][2] != 0 && arr1[6][5] != 0) return 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  return 1; /* Noi that la em cung khong nho em viet cai gi vao day nua */
}

var jump = 1.5; /* Noi that la em cung khong nho em viet cai gi vao day nua */

function draw() {
  playtime++; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  // console.log(clipcnt,check()); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (check() > 0 && clipcnt != 7) {
    if (bgr > 150) {
      bgr -= jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    } else if (bgr < 150) {
      bgr += jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    }
    if (bgb > 150) {
      bgb -= jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    } else if (bgb < 150) {
      bgb += jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    }
    if (bgg > 150 + clipcnt * 10) {
      bgg -= jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    } else if (bgg < 150 + clipcnt * 10) {
      bgg += jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    }
  } else if (check() == 0) {
    if (bgr > 200) {
      bgr -= jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    } else if (bgr < 200) {
      bgr += jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    }
    if (bgb > 70) {
      bgb -= jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    } else if (bgb < 70) {
      bgb += jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    }
    if (bgg > 70) {
      bgg -= jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    } else if (bgg < 70) {
      bgg += jump; /* Noi that la em cung khong nho em viet cai gi vao day nua */
    }
  }
  // console.log(bgr, bgg, bgb); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  // console.log(check()); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  totfr++; /* Noi that la em cung khong nho em viet cai gi vao day nua */
  background(bgr, bgg, bgb); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  generate_(); /* Noi that la em cung khong nho em viet cai gi vao day nua */
  if (button == 0)
    if (mouseIsPressed) {
      if (notpressedyet) {
        notpressedyet = 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
        if (notchosenyet) {
          let yolo = 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */
          for (let i = 6; /* Noi that la em cung khong nho em viet cai gi vao day nua */ i >= 0; /* Noi that la em cung khong nho em viet cai gi vao day nua */ i--) {
            if (isclipped[i] < 10) continue; /* Noi that la em cung khong nho em viet cai gi vao day nua */
            if (getdist(pos[i][0], pos[i][1], mouseX, mouseY) <= size - 10) {
              if (isclipped[i] != 10) {
                unclip(isclipped[i]); 
                clipped[isclipped[i]] = 0; 
                isclipped[i] = 10; 
                clipcnt--; 
              }
              notchosenyet = false; 
              theone = i; 
              ddx = mouseX - pos[i][0]; 
              ddy = mouseY - pos[i][1]; 
              yolo = true; 
              break; 
            }
          }
          if (!yolo)
            for (let i = 6;  i >= 0;  i--) {
              if (getdist(pos[i][0], pos[i][1], mouseX, mouseY) <= size - 10) {
                if (isclipped[i] != 10) {
                  unclip(isclipped[i]); 
                  clipped[isclipped[i]] = 0; 
                  isclipped[i] = 10; 
                  clipcnt--; 
                }
                notchosenyet = false; 
                theone = i; 
                ddx = mouseX - pos[i][0]; 
                ddy = mouseY - pos[i][1]; 
                break; 
              }
            }
        }
      }
    } else {
      if (!notpressedyet) {
        notpressedyet = true; 
        if (!notchosenyet) {
          notchosenyet = true; 
          speed[theone][0] = pos[theone][0] - last[theone][0]; 
          speed[theone][1] = pos[theone][1] - last[theone][1]; 
          speed[theone][0] /= 2; 
          speed[theone][1] /= 2; 
          if (dist(px, py, pos[theone][0], pos[theone][1]) < 20 && !clipped[0]) {
            clipped[0] = 1; 
            isclipped[theone] = 0; 
            pos[theone][0] = px; 
            pos[theone][1] = py; 
            clip(theone, 0); 
            clipcnt++; 
          }
          for (let i = 1;  i <= 6;  i++) {
            let abcd = 5; 
            let px1 = px + (size - abcd) * cos(-PI / 2 - PI / 3 + PI / 3 * i) * 2,
              py1 = py + (size - abcd) * sin(-PI / 2 - PI / 3 + PI / 3 * i) * 2; 
            if (dist(px1, py1, pos[theone][0], pos[theone][1]) < 20 && !clipped[i]) {
              clipped[i] = 1; 
              isclipped[theone] = i; 
              pos[theone][0] = px1; 
              pos[theone][1] = py1; 
              clip(theone, i); 
              clipcnt++; 
            }
          }
        }
        theone = 1000; 
      }
    } {
      for (let i = 0;  i <= 6;  i++) {
        last[i][0] = pos[i][0]; 
        last[i][1] = pos[i][1]; 
        if (i == theone) {
          pos[i][0] = mouseX - ddx; 
          pos[i][1] = mouseY - ddy; 
          shadow(mouseX - ddx + 5, mouseY - ddy + 10); 
          hexanoi(mouseX - ddx - 3, mouseY - ddy - 3, 20, i); 
        } else {
          if (pos[i][0] < size || pos[i][0] > canvassize - size) {
            speed[i][0] *= 3 / 5; 
            speed[i][1] *= 3 / 5; 
            if (pos[i][0] < size) {
              pos[i][0] = size; 
              speed[i][0] = -speed[i][0]; 
            } else {
              pos[i][0] = canvassize - size; 
              speed[i][0] = -speed[i][0]; 
            }
          }
          pos[i][0] += speed[i][0]; 
          if (pos[i][1] < size * sqrt(3) / 2 || pos[i][1] > canvassize - size * sqrt(3) / 2) {
            speed[i][0] *= 3 / 5; 
            speed[i][1] *= 3 / 5; 
            if (pos[i][1] < size * sqrt(3) / 2) {
              pos[i][1] = size * sqrt(3) / 2; 
              speed[i][1] = -speed[i][1]; 
            } else {
              pos[i][1] = canvassize - size * sqrt(3) / 2; 
              speed[i][1] = -speed[i][1]; 
            }
          }
          pos[i][1] += speed[i][1]; 
          hexanoi(pos[i][0], pos[i][1], 0, i); 
          slowdown(i); 
        }
      }
      for (let i = 0;  i <= 6;  i++) {
        if (i == theone) {
          pos[i][0] = mouseX - ddx; 
          pos[i][1] = mouseY - ddy; 
          shadow(mouseX - ddx + 5, mouseY - ddy + 10); 
          hexanoi(mouseX - ddx - 3, mouseY - ddy - 3, 20, i); 
        } else {
          if (isclipped[i] == 10)
            hexanoi(pos[i][0], pos[i][1], 0, i); 
        }
      }
    }
  // image(img,0,0,canvassize,canvassize); 
  if (check() > 0 && clipcnt == 7) {
    playtime--; 
    let totaltime = playtime / 60; 
    button += jump * 2; 
    if (button >= 250) button = 250; 
    fill(150, 220, 150, button); 
    rect(-10, -10, 610, 610); 
    push(); 
    fill(150, 200, 150, button); 
    stroke(150, 200, 150, button); 
    textAlign(CENTER); 
    textSize(50); 
    strokeWeight(3); 
    if (won) text(floor(totaltime / 60) + "m " + floor(totaltime % 60) + "s ", 300, 200); 
    else
    {
      push();
      textSize(30);
      strokeWeight(2);
      // loadFont('comic_sans.ttf');
      loadFont('yes.ttf');
      text("hexagon-thingy game",300,200);
      pop();
    }
    pop(); 
    for (let i = 0;  i <= 6;  i++) {
      if (isclipped[i] == 0) {
        hexanoi(px, py, 0, i); 
      }
    }
    hexathing(0); 
    if (mouseIsPressed) {
      if (!alreadypressed) {
        alreadypressed = 1; 
        if (dist(px, py, mouseX, mouseY) <= size) {
          buttonpressed = true; 
        }
      }
      if (buttonpressed) {
        hexa(px, py); 
        hexathing(0); 
      }
    } else {
      if (alreadypressed) {
        alreadypressed = 0; 
        if (buttonpressed) {
          initialize(); 
          Init(); 
          button = 0; 
        }
        buttonpressed = false; 
      }
    }
  }
}