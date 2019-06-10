let size1, size2
function setup() {
    createCanvas(600, 600)
}

let kc = 0
let color = ['blue', 'yellow', 'red', 'green']
let x = 10, y = 10
let a = new Array(x)
for (let i = 0; i < 20; i++) {
    a[i] = new Array(y)
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

let prev_color, next_color

function draw() {
    background(220)
    ran()
    for (let i = 0; i < size1; i++) {
        for (let j = 0; j < size2; j++) {
            fill(random(color))
            noLoop()
            if(a[i][j] == 0) circle(100 + i*30, 100 + j*30, 25)
            else {
                if (i == 0 && j == 0) next_color = prev_color = random(color)
                else {
                    while (next_color == prev_color) {
                        next_color = random(color)
                    }
                }
                prev_color = next_color
                fill(next_color)
                circle(100 + i*30, 100 + j*30, 25)
            }
        }
    }
}
