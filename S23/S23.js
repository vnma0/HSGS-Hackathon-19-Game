var posPurx = [];
var posPury = [];
var purzle = [
  // purz 1
    [
      1,
      [
        [1, 1, 1],
        [0, 1, 0]
      ], 
      [
        [0, 1],
        [1, 1],
        [0, 1]
      ],
      [
        [0, 1, 0],
        [1, 1, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0]
      ]
    ],
  // pur2
    [
      1,
      [
        [0,1,0],
        [1,1,1],
        [0,1,0],
      ],
    ],
  // pur3
    [
      1,
      [
        [1, 1],
        [1, 1],
      ]
    ],
  // pur4
    [
      1,
      
      [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
      
      [
        [1, 1, 0],
        [0, 1, 1]
      ], 
      
      [
        [1, 0],
        [1, 1],
        [0, 1]
      ],
      
      [
        [0, 1, 1],
        [1, 1, 0]
      ]
    ],
  // pur5
    [
      1,
      
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      
      [
        [1, 1],
        [1, 0],
        [1, 0]
      ],
      
      [
        [1, 1, 1],
        [0, 0, 1]
      ],
      
      [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      
      [
        [0, 0, 1],
        [1, 1, 1]
      ],
      
      [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      
      [
        [1, 1, 1],
        [1, 0, 0]
      ],
      
      [
        [1, 1],
        [0, 1],
        [0, 1]
      ]
    ]
]
var SnowRain = [];
var table = [
  [],[],[],[],[],[]
];
var tableAnswer = [
  [],[],[],[],[],[]
]
var val = [
  [],[],[],[],[],[]
]
var numX = [
  [],[],[],[],[],[]
]
var numY = [
  [],[],[],[],[],[],[],[],[]
]
var CnumX = [ //  compare result in column
  [],[],[],[],[],[]
]
var CnumY = [ // compare result int row
  [],[],[],[],[],[],[],[],[]
]
var COUNT = 0;
var countPuzz = 5;
var vis = [];
var a = [];
var puzz;
var move = 0;
var x = 80, y = 100;
var px = 360, py = 50;
var screen = 1;
var WIN = 0;
var Frame  = 1;
var img;
function col(type){
  if(type==0) fill('blue');
  if(type==1) fill('red');
  if(type==2) fill('orange');
  if(type==3) fill('green');
  if(type==4) fill('pink');
}
function preload() {
  img = loadImage('example.png');
}
function setup() {
  createCanvas(500,450);
  for(let i=0;i<6;i++){
    for(let j=0;j<9;j++){
      tableAnswer[i].push(0);
    }
  }
  resetAll();
}
function resetAll(){
  table = [
    [],[],[],[],[],[]
  ];
  tableAnswer = [
    [],[],[],[],[],[]
  ];
  val = [
    [],[],[],[],[],[]
  ];
  numX = [
    [],[],[],[],[],[]
  ];
  numY = [
    [],[],[],[],[],[],[],[],[]
  ];
  CnumX = [ 
    [],[],[],[],[],[]
  ];
  CnumY = [ 
   [],[],[],[],[],[],[],[],[]
  ];
  WIN = 0;
  for(let i=0;i<6;i++){
    for(let j=0;j<9;j++){
      tableAnswer[i].push(0);
    }
  }
  for(let i=0;i<6;i++){
    for(let j=0;j<9;j++){
      table[i].push(0);
    }
  }
  COUNT = 0;
  countPuzz = 5;
  for(let i=0;i<5;i++){
    posPurx[i] = px;
    posPury[i] = py+i*80;
    vis[i] = 0;
  }
}
  
function resetTable(){
  let k = puzz;
  let cx = posPurx[k];
  let cy = posPury[k];
  let I = int((posPurx[k]-x)/35);
  let J = int((posPury[k]-y)/35);
  for(let i=I;i<I+purzle[k][purzle[k][0]].length;i++) {
    for(let j=J;j<J+purzle[k][purzle[k][0]][i-I].length;j++) {
      if(purzle[k][purzle[k][0]][i-I][j-J]==1){
         table[i][j] = 0;
      }
    }    
  }
}
function answer(){
  for(let i=0;i<6;i++){
    for(let j=0;j<9;j++){
      if(tableAnswer[i][j]) col(val[i][j]);
      else fill('white');
      square(x+i*35,y+j*35,35);
    }
  }
  textSize(20);
  fill('black');
  for(let i=0;i<6;i++){
    for(let k=numX[i].length-1;k>=0;k--){
      textAlign(CENTER);
      text(numX[i][k],x+i*35+17,y-10-(numX[i].length-k-1)*25);
    }
  }
  for(let j=0;j<9;j++){
    for(let k=numY[j].length-1;k>=0;k--){
      textAlign(CENTER);
      text(numY[j][k],x-12-(numY[j].length-k-1)*25,y+j*35+17,5);
    }
  }
  textSize(35);
  textAlign(LEFT);
  fill('black');
  fill("green");
  text("Replay", 360,225);
}
function makeRandom(){
  let cnt = 0;
  while(countPuzz>0 && cnt<100){
    let k = countPuzz - 1;
    while(true){
      let I = int(random(5));
      let J = int(random(8));
      let cx = x + I * 35; 
      let cy = y + J * 35;
      let ok = 0;
      for(let f=1;f<purzle[k].length;f++){
        ok = 1;
        if(I+purzle[k][f].length>=6||J+purzle[k][f][0].length>=9) continue;
        for(let i=I;i<I+purzle[k][f].length;i++) {
          for(let j=J;j<J+purzle[k][f][i-I].length;j++) {
            if(purzle[k][f][i-I][j-J]==1){
              if(tableAnswer[i][j]==1) ok = 0;
            }
          }    
        }  
        if(ok==1){
          countPuzz--;
          for(let i=I;i<I+purzle[k][f].length;i++) {
            for(let j=J;j<J+purzle[k][f][i-I].length;j++) {
              if(purzle[k][f][i-I][j-J]==1){
                tableAnswer[i][j] = 1;
                val[i][j] = k;
              }
            }    
          } 
          break;
        }else ok = 0;
      }
      if(ok==1) break;
    }
    cnt++;
  }
}
function calculateRandom(){
  for(let i=0;i<6;i++){
    let cnt = 0;
    for(let j=0;j<9;j++){
      if(j==0){
        if(tableAnswer[i][j]==1){
          cnt = 1;
        }
      }else{
        if(tableAnswer[i][j]==1){
          cnt++; 
        }else{
          if(cnt>0){
            numX[i].push(cnt);
          }
          cnt = 0;
        }
      }
    }
  }
  for(let j=0;j<9;j++){
    let cnt = 0;
    for(let i=0;i<6;i++){
      if(i==0){
        if(tableAnswer[i][j]==1){
          cnt = 1;
        }
      }else{
        if(tableAnswer[i][j]==1){
          cnt++; 
        }else{
          if(cnt>0){
            numY[j].push(cnt);
          }
          cnt = 0;
        }
      }
    }
  }
}
function mouseClicked() {
  var ux = mouseX, uy = mouseY;
  if(screen==6){
    if(ux>=10&&ux<=170&&uy>=350&&uy<=410){
        resetAll();
        screen = 1;
        return;
      }
  }
  if(screen==5){
    if(ux>=30&&ux<=100&&uy>=380&&uy<=410){
      screen = 1;
      return;
    }
    if(ux>=250&&ux<=450&&uy>=260&&uy<=320){
      screen = 6;
      return;
    }
  }
  if(screen==3){
    if(ux>=360&&ux<=440&&uy>=190&&uy<=235){
      resetAll();
      screen = 1;
      return;
    }
  }
  if(screen==1){
    if(ux>=180&&ux<=325&&uy>=190&&uy<=260){
      screen = 2;
      return;
    }
    if(ux>=197&&ux<=302&&uy>=293&&uy<=343) {
      screen = 5; 
      return;
    }
  }
  if(screen==4){
    if(WIN==1){
      if(ux>=200&&ux<=300&&uy>=180&&uy<=380){
        resetAll();
        screen = 1;
        return;
      }
    }
    if(WIN==2){
      if(ux>=300&&ux<=460&&uy>=350&&uy<=410){
        screen = 3;
        return;
      }
      if(ux>=10&&ux<=170&&uy>=350&&uy<=410){
        resetAll();
        screen = 1;
        return;
      }
    }
  }
  if(screen==2){
    if(ux>=5&&ux<=76&&uy>=18&&uy<=50){
      check();
      return;
    }
  }
  if(move==0){
    for(let k=0;k<purzle.length;k++){
      for(let i=0;i<purzle[k][purzle[k][0]].length;i++) {
        for(let j=0;j<purzle[k][purzle[k][0]][i].length;j++) {
          let cx = posPurx[k];
          let cy = posPury[k];
          if(purzle[k][purzle[k][0]][i][j]==1){
            if(vis[k]==0){
              if(ux>=cx+i*20&&ux<=cx+(i+1)*20&&uy>=cy+j*20&&uy<=cy+(j+1)*20){
                puzz = k;
                move = 1;
                return;
              }
            }else{
              if(ux>=cx+i*35&&ux<=cx+(i+1)*35&&uy>=cy+j*35&&uy<=cy+(j+1)*35){
                puzz = k;
                move = 1;
                resetTable();
                return;
              }
            }
          }    
        }
      }
    }
  }
  if(move==1){
    posPurx[puzz] = mouseX;
    posPury[puzz] = mouseY;
    move = 0;
    let ok = 1;
    let Sx = px;
    let Sy = py+puzz*80;
    for(let i=0;i<6;i++){
      for(let j=0;j<9;j++){
        let cx = x+i*35;
        let cy = y+j*35;
        let Cx = ux;
        let Cy = uy;
        if(abs(Cx - cx)<19.5 &&abs(Cy-cy)<19.5){
          let k = puzz;
          for(let p=0;p<purzle[k][purzle[k][0]].length;p++) {
            for(let q=0;q<purzle[k][purzle[k][0]][p].length;q++) {
              if(purzle[k][purzle[k][0]][p][q]==1) {
                if(i+p>=6||j+q>=9||table[i+p][j+q]==1) ok = 0;
              }    
            }
          }  
          if(ok==1){
            Sx = cx;
            Sy = cy;
            vis[puzz] = 1;
            break;
          }
        }
      }
    }
    if(Sx==px) vis[puzz] = 0;
    posPurx[puzz] = Sx;
    posPury[puzz] = Sy;
  }
}
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    if(!vis[puzz]){
      purzle[puzz][0] = (purzle[puzz][0]+1)%(purzle[puzz].length);
      if(purzle[puzz][0] == 0){
         purzle[puzz][0] = 1;
      }
    }else{
      if(move==1){
        purzle[puzz][0] = (purzle[puzz][0]+1)%(purzle[puzz].length);
        if(purzle[puzz][0] == 0){
           purzle[puzz][0] = 1;
        }
      }
    }
  }
}
function check(){
  let winorlose = 1;
  for(let i=0;i<6;i++){
    let cnt = 0;
    for(let j=0;j<9;j++){
      if(j==0){
        if(table[i][j]==1){
          cnt = 1;
        }
      }else{
        if(table[i][j]==1){
          cnt++; 
        }else{
          if(cnt>0){
            CnumX[i].push(cnt);
          }
          cnt = 0;
        }
      }
    }
  }
  for(let j=0;j<9;j++){
    let cnt = 0;
    for(let i=0;i<6;i++){
      if(i==0){
        if(table[i][j]==1){
          cnt = 1;
        }
      }else{
        if(table[i][j]==1){
          cnt++; 
        }else{
          if(cnt>0){
            CnumY[j].push(cnt);
          }
          cnt = 0;
        }
      }
    }
  }
  for(let i=0;i<6;i++){
    if(winorlose==0) continue;
    if(numX[i].length!=CnumX[i].length){
      winorlose = 0;
      continue;
    }
    for(let j=0;j<numX.length;j++){
      if(numX[i][j]!=CnumX[i][j]) winorlose = 0;
    }
  }
  for(let j=0;j<9;j++){
    if(winorlose==0) continue;
    if(numY[j].length!=CnumY[j].length){
      winorlose = 0;
      continue;
    }
    for(let i=0;i<numY[j].length;i++){
      if(numY[j][i]!=CnumY[j][i]) winorlose = 0;
    }
  }
  if(winorlose==1) WIN = 1;
  else WIN = 2;
  screen = 4;
}
function display(){
  fill('black');
  rect(5, 18, 76, 30, 20);
  textSize(20);
  textAlign(LEFT);
  fill('white');
  text("Submit",10,35);
  textSize(20);
  fill('black');
  for(let i=0;i<6;i++){
    for(let k=numX[i].length-1;k>=0;k--){
      textAlign(CENTER);
      text(numX[i][k],x+i*35+17,y-10-(numX[i].length-k-1)*25);
    }
  }
  for(let j=0;j<9;j++){
    for(let k=numY[j].length-1;k>=0;k--){
      textAlign(CENTER);
      text(numY[j][k],x-12-(numY[j].length-k-1)*25,y+j*35+17,5);
    }
  }
  for(let i=0;i<6;i++){
    for(let j=0;j<9;j++){
      fill('white');
      square(x+i*35,y+j*35,35);
    }
  }
  for(let k=0;k<purzle.length;k++){
      for(let i=0;i<purzle[k][purzle[k][0]].length;i++) {
        for(let j=0;j<purzle[k][purzle[k][0]][i].length;j++) {
          col(k);
          if(k!=puzz&&!vis[k]){
            if(purzle[k][purzle[k][0]][i][j]==1) {
              square(px+i*20,py+j*20+k*80,20);
            }
          }else{
            if(move==1&&k==puzz){
              if(purzle[k][purzle[k][0]][i][j]==1) {
                square(mouseX+i*35,mouseY+j*35,35);
              }
            }else{
              if(purzle[k][purzle[k][0]][i][j]==1) {
                if(vis[k]==1){
                  square(posPurx[k]+i*35,posPury[k]+j*35,35);
                  let I = int((posPurx[k]+i*35-x)/35);
                  let J = int((posPury[k]+j*35-y)/35);
                  if(I<6&&J<9) table[I][J] = 1;
                }else{
                  square(posPurx[k]+i*20,posPury[k]+j*20,20);
                }
              }
            }
          }
        }
    }
    
  }
}
function Play(){
  background("black");
  textAlign(LEFT);
  textSize(17);
  fill('brown');
  text("Game dễ hay khó là tùy thuộc vào sự may mắn của bạn!",30,30);
  fill("green");
  textAlign(CENTER, CENTER);
  textSize(80);
  text("play", 250, 225);
  fill("red");
  textSize(60);
  text("rule", 250, 325);
}
function win(){
  background("black");
  t = Frame / 60;
  Frame++;
  fill("white");
  for (let i = 0; i < random(5); i++) {
      SnowRain.push(new Snow());
  }
  for (let x of SnowRain) {
       x.update(t);
       x.display();
  }
  fill("green");
  textAlign(CENTER, CENTER);
  textSize(75);
  text("Accepted", 250, 225);
  fill("blue");
  textSize(40);
  text("Replay", 250, 300);
}
function Snow() {
    this.X = 0;
    this.Y = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(3, 10);
    this.r = sqrt(random((width / 2) * (width / 2)));
    this.update = function(time) {
        let w = 0.5;
        let angle = w * time + this.initialangle;
        this.X = width / 2 + this.r * sin(angle);
        this.Y += pow(this.size, 0.5);
        if (this.Y > height) {
            let index = SnowRain.indexOf(this);
            SnowRain.splice(index, 1);
        }
    };
    this.display = function() {
        ellipse(this.X, this.Y, this.size);
    };
}
function lose(){
  background("black");
  fill("red");
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Wrong Answer", 250, 220);
  textAlign(LEFT);
  textSize(30);
  fill('blue');
  text("View Result", 300, 400);
  text("Replay", 10, 400);
}
function rule() {
  background("black");
  fill("white");
  textAlign(LEFT);
  textSize(20);
  text("Nhiệm vụ của bạn là sắp xếp các mảnh ghép\nvào một bảng cho trước (bằng cách click chuột\nvào mảng ghép để chọn và click vào vị trí thích\nhợp trên bảng. Các mảnh ghép có thể xoay lật\nhoặc úp bằng mũi tên đi xuống trên bàn phím\nnhưng không được phép đè lên nhau. Các số\nbên ngoài khung cho biết số ô đen (màu) trong \ncác dãy ô đen (màu) kế tiếp nhau", 40, 120);
  fill("blue");
  textSize(50);
  text("Example",250,300);
  fill("purple");
  textSize(30);
  text("back",30,400);
}
function example(){
  image(img, 60 , 0);
  fill("purple");
  textSize(30);
  text("back",30,400);
}
function draw() {
  background(220);
  if(screen==1){
    Play();
  }else if(screen==2){
    if(COUNT==0){
      makeRandom();
      calculateRandom(); 
    }else display();
    COUNT++;
  }else if(screen==3){
    answer();
  }else if(screen==4){
    if(WIN==1) win();
    if(WIN==2) lose();
  }else if(screen==5){
    rule();
  }else if(screen==6){
    example();
  }
}