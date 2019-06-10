// Root variables
let size
let state = 0
let display_num, display_shp
// Checker
let wrong_position
let wrong_position_reason = ""
let checker_numbers
let game_over
let win_position
let check_win_pairing
// Timing
let timer
let frameCount_store = 0
// Stores the inputs from the user
let input_num, input_shp
let input_x, input_y
// Generator
let ind = [], arr

// Function shapeAt(x, y, idx)
// Draw a square with index idx at position (x, y)
// We support 12 different colors, which means 3, 5, 7, 9, 11 are supported
function shapeAt(x, y, idx) {
    push()
    strokeWeight(3)
    noFill()
    if (idx === 0) stroke(255, 0, 0)
    else if (idx === 1) stroke(255, 255, 0)
    else if (idx === 2) stroke(0, 255, 0)
    else if (idx === 3) stroke(0, 255, 255)
    else if (idx === 4) stroke(0, 0, 255)
    else if (idx === 5) stroke(255, 0, 255)
    else if (idx === 6) stroke(255, 165, 0)
    else if (idx === 7) stroke(165, 255, 0)
    else if (idx === 8) stroke(255, 0, 165)
    else if (idx === 9) stroke(165, 0, 255)
    else if (idx === 10) stroke(0, 255, 165)
    else if (idx === 11) stroke(0, 165, 255)
    else noStroke()
    square(x*50 + 9, y*50 + 9, 32)
    pop()
}

// Function generate(void)
// This function starts a new game
function generate() {
    // Initializing everything
    ind.length = 0
    display_num = new Array(size)
    display_shp = new Array(size)
    input_num = new Array(size)
    input_shp = new Array(size)
    checker_numbers = new Array(size)
    check_win_pairing = new Array(size)
    for (let i = 0; i < size; i++) {
        ind.push(i)
        display_num[i] = new Array(size)
        display_shp[i] = new Array(size)
        check_win_pairing[i] = new Array(size) // check_win_pairing[number][color]
        input_num[i] = new Array(size)
        input_shp[i] = new Array(size)
        for (let j = 0; j < size; j++) {
            display_num[i][j] = false
            display_shp[i][j] = false
            input_num[i][j] = ""
            input_shp[i][j] = -1
        }
    }
    timer = 0
    input_x = 0
    input_y = 0
    wrong_position = false
    wrong_position_reason = ""
    win_position = false
    game_over = false
    // Sudoku array generator
    // arr[i][j][0]: the first sudoku at position (i, j) (number)
    // arr[i][j][1]: the second sudoku at position (i, j) (colored square)
    arr = new Array(size)
    for (let i = 0; i < size; i++) {
        arr[i] = new Array(size)
        for (let j = 0; j < size; j++) {
            arr[i][j] = new Array(2)
            arr[i][j] = [(i + j) % size, (2*i + j) % size]
        }
    }
    for (let i = 0; i < size; i++) {
        let a, b
        while (a === b) {
            a = random(ind)
            b = random(ind)
        }
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }
    for (let i = 0; i < size; i++) {
        let a, b
        while (a === b) {
            a = random(ind)
            b = random(ind)
        }
        for (let j = 0; j < size; j++)
            [arr[j][a], arr[j][b]] = [arr[j][b], arr[j][a]];
    }
    // Pick some random positions to put a number
    for (let i = 0; i < size*size/5; i++) {
        let a, b
        a = random(ind)
        b = random(ind)
        while (display_num[a][b]) {
            a = random(ind)
            b = random(ind)
        }
        display_num[a][b] = true
        input_num[a][b] = str(arr[a][b][0])
    }
    // Pick some random positions to put a square
    for (let i = 0; i < size*size*7/25; i++) {
        let a, b
        a = random(ind)
        b = random(ind)
        while (display_shp[a][b]) {
            a = random(ind)
            b = random(ind)
        }
        display_shp[a][b] = true
        input_shp[a][b] = arr[a][b][1]
    }
}

// Function setup(void)
function setup() {
    createCanvas(570, 650)
    frameRate(60)
}

/*
// Function draw(void) (deleted)
// This function add a grid of sudoku for checking purposes only
function draw() {
    background(255)
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            text(arr[i][j][0] + " " + arr[i][j][1], i*50 + 25, j*50 + 25)
        }
    }
}*/

