let size1, size2

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
    frameRate(10);
}


let X = 0, Y = 0, last_direction
let arr = new Array(20)

for (let i = 0; i < 20; i++) {
    arr[i] = new Array(20)
    for (let j = 0; j < 20; j++) {
        arr[i][j] = 0
    }
}

let count=0, time=0;

function keypressed(){
        if(keyCode==87&&Y>0) {
          if(last_direction=='down') arr[X][Y]=0;
          Y--;
          arr[X][Y]=1;
          last_direction='up'
        }
        if(keyCode==83&&Y<size2) {
          if(last_direction=='up') arr[X][Y]=0;
             Y++;
            arr[X][Y]=1;
          last_direction='down';
        }
        if(keyCode==65&&X>0) {
          if(last_direction=='right') arr[X][Y]=0;
            X--;
            arr[X][Y]=1;
          last_direction='left';
        }
        if(keyCode==68&&X<size1) {
          if(last_direction=='left') arr[X][Y]=0;
            X++;
          arr[X][Y]=1;
          last_direction='right';
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
    size1 = int(random(10, 14))
    size2 = int(random(10, 14))
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
    for (let i=0;i<size1;i++){
        for(let j=0;j<size2;j++){
          if (i == X && j == Y&&arr[X][Y]==1) {
          strokeWeight(4);
          stroke('white');
        } else {
          strokeWeight(1);
          stroke('#000000');
        }
      }
        }
    textSize(20);
    text("time: "+frameCount+"s",100,50)
}
