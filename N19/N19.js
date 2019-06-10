var col = [
    // button exterior's color
    [],
    [],
    [],
    [],
    []
];
var big = 1; //
var start = 0; // 0: menu, 1: play screen, 2: rules, 3: settings
var StartTime = 20; // starting time
var SnowRain = [];
var col2 = [
    // button interior's color
    [],
    [],
    [],
    [],
    []
];
var val = [[], [], [], [], []];
var Click = [[], [], [], [], []];
let co;
var x = 60,
    y = 60;
var a = 3,
    b = 5;
var it;
var Frame = 0;
var chose = [0, "red", "green", "orange", "blue"];
var COUNT = 0;
var element = 0;
var WIN = 0;

function setup() {
    createCanvas(400, 400);
    noStroke();
    frameRate(60);
}

function reset() {
    start = 0;
    WIN = 0;
    element = 0;
    Frame = 0;
    COUNT = 0;
    SnowRain = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            Click[i][j] = false;
        }
    }
}

function paint(co) {
    // fill corresponding color
    if (co == 0) fill("black");
    if (co == 1) fill("red");
    if (co == 2) fill("green");
    if (co == 3) fill("orange");
    if (co == 4) fill("blue");
}

function Table() {
    let cnt = 10;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            while (true) {
                it = int(random(5));
                if (it == 5) it--;
                if (it == 0 && cnt == 0) continue;
                if (it == 0) cnt--;
                break;
            }
            co = it;
            paint(co);
            circle(x * (i + 1) + 20, y * (j + 1) + 25, 50);
            col[i][j] = it;
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            while (true) {
                it = int(random(4));
                if (it == 4) it--;
                if (it == col[i][j]) continue;
                if (it == 0) continue;
                break;
            }
            co = it;
            paint(co);
            circle(x * (i + 1) + 20, y * (j + 1) + 25, 30);
            col2[i][j] = it;
        }
    }
    let vis = []; // is a number used?
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            val[i][j] = int(random(100));
            while (vis[val[i][j]]) val[i][j] = int(random(100));
            vis[val[i][j]] = true;
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            textAlign(CENTER, CENTER);
            textSize(20);
            if (col2[i][j] < 2) {
                fill("white");
            } else {
                fill("black");
            }
            text(val[i][j], x * (i + 1) + 20, y * (j + 1) + 25);
        }
    }
}

function back() {
    fill("purple");
    textAlign(LEFT);
    textSize(30);
    text("Back", 10, 380);
}

function display() {
    back();
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            it = col[i][j];
            co = it;
            paint(co);
            if (Click[i][j]) circle(x * (i + 1) + 20, y * (j + 1) + 25, 60);
            else circle(x * (i + 1) + 20, y * (j + 1) + 25, 50);
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            co = col2[i][j];
            paint(co);
            if (Click[i][j]) circle(x * (i + 1) + 20, y * (j + 1) + 25, 40);
            else circle(x * (i + 1) + 20, y * (j + 1) + 25, 30);
        }
    }
    let pos = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            textAlign(CENTER, CENTER);
            if (!Click[i][j]) textSize(20);
            else textSize(30);
            fill("black");
            text(val[i][j], x * (i + 1) + 20, y * (j + 1) + 25);
        }
    }
}

function mouseClicked() {
    let ux = mouseX;
    let uy = mouseY;
    // skip current game
    if (WIN == 0 && ux >= 10 && ux <= 80 & uy <= 390 && uy >= 360) {
        // back button
        reset();
        return;
    }
    if (WIN > 0) {
        if (ux >= 100 && ux <= 300 && uy <= 320 && uy >= 280) {
            reset();
            return;
        }
    }
    if (start == 0) {
        // menu
        if (ux >= 125 && ux <= 275 && uy <= 200 && uy >= 160) {
            // play
            start = 1;
        }
        if (ux >= 150 && ux <= 220 && uy <= 275 && uy >= 225) {
            // rule
            start = 2;
        }
        if (ux >= 120 && ux <= 270 && uy <= 350 && uy >= 300) {
            // setting
            start = 3;
        }
        return;
    }
    if (start == 3) {
        // setting
        if (ux >= 125 && ux <= 275 && uy <= 100 && uy >= 50) {
            // very hard
            StartTime = 5;
        } else if (ux >= 150 && ux <= 220 && uy <= 150 && uy >= 100) {
            // hard
            StartTime = 10;
        } else if (ux >= 130 && ux <= 260 && uy <= 200 && uy >= 150) {
            // normal
            StartTime = 15;
        } else if (ux >= 150 && ux <= 220 && uy <= 250 && uy >= 200) {
            // easy
            StartTime = 20;
        } else {
            return;
        }
        start = 0;
        return;
    }
    if (start == 2) {
        // rule
        if (ux >= 10 && ux <= 100 && uy <= 370 && uy >= 340) {
            // back button
            start = 0;
            return;
        }
      if (ux >= 50 && ux <= 100 && uy <= 120 && uy >= 100) {
            // back button
            a = 3;
            b = 5;
            start = 0;
            return;
        }
      if (ux >= 250 && ux <= 350 && uy <= 120 && uy >= 100) {
            // back button
            a = 4;
            b = 7;
            start = 0;
            return;
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let cx = x * (i + 1) + 20;
            let cy = y * (j + 1) + 25;
            if (sqrt(pow(ux - cx, 2) + pow(uy - cy, 2)) > 30) continue;
            if (!Click[i][j]) {
                Click[i][j] = 1;
                element++;
                if (element == 6) {
                    element--;
                    Click[i][j] = 0;
                }
            } else (Click[i][j] = 0), element--;
        }
    }
    if (element == 5) {
        if (check()) {
            WIN = 1;
        } else WIN = 2;
    }
}

function check() {
    let tmp = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (Click[i][j]) {
                if (col[i][j] == 0) continue;
                if (val[i][j] % a == 0) continue;
                if (val[i][j] % b == 0) continue;
                tmp++;
            }
        }
    }
    if (tmp < 5) return false;
    else return true;
}

function replay() {
    fill("blue");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("Play again?", 200, 300);
}

function win() {
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
    text("Accepted", 200, 200);
}

function lose() {
    background("black");
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Wrong Answer", 200, 200);
    ahihi = 1;
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

function TLE() {
    background("black");
    fill("orange");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("Time Limit Exceeded", 200, 200);
    ahihi = 0;
}

function rule() {
    background("black");
    fill("white");
    textSize(20);
    text("Choose 5 signs which don't have a black ", 10, 30);
    text("border and the number inside isn't divisible", 10, 50);
    text("by ", 10, 70);
    textAlign(CENTER);
    textSize(50);
    fill("blue");
    text("ez game!", 200, 200);
    fill("purple");
    textAlign(LEFT);
    textSize(30);
    text("Back", 10, 370);
    fill("brown");
    text("3 or 5",50, 120);
    fill("pink");
    text("4 or 7", 250, 120);
}

function setting() {
    background("black");
    fill("red");
    textSize(30);
    textAlign(CENTER);
    text("VERY HARD", 200, 100);
    fill("green");
    text("HARD", 200, 150);
    fill("orange");
    text("NORMAL", 200, 200);
    fill("blue");
    text("EASY", 200, 250);
}

function draw() {
    if (start == 0) {
        background("black");
        fill("yellow");
        circle(60, 60, 60);
        fill("green");
        textAlign(CENTER, BASELINE);
        if (big == 1) textSize(75);
        else textSize(80);
        text("play", 200, 200);
        textSize(50);
        fill("red");
        text("rule", 200, 275);
        fill("blue");
        text("setting", 200, 350);
    } else if (start == 1) {
        background(220);
        let timepassed = int(COUNT / 60);
        textSize(20);
        text("TimeLeft : ", 300, 20);
        text(StartTime - timepassed, 360, 20);
        if (COUNT == 0) {
            Table();
        } else {
            if (StartTime - timepassed <= 0 && WIN == 0) WIN = 3;
            if (WIN == 0) display();
            else if (WIN == 1) win();
            else if (WIN == 2) lose();
            else if (WIN == 3) TLE();
            if (WIN > 0) replay();
        }
        COUNT++;
    } else if (start == 3) {
        setting();
    } else {
        rule();
    }
}