// Function draw(void)
// Main function
function draw() {
    background("#3E3D32")
    // state = 0 is the "Select Level" scene
    if (state === 0) {
        push()
        fill("#E6DB74")
        textAlign(LEFT, CENTER)
        textSize(30)
        text("CHÀO MỪNG TỚI Mô HìNh KhỦnG!", 10, 50)
        textSize(18)
        fill("#A6E22E")
        text(`
Nhóm 8: Vũ Văn Dũng, Nguyễn Viết Chí Quân và 
Trần Phạm Lâm Khánh`, 10, 85)
        textSize(14)
        fill("#F8F8F2")
        text("- Nhấn ENTER để tiếp tục -", 10, 150)
        fill("#75715E")
        textSize(12)
        text("Gam màu được lấy ý tưởng từ Monokai Theme", 10, 200)
        pop()
    }
    if (state === 1) {
        push()
        fill("#E6DB74")
        textAlign(LEFT, CENTER)
        textSize(30)
        text("Hướng dẫn chơi", 10, 50)
        textAlign(LEFT, TOP)
        textSize(14)
        fill("#F8F8F2")
        text(`
Bạn sẽ được cho một bảng n x n, với n lẻ. Bạn phải phủ kín tất cả các ô của bảng,
mỗi ô một số và một màu, trong một khoảng thời gian giới hạn. Để thắng, bạn cần
đảm bảo các yếu tố sau:

 - Tất cả các số tạo thành một bảng sudoku, tức là không có hai số nào cùng chung
một hàng hoặc một cột.
 - Tất cả các màu cũng tạo thành một bảng sudoku
 - Tất cả các ô phải khác nhau. Nói cách khác, bạn không được để tồn tại hai ô có
cùng màu và cùng số.

Giống như trong sudoku, bạn chỉ được dùng n số, từ 0 đến n − 1, và n màu.

Để nhập một số vào một ô, bạn click vào ô đó và dùng các phím số để nhập như bình
thường.

Để nhập một màu vào một ô, bạn dùng các phím a, b, ... Phím a cho màu đầu tiên, 
b cho màu thứ hai, và cứ như vậy. Sau khi nhập một màu, sẽ có một hình vuông có 
màu ở ô đó. Màu của hình vuông này chính là màu mà bạn đã nhập.

Nếu bạn muốn xóa một ô đã nhập để nhập lại, bạn có thể dùng phím BACKSPACE. 
Chú ý rằng nó sẽ xóa cả màu và số trong ô đó (đương nhiên trừ những thành phần 
được cho trước).

Nếu vì một lý do nào đó như thế quá khó hay sắp hết thời gian v.v... bạn có thể
nhấn ENTER để chơi lại. Nếu bạn muốn chuyển độ khó, bạn nhấn phím R.

Thông thường, có rất nhiều lời giải cho cùng một thế game, và dĩ nhiên bất kỳ
lời giải nào thỏa mãn các điều kiện sẽ đều được chấp nhận.

Bạn đã sẵn sàng? Hãy cùng bắt đầu thôi!

- Nhấn ENTER để tiếp tục -`, 10, 75)
        pop()
    }
    if (state === 2) {
        push()
        noStroke()
        fill("#272822")
        for (let i = 0; i < 5; i++) 
            rect(10, i*70 + 100, 400, 70)
        if (mouseX >= 10 && mouseX <= 410 && mouseY >= 100 && mouseY <= 450) {
            push()
            noStroke()
            fill("#3E3D32")
            rect(10, int((mouseY - 100)/70)*70 + 100, 400, 70)
            pop()
        }
        stroke("#F92672")
        strokeWeight(3)
        noFill()
        for (let i = 0; i < 5; i++) 
            rect(10, i*70 + 100, 400, 70)
        noStroke()
        fill("#E6DB74")
        textSize(30)
        textAlign(LEFT, CENTER)
        text("Chọn độ khó", 10, 50)
        textSize(20)
        text("Dễ", 35, 135)
        text("Trung bình", 35, 205)
        text("Khó", 35, 275)
        text("Rất khó", 35, 345)
        text("Bất khả thi", 35, 415)
        fill("#F8F8F2")
        textSize(15)
        textAlign(RIGHT, CENTER)
        text("Kích thước: 3 × 3\nThời gian: 90s", 385, 135)
        text("Kích thước: 5 × 5\nThời gian: 250s", 385, 205)
        text("Kích thước: 7 × 7\nThời gian: 490s", 385, 275)
        text("Kích thước: 9 × 9\nThời gian: 810s", 385, 345)
        text("Kích thước: 11 × 11\nThời gian: 1210s", 385, 415)
        pop()
    }
    if (state === 3) {
        // Normal game
        if (!game_over)
            if ((frameCount - frameCount_store) % 60 === 0) timer++
        if (timer >= 10 * size * size) game_over = true
        // Text
        push()
        noStroke()
        fill("#272822")
        square(input_x*50 + 10, input_y*50 + 10, 50)
        pop()
        if (mouseX >= 10 && mouseY >= 10 && mouseX < size*50 + 10 && mouseY < size*50 + 10) { 
            push()
            stroke("#CFCFC2")
            square(int((mouseX - 10)/50)*50 + 10, int((mouseY - 10)/50)*50 + 10, 50)
            pop()
        }
        translate(10, 10)
        for (let i = 0; i <= size; i++) {
            push()
            strokeWeight(1)
            stroke("#75715E")
            line(i*50, 0, i*50, size*50)
            line(0, i*50, size*50, i*50)
            pop()
        }
        checker()
        textAlign(LEFT, CENTER)
        textSize(20)
        if (wrong_position) {
            push()
            fill("#F92672")
            text("Thế trận đang sai. Bạn cần phải sửa lỗi sau:", 0, size*50 + 25)
            text(wrong_position_reason, 0, size*50 + 50)
            pop()
        } else {
            push()
            fill("#A6E22E")
            text("Thế trận đang đúng. Hãy tiếp tục. Cố lên!", 0, size*50 + 25)
            pop()
        }
        push()
        fill("#66D9EF")
        text("Thời gian: " + timer + "s/" + 10*size*size + "s", 0, size*50 + 75)
        pop()
        // Given numbers and inserted numbers are shown here
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (display_shp[i][j]) {
                    noFill()
                    shapeAt(i, j, arr[i][j][1])
                }
                push()
                fill("#F8F8F2")
                textAlign(CENTER, CENTER)
                textSize(20)
                if (display_num[i][j]) 
                    text(arr[i][j][0], i*50 + 25, j*50 + 25)
                else {
                    fill("#E6DB74")
                    text(input_num[i][j], i*50 + 25, j*50 + 25)
                }
                pop()
                shapeAt(i, j , input_shp[i][j])
            }
        }
        // If the player wins, let's end the game
        checkWinPosition()
        if (win_position) game_over = true
        // End the game...
        if (game_over) gameOver()
    }
}

// Function keyPressed(void)
// Inputting
function keyPressed() {
    if (state === 0 || state === 1) {
        if (keyCode === 13) state++
        return // avoid unexpected errors
    }
    if (state === 2) return
    // Input color by using letters
    if (65 <= keyCode && keyCode <= 76) {
        if (!display_shp[input_x][input_y] && keyCode - 65 < size)
            input_shp[input_x][input_y] = keyCode - 65
    }
    // Input numbers by, well, numbers
    if ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) {
        if (!display_num[input_x][input_y])
            input_num[input_x][input_y] = input_num[input_x][input_y] + str(key)
    }
    // BACKSPACE key: erase the last digit from the number
    if (keyCode === 8) {
        if (!display_num[input_x][input_y])
            input_num[input_x][input_y] = ""
        if (!display_shp[input_x][input_y])
            input_shp[input_x][input_y] = -1
    }
    // ENTER key: start a new game and a new timer
    if (keyCode === 13) {
        frameCount_store = frameCount
        generate()
    }
    // R key: go back to Select Level
    if (keyCode === 82) {
        state = 2
        return
    }
    // Arrow keys: change input cell
    if (keyCode === RIGHT_ARROW) {
        input_x++
        if (input_x === size) input_x = 0
    }
    if (keyCode === LEFT_ARROW) {
        input_x--
        if (input_x < 0) input_x = size - 1
    }
    if (keyCode === DOWN_ARROW) {
        input_y++
        if (input_y === size) input_y = 0
    }
    if (keyCode === UP_ARROW) {
        input_y--
        if (input_y < 0) input_y = size - 1
    }
}

// Function mouseClicked(void)
// Inputting
function mouseClicked() {
    // Input when state = 0 is different
    if (state === 2) {
        if (mouseX >= 10 && mouseX <= 410 && mouseY >= 100 && mouseY <= 450) {
            push()
            noStroke()
            fill("#75715E")
            rect(10, int((mouseY - 100)/70)*70 + 100, 400, 70)
            pop()
            // The size is influenced by the mouse position: of course
            size = int((mouseY - 100)/70)*2 + 3
            state = 3
            generate()
            return
        }
    }
    // If state != 0: we click on the cells needed
    if (mouseX >= 10 && mouseY >= 10 && mouseX < size*50 + 10 && mouseY < size*50 + 10) {
        input_x = int((mouseX - 10)/50)
        input_y = int((mouseY - 10)/50)
    }
}

// Function checker(void)
// This check if the current position does not satisfy sudoku laws
function checker() {
    // Check if the numbers satisfy
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Cell (x, y) = (i, j)
            if (input_num[i][j] === "") continue
            if (int(input_num[i][j]) >= size || int(input_num[i][j]) < 0) {
                wrong_position = true
                wrong_position_reason = "Một số số không nằm trong khoảng từ 0 đến " + (size - 1)
                return
            }
            // Check row
            for (let k = 0; k < size; k++) {
                if (k === i) continue
                if (int(input_num[k][j]) === int(input_num[i][j])) {
                    wrong_position = true
                    wrong_position_reason = "Một số xuất hiện hai lần trong một hàng nào đó"
                    return
                }
            }
            // Check column
            for (let k = 0; k < size; k++) {
                if (k === j) continue
                if (int(input_num[i][k]) === int(input_num[i][j])) {
                    wrong_position = true
                    wrong_position_reason = "Một số xuất hiện hai lần trong một cột nào đó"
                    return
                }
            }
        }
    }
    // Check if the colors satisfy
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Cell (x, y) = (i, j)
            if (input_shp[i][j] < 0 || input_shp[i][j] >= size) continue
            // Check row
            for (let k = 0; k < size; k++) {
                if (k === i) continue
                if (input_shp[k][j] === input_shp[i][j]) {
                    wrong_position = true
                    wrong_position_reason = "Một màu xuất hiện hai lần trong một hàng nào đó"
                    return
                }
            }
            // Check column
            for (let k = 0; k < size; k++) {
                if (k === j) continue
                if (input_shp[i][k] === input_shp[i][j]) {
                    wrong_position = true
                    wrong_position_reason = "Một màu xuất hiện hai lần trong một cột nào đó"
                    return
                }
            }
        }
    }
    // Check the last condition
    for (let i = 0; i < size; i++) 
        for (let j = 0; j < size; j++) 
            check_win_pairing[i][j] = false
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (input_num[i][j] === "" || input_shp[i][j] < 0 || input_shp[i][j] >= size) {
                continue
            }
            if (check_win_pairing[int(input_num[i][j])][input_shp[i][j]]) {
                wrong_position = true
                wrong_position_reason = "Có hai ô có chung màu và số"
                return
            }
            else check_win_pairing[int(input_num[i][j])][input_shp[i][j]] = true
        }
    }
    // Okay, now everything is following the sudoku laws
    wrong_position = false
}

// Function checkWinPosition(void)
// Check if the player wins
function checkWinPosition() {
    // Of course if the position is wrong, the player can't win
    if (wrong_position) {
        win_position = false
        return
    }
    // If the cells are not filled yet
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (input_num[i][j] === "" || input_shp[i][j] < 0 || input_shp[i][j] >= size) {
                win_position = false
                return
            }
        }
    }
    // Everything is now already checked
    win_position = true
}

// Function gameOver(void)
// End the game
// Actually here game over can means you win the game
function gameOver() {
    // If you win, congratulations!
    if (win_position) {
        push()
        fill("#3E3D32")
        noStroke()
        rect(-10, -10, 1000, 650)
        fill("#A6E22E")
        textAlign(LEFT, CENTER)
        textSize(30)
        text("CHÚC MỪNG!", 0, 50)
        textSize(18)
        text("Bạn đã thắng cuộc!\nThời gian: " + timer + " giây", 0, 100)
        textSize(14)
        fill("F8F8F2")
        text("- Nhấn ENTER để chơi thêm lần nữa, hoặc nhấn R để chuyển độ khó -", 0, 150)
        pop()
        return
    }
    // Otherwise, I'm sorry, you can not complete everything on time
    push()
    fill("#3E3D32")
    noStroke()
    rect(-10, -10, 1000, 650)
    fill("#F92672")
    textAlign(LEFT, CENTER)
    textSize(30)
    text("BẠN ĐÃ THUA...", 0, 50)
    textSize(18)
    text("Bạn đã không thể thắng cuộc trong thời gian quy định", 0, 100)
    textSize(14)
    fill("#F8F8F2")
    text("- Nhấn ENTER để thử lại, và chúc may mắn! -", 0, 150)
    pop()
}