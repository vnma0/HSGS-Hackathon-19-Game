function rand(x, y){ // Return a random number in [x, y]
	return Math.floor(Math.random() * (y - x + 1)) + x;
}

function randomshuffle(arr, n){ // Randomly shuffle an array
	let arr2 = arr;
	let numshuffle = rand(100, n * n / 2);
	while (numshuffle--){
		let x, y, t;
		do{
			x = rand(0, n - 1);
			y = rand(0, n - 1);
		} while (x === y);
		t = arr2[x];
		arr2[x] = arr2[y];
		arr2[y] = t;
	}
	return arr2;
}

function solveboard(idx){ // Try to fill a board with idx-th domino
	//console.log(idx);
	let cntadj = arrayClone(origboard);
	if (idx === 28) return;
	let idxx = -1, idxy = -1; // Index of the last square that has 2 neighbors
	let cntneighbors; // Count number of neighbors of a square
	let lastadj; // Last neighbors that is not generated
	for (let i = 0; i < 10; i++){
		for (let j = 0; j < 10; j++){
			if (genboard[i][j] === 0) continue;
			cntneighbors = 0;
			lastadj = -1;

			if (i > 0 && genboard[i - 1][j] === 1){
				cntneighbors++;
				lastadj = 0;
			}
			if (j > 0 && genboard[i][j - 1] === 1){
				cntneighbors++;
				lastadj = 1;
			}
			if (i < 9 && genboard[i + 1][j] === 1){
				cntneighbors++;
				lastadj = 2;
			}
			if (j < 9 && genboard[i][j + 1] === 1){
				cntneighbors++;
				lastadj = 3;
			}

			cntadj[i][j] = cntneighbors;
			if (cntneighbors === 1){ // If this square has only 1 neighbor that is not generated then we fill this square and its neighbor
				board[i][j] = pieces[idx][0];
				genboard[i][j] = 0;
				answer[i][j] = idx + 1;
				if (lastadj === 0){
					board[i - 1][j] = pieces[idx][1];
					genboard[i - 1][j] = 0;
					answer[i - 1][j] = idx + 1;
				}
				if (lastadj === 1){
					board[i][j - 1] = pieces[idx][1];
					genboard[i][j - 1] = 0;
					answer[i][j - 1] = idx + 1;
				}
				if (lastadj === 2){
					board[i + 1][j] = pieces[idx][1];
					genboard[i + 1][j] = 0;
					answer[i + 1][j] = idx + 1;
				}
				if (lastadj === 3){
					board[i][j + 1] = pieces[idx][1];
					genboard[i][j + 1] = 0;
					answer[i][j + 1] = idx + 1;
				}
				solveboard(idx + 1);
				return;
			}

			if (cntneighbors === 2){ // If this square has 2 neighbors that is not generated
				// It's easy to prove that this kind of square exists.
				idxx = i;
				idxy = j;
			}
		}
	}
	board[idxx][idxy] = pieces[idx][0];
	genboard[idxx][idxy] = 0;
	answer[idxx][idxy] = idx + 1;

	let dir = rand(0, 1); // Randomly choose 1 of the 2 neighbors
	if (idxx > 0 && genboard[idxx - 1][idxy] === 1){
		if (dir === 1){
			dir = 0;
		}
		else{
			board[idxx - 1][idxy] = pieces[idx][1];
			genboard[idxx - 1][idxy] = 0;
			answer[idxx - 1][idxy] = idx + 1;
			solveboard(idx + 1);
			return;
		}
	}
	if (idxy > 0 && genboard[idxx][idxy - 1] === 1){
		if (dir === 1){
			dir = 0;
		}
		else{
			board[idxx][idxy - 1] = pieces[idx][1];
			genboard[idxx][idxy - 1] = 0;
			answer[idxx][idxy - 1] = idx + 1;
			solveboard(idx + 1);
			return;
		}
	}
	if (idxx < 9 && genboard[idxx + 1][idxy] === 1){
		if (dir === 1){
			dir = 0;
		}
		else{
			board[idxx + 1][idxy] = pieces[idx][1];
			genboard[idxx + 1][idxy] = 0;
			answer[idxx + 1][idxy] = idx + 1;
			solveboard(idx + 1);
			return;
		}
	}
	if (idxy < 9 && genboard[idxx][idxy + 1] === 1){
		if (dir === 1){
			dir = 0;
		}
		else{
			board[idxx][idxy + 1] = pieces[idx][1];
			genboard[idxx][idxy + 1] = 0;
			answer[idxx][idxy + 1] = idx + 1;
			solveboard(idx + 1);
			return;
		}
	}
}

function generateboard(){ // Generate a board
	//Reset all the variables
	board = arrayClone(origboard);
	genboard = arrayClone(isboard);
	answer = arrayClone(origboard);
	chosen = arrayClone(origboard);
	connectedto = arrayClone(origboard);
	cntpiece = 0;
	idconnectedto = 0;
	clickx1 = -1;
	clicky1 = -1;
	clickx2 = -1;
	clicky2 = -1;
	
	for (let i = 0; i < 28; i++){ // Randomly swap an element in pieces
		usedpiece[i] = false;
		let isswap = rand(0, 1);
		if (isswap === 1){
			let t = pieces[i][0];
			pieces[i][0] = pieces[i][1];
			pieces[i][1] = t;
		}
	}
	pieces = randomshuffle(pieces, 28); // Random shuffle array pieces
	solveboard(0);
}