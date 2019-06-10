function setup(){
	createCanvas(1100, 800);
	generateboard();
	frameRate(10);
}

// gamestatus: [-1 : Begin; 0 : In game; 1: Win; 2: Gameplay (From -1); 3 : Gameplay (From 0)]
function draw(){
	if (gamestatus === -1){
		background(139, 0, 0);
		begingame();
	}

	if (gamestatus === 0 || gamestatus === 4){
		background(100, 100, 200);
		drawboard();
	}

	if (gamestatus === 1){
		background(230, 190, 138);
		wingame();
	}

	if (gamestatus === 2 || gamestatus === 3){
		background(200);
		showgameplay();
	}

	if (cntpiece === 28){
		gamestatus = 1;
	}
	
}

function isvalid(){ // Check the validity of a domino with coordinate (clickx1, clicky1), (clickx2, clicky2);
	if (Math.abs(clickx1 - clickx2) !== 0 && Math.abs(clicky1 - clicky2) !== 0){
		alert("2 squares are not adjacent!");
		return false;
	}

	if (clickx1 === clickx2){
		if (Math.abs(clicky1 - clicky2) !== 1){
			alert("2 squares are not adjacent!");
			return false;
		}

		let cell1 = board[clicky1][clickx1], cell2 = board[clicky2][clickx2];
		if (cell1 > cell2){
			cell1 = cell1 + cell2;
			cell2 = cell1 - cell2;
			cell1 = cell1 - cell2;
		}

		for (let i = 0; i < 28; i++){
			if (checkpiece[i][0] === cell1 && checkpiece[i][1] === cell2){
				if (usedpiece[i] === true){   
					alert("This piece has been used before!");
					return false;
				}
				usedpiece[i] = true;
				return true;
			}
		}
	}

	else{
		if (Math.abs(clickx1 - clickx2) !== 1){
			alert("2 squares are not adjacent!");
			return false;
		}

		let cell1 = board[clicky1][clickx1], cell2 = board[clicky2][clickx2];
		if (cell1 > cell2){
			cell1 = cell1 + cell2;
			cell2 = cell1 - cell2;
			cell1 = cell1 - cell2;
		}

		for (let i = 0; i < 28; i++){
			if (checkpiece[i][0] === cell1 && checkpiece[i][1] === cell2){
				if (usedpiece[i] === true){
					alert("This piece has been used before!");
					return false;
				}
				usedpiece[i] = true;
				return true;
			}
		}
	}
}

// gamestatus: [-1 : Begin; 0 : In game; 1: Win; 2: Gameplay (From -1); 3 : Gameplay (From 0)]
function mouseClicked(){ // User interact
	if (gamestatus === -1){ // Menu
		if (mouseX >= 400 && mouseX <= 700 && mouseY >= 200 && mouseY <= 300){ // If user click "NEW GAME"
			gamestatus = 0;
		}
		else if (mouseX >= 400 && mouseX <= 700 && mouseY >= 500 && mouseY <= 600){ // If user click "GAMEPLAY"
			gamestatus = 2;
		}
		return;
	}

	if (gamestatus === 0){ // In game
		if (mouseX >= 25 && mouseX <= 255 && mouseY >= 15 && mouseY <= 75){ // If user click "GAMEPLAY"
			gamestatus = 3;
			return;
		}

		else if (mouseX >= 25 && mouseX <= 220 && mouseY >= 90 && mouseY <= 150){ // If user click "RESTART"
			generateboard();
			return;
		}

		else if (mouseX >= 25 && mouseX <= 220 && mouseY >= 165 && mouseY <= 215){ // If user click "ANSWER"
			cntpiece = 0;
			connectedto = arrayClone(answer);

			for (let i = 0; i < 10; i++){
				for (let j = 0; j < 10; j++){
					chosen[i][j] = 2;
				}
			}
			for (let i = 0; i < 28; i++){
				usedpiece[i] = true;
			}

			gamestatus = 4;
		}

		let i = (int)((mouseX - 25) / 75), j = (int)((mouseY - 25) / 75); // Relative id of mouseX and mouseY to the board
		if (i >= 10 || j >= 10 || i < 0 || j < 0) return;
		if (isboard[i][j] === 0) return;

		if (chosen[i][j] === 0){
			if (clickx1 === -1 && clicky1 === -1){
				clickx1 = i;
				clicky1 = j;
				chosen[i][j] = 1;
			}

			else{
				clickx2 = i;
				clicky2 = j;
				chosen[i][j] = 1;
				if (isvalid() === true){
					chosen[clickx1][clicky1] = 2;
					chosen[clickx2][clicky2] = 2;
					cntpiece++;
					idconnectedto++;
					connectedto[clicky1][clickx1] = idconnectedto;
					connectedto[clicky2][clickx2] = idconnectedto;
				}
				else{
					chosen[clickx1][clicky1] = 0;
					chosen[clickx2][clicky2] = 0;
				}
				clickx1 = -1;
				clicky1 = -1;
				clickx2 = -1;
				clicky2 = -1;
			}
		}

		else if (chosen[i][j] === 1){
			chosen[i][j] = 0;
			clickx1 = -1;
			clicky1 = -1;
		}

		else{
			if (clickx1 !== -1 && clicky1 !== -1){
				chosen[clickx1][clicky1] = 0;
				clickx1 = -1;
				clicky1 = -1;
			}

			cntpiece--;
			if (i > 0 && connectedto[j][i - 1] === connectedto[j][i]){
				connectedto[j][i - 1] = 0;
				connectedto[j][i] = 0;
				chosen[i - 1][j] = 0;
				chosen[i][j] = 0;
				let k = board[j][i - 1], l = board[j][i];
				if (k > l){
					k = k + l;
					l = k - l;
					k = k - l;
				}
				for (let idx = 0; idx < 28; idx++){
					if (checkpiece[idx][0] === k && checkpiece[idx][1] === l){
						usedpiece[idx] = 0;
						console.log(k + ' ' + l + ' ' + idx);
						break;
					}
				}
				return;
			}

			if (j > 0 && connectedto[j - 1][i] === connectedto[j][i]){
				connectedto[j - 1][i] = 0;
				connectedto[j][i] = 0;
				chosen[i][j - 1] = 0;
				chosen[i][j] = 0;
				let k = board[j - 1][i], l = board[j][i];
				if (k > l){
					k = k + l;
					l = k - l;
					k = k - l;
				}
				for (let idx = 0; idx < 28; idx++){
					if (checkpiece[idx][0] === k && checkpiece[idx][1] === l){
						usedpiece[idx] = 0;
						console.log(k + ' ' + l + ' ' + idx);
						break;
					}
				}
				return;
			}
			
			if (i < 9 && connectedto[j][i + 1] === connectedto[j][i]){
				connectedto[j][i + 1] = 0;
				connectedto[j][i] = 0;
				chosen[i + 1][j] = 0;
				chosen[i][j] = 0;
				let k = board[j][i + 1], l = board[j][i];
				if (k > l){
					k = k + l;
					l = k - l;
					k = k - l;
				}
				for (let idx = 0; idx < 28; idx++){
					if (checkpiece[idx][0] === k && checkpiece[idx][1] === l){
						usedpiece[idx] = 0;
						console.log(k + ' ' + l + ' ' + idx);
						break;
					}
				}
				return;
			}

			if (j < 9 && connectedto[j + 1][i] === connectedto[j][i]){
				connectedto[j + 1][i] = 0;
				connectedto[j][i] = 0;
				chosen[i][j + 1] = 0;
				chosen[i][j] = 0;
				let k = board[j + 1][i], l = board[j][i];
				if (k > l){
					k = k + l;
					l = k - l;
					k = k - l;
				}
				for (let idx = 0; idx < 28; idx++){
					if (checkpiece[idx][0] === k && checkpiece[idx][1] === l){
						usedpiece[idx] = 0;
						console.log(k + ' ' + l + ' ' + idx);
						break;
					}
				}
				return;
			}
		}
		return;
	}

	if (gamestatus === 1){ // Win
		if (mouseX >= 400 && mouseX <= 700 && mouseY >= 500 && mouseY <= 600){  // If user click "RESTART"
			gamestatus = -1;
			cntpiece = 0;
			generateboard();
		}
		return;
	}

	if (gamestatus === 2){ // Gameplay (open from menu)
		if (mouseX >= 1060 && mouseX <= 1085 && mouseY >= 10 && mouseY <= 38){ // If user click "X"
			gamestatus = -1;
		}
		return;
	}

	if (gamestatus === 3){ // Gameplay (open from games)
		if (mouseX >= 1060 && mouseX <= 1085 && mouseY >= 10 && mouseY <= 38){ // If user click "X"
			gamestatus = 0;
		}
		return;
	}

	if (gamestatus === 4){ // Revealed answer
		if (mouseX >= 25 && mouseX <= 220 && mouseY >= 90 && mouseY <= 150){ // If user click "RESTART"
			gamestatus = 0;
			generateboard();
			return;
		}
	}
}