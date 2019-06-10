let size1, size2

let check=[]

let fill_color = new Array(20)
for (let i = 0; i < 20; i++) {
    fill_color[i] = new Array(20)
}

let colour = ["blue", "yellow", "red", "green"]
function setup() {
    createCanvas(600, 600)
    ran()
    for (let i = 0; i < size1; i++) {
        for (let j = 0; j < size2; j++) {
            fill_color[i][j]=random(colour);
            if(a[i][j] == 0) fill_color[i][j]=random(colour);
            else {
                if (i == 0 && j == 0) next_color = prev_color = random(colour)
                else {
                    while (next_color == prev_color) {
                        next_color = random(colour)
                    }
                }
                prev_color = next_color
                fill_color[i][j]=next_color
            }
        }
    }
    check.push([0, 0])
    frameRate(60);
}


let X = 0, Y = 0, last_direction
let arr = new Array(20)

for (let i = 0; i < 20; i++) {
    arr[i] = new Array(20)
    for (let j = 0; j < 20; j++) {
        arr[i][j] = 0
    }
}


let flag = true

function mouseClicked() {
  let lastX = check[check.length-1][0], lastY = check[check.length-1][1]
  let lastplace = check.length-1
  if (mouseX >= 100 && mouseY >= 100 && mouseX < 100+size1*30 && mouseY < 100+size2*30) {
    X = int((mouseX - 100) / 30);
    Y = int((mouseY - 100) / 30);
  }
  while(
    if(lastX<X&&lastY==Y) {
        for(let i=lastX+1;i<=X;i++) {
            arr[i][Y]=1;
            check.push([i,Y])
            last_direction='right'
        }
    }
    else if(lastX>X&&lastY==Y) {
        for(let i=lastX-1;i>=X;i--) {
            arr[i][Y]=1;
            check.push([i,Y])
            last_direction='left'
        }
    }
    else if(lastY<Y&&lastX==X) {
        for(let j=lastY+1;j<=Y;j++) {
            arr[X][j]=1;
            check.push([X,j])
            last_direction='down'
        }
    }
    else if(lastY>Y&&lastX==X) {
        for(let j=lastY-1;j>=Y;j--) {
            arr[X][j]=1;
            check.push([X,j])
            last_direction='up'
        }
    }
  }
  else{
     if(lastX<X&&lastY==Y) {
        for(let i=lastX+1;i<X;i++)
            arr[i][Y]=0;
    }
    else if(lastX>X&&lastY==Y) {
        for(let i=lastX-1;i>X;i--)
            arr[i][Y]=0;
    }
    else if(lastY<Y&&lastX==X) {
        for(let j=lastY+1;j<Y;j++)
            arr[X][j]=0;
    }
    else if(lastY>Y&&lastX==X) {
        for(let j=lastY-1;j>Y;j--)
            arr[X][j]=0;
    }
  }
    for(let i=lastplace+1;i<check.length;i++){
        if(fill_color[check[i][0]][check[i][1]]==fill_color[check[i-1][0]][check[i-1][1]]){
            textSize(20)
            text("invalid move",200,50) 
          while(check[lastplace][0]!==lastX||check[lastplace][1]!==lastY){
            arr[check[lastplace][0]][check[lastplace][1]] = 0
            check.pop()
            lastplace--;
          }
          return
        }
    }
}

let a = new Array(20)
for (let i = 0; i < 20; i++) {
    a[i] = new Array(20)
    for (let j = 0; j < 20; j++) {
        a[i][j] = 0
    }
}

function ran() {
    size1 = int(random(11, 12))
    size2 = int(random(11, 12))
    let x, y, z, t, u, v
    x = int(random(3, 5))
    y = int(random(3, 5))
    z = int(random(x + 1, 9))
    t = int(random(y + 1, 9))
    u = int(random(z + 1, size1))
    v = int(random(t + 1, size2))
    for (let i = 0; i < x; i++) a[i][0] = 1
    for (let j = 0; j < y; j++) a[x - 1][j] = 1
    for (let i = x; i < z; i++) a[i][y - 1] = 1
    for (let j = y; j < t; j++) a[z - 1][j] = 1
    for (let i = z; i < u; i++) a[i][t - 1] = 1
    for (let j = t; j < v; j++) a[u - 1][j] = 1
    for (let i = u; i < size1; i++) a[i][v - 1] = 1
    for (let j = v; j < size2; j++) a[size1 - 1][j] = 1
}

arr[0][0]=1;

let prev_color, next_color


function draw() {
    background(220)
    for (let i = 0; i < size1; i++) {
        for (let j = 0; j < size2; j++) {
            fill(fill_color[i][j])
            square(100+i*30, 100+j*30, 30)
        }
    }
  push()
    for (let i=0;i<size1;i++){
        for(let j=0;j<size2;j++){
          if (arr[i][j]==1) {
          strokeWeight(3);
          stroke('white');
            noFill()
            square(100+i*30,100+j*30,30)
        } else {
          strokeWeight(1);
          stroke('#000000');
          noFill()
          square(100+i*30,100+j*30,30)
        }
      }
    }
  pop()
    textSize(20);
    text("time: "+int(frameCount/60)+"s",100,50)
    if(arr[size1-1][size2-1]==1) {
        noLoop();
        textSize(50);
        text("congrats",200,200)
    }
    if(int(frameCount/60)==10000){
        noLoop()
        textSize(30)
        text("u have failed",100,300)
    }
    textSize(20)
    fill(random(255),random(255),random(255))
    text("start\nhere",10,110)
    line(60,115,90,115)
    line(75,110,90,115)
    line(75,120,90,115)
    text("finish\nhere",110+size1*30,120+size2*30)
    line(85+size1*30,140+size2*30,85+size1*30,110+size2*30)
    line(80+size1*30,125+size2*30,85+size1*30,110+size2*30)
    line(90+size1*30,125+size2*30,85+size1*30,110+size2*30)
}
