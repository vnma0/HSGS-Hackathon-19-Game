function drawboard(){ // Draw the current board
	if (gamestatus === 0){
		push();
		strokeWeight(2);
		if (mouseX >= 25 && mouseX <= 255 && mouseY >= 15 && mouseY <= 75){
			fill(230);
		}
		else{
			fill(255);
		}
		rect(25, 15, 230, 60);
		textAlign(LEFT, CENTER);
		textSize(40);
		fill(0);
		text("GAMEPLAY", 30, 45);
		pop();

		push();
		strokeWeight(2);
		if (mouseX >= 25 && mouseX <= 220 && mouseY >= 165 && mouseY <= 215){
			fill(230);
		}
		else{
			fill(255);
		}
		rect(25, 165, 185, 60);
		textAlign(LEFT, CENTER);
		textSize(40);
		fill(0);
		text("ANSWER", 30, 195);
		pop();
	}

	else{
		push();
		textSize(25);
		textStyle(ITALIC);
		text("Mọi việc bạn không làm được là do nhân phẩm của bạn và độ rác của waifu bạn - Nguyễn Đình Phúc", 850, 25, 170, 560);
		pop();
	}
	
	push();
	strokeWeight(2);
	if (mouseX >= 25 && mouseX <= 220 && mouseY >= 90 && mouseY <= 150){
		fill(230);
	}
	else{
		fill(255);
	}
	rect(25, 90, 195, 60);
	textAlign(LEFT, CENTER);
	textSize(40);
	fill(0);
	text("RESTART", 30, 120);
	pop();

	push();
	textAlign(RIGHT, CENTER);
	textSize(40);
	fill(0);
	text(("Number of pieces: " + cntpiece), 555, 45, 240);
	pop();

	push();
	strokeWeight(1);
	for (let i = 0; i < 10; i++){
		for (let j = 0; j < 10; j++){
			if (isboard[i][j] === 1){
				push();
				if (chosen[i][j] === 2) fill(0, 170, 0);
				if (chosen[i][j] === 1) fill(0, 255, 0);
				rect(25 + 75 * i, 25 + 75 * j, 75, 75);
				pop();
				textAlign(CENTER, CENTER);
				textSize(40);
				text(board[j][i], 25 + 75 * i + 5, 25 + 75 * j + 5, 75, 75); // + 5 to fix text's position
			}
		}
	}
	pop();

	push();
	strokeWeight(3);
	for (let i = 0; i < 10; i++){
		for (let j = 0; j < 11; j++){
			if (isBorderVertical[i][j] === 1 || (j > 0 && j < 10 && isboard[i][j] === 1 && isboard[i][j - 1] === 1 && connectedto[i][j] !== connectedto[i][j - 1])){
				line(25 + j * 75, 25 + i * 75, 25 + j * 75, 25 + (i + 1) * 75);
			}
		}
	}
	for (let i = 0; i < 11; i++){
		for (let j = 0; j < 10; j++){
			if (isBorderHorizontal[i][j] === 1 || (i > 0 && i < 10 && isboard[i][j] === 1 && isboard[i - 1][j] === 1 && connectedto[i][j] !== connectedto[i - 1][j])){
				line(25 + j * 75, 25 + i * 75, 25 + (j + 1) * 75, 25 + i * 75);
			}
		}
	}
	pop();

	push();
	for (let i = 0; i < 2; i++){
		for (let j = 0; j < 14; j++){
			let valuebox = i * 14 + j;
			if (usedpiece[valuebox] === true) continue;
			push();
			rect(825 + 100 * i, 15 + 55 * j, 100, 55);
			textAlign(CENTER, CENTER);
			textSize(30);
			text(checkpiece[valuebox][0] + " - " + checkpiece[valuebox][1], 825 + 100 * i + 2, 15 + 55 * j + 2, 100, 55); // + 2 to fix text's position
			pop();
		}
	}
	pop();
}

function begingame(){ // Menu
	push();
	strokeWeight(2);
	textSize(30);
	textAlign(CENTER, CENTER);
	if (mouseX >= 400 && mouseX <= 700 && mouseY >= 200 && mouseY <= 300){
		fill(230);
	}
	else{
		fill(255);
	}
	rect(400, 200, 300, 100);
	fill(0);
	text("NEW GAME", 400, 200, 300, 100);
	pop();

	push();
	strokeWeight(2);
	textSize(30);
	textAlign(CENTER, CENTER);
	if (mouseX >= 400 && mouseX <= 700 && mouseY >= 500 && mouseY <= 600){
		fill(230);
	}
	else{
		fill(255);
	}
	rect(400, 500, 300, 100);
	fill(0);
	text("GAMEPLAY", 400, 500, 300, 100);
	pop();
}

function wingame(){ // User win
	push();

	for (let i = 0; i < 10; i++){
		push();
		fill(255, rand(100, 135), 0);
		translate(random(width), random(height));
		rotate(random(2 * PI));
		textSize(50);
		text(":)", 0, 0);
		pop();
	}
	pop();

	push();
	fill(255, 210, 0);
	textSize(60);
	textStyle(BOLD);
	textAlign(CENTER, CENTER);
	text("YOU WIN!!", 0, 200, 1100, 100);
	pop();

	push();
	textSize(25);
	textAlign(CENTER);
	textStyle(ITALIC);
	text("Nếu AC thì là do độ khủng chứ nhân phẩm cái gì - Vũ Minh Điềm", 0, 350, 1100, 560);
	pop();

	push();
	strokeWeight(2);
	textSize(30);
	textAlign(CENTER, CENTER);
	if (mouseX >= 400 && mouseX <= 700 && mouseY >= 500 && mouseY <= 600){
		fill(230);
	}
	else{
		fill(255);
	}
	rect(400, 500, 300, 100);
	fill(0);
	text("RESTART", 400, 500, 300, 100);
	pop();
}

function showgameplay(){ // Display gameplay of the game
	push();
	textSize(30);
	textAlign(CENTER);
	text(`Bạn phải xếp 28 miếng domino vào trong một cái bảng.
	Mỗi miếng domino được đánh số như sau: [0 - 0], [0 - 1], [0 - 2], ..., [0 - 6], [1 - 1], [1 - 2], ..., [6 - 6];
	và chỉ được xếp vào bảng 1 lần duy nhất.
	Miếng domino phải được xếp khít lên 2 hình vuông, và giá trị của 2 ô vuông mà miếng domino nằm lên giống với giá trị của miếng domino.
	Miếng domino có thể xoay hoặc lật.
	Không miếng domino nào được phép nằm lên miếng khác (có thể nằm chung cạnh hoặc chung đỉnh).
	Để xép 1 miếng domino vào, ấn lần lượt 2 ô vuông cạnh nhau.
	Để bỏ đi 1 miếng domino đã xếp, ấn vào miếng domino đó.
	Những miếng domino chưa được xếp vào bảng được hiển thị ở bên phải.`, 130, 200, 880, 600);
	pop();

	push();
	textSize(50);
	textStyle(BOLD);
	textAlign(CENTER);
	text("GAMEPLAY", 0, 100, 1100, 100);
	pop();

	push();
	textSize(20);
	textAlign(CENTER, CENTER);
	rect(1060, 10, 25, 28);
	text("X", 1060, 10, 30, 30);
	pop();
}