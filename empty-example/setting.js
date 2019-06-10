function arrayClone(arr){ // Deep clone an array
  let i, copy;
  if (Array.isArray(arr)){
    copy = arr.slice(0);
    for (i = 0; i < copy.length; i++){
      copy[i] = arrayClone(copy[ i ]);
    }
    return copy;
  }
  else if (typeof arr === 'object'){
    throw 'Cannot clone array containing an object!';
  }
  else{
    return arr;
  }
}

let origboard = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]; // Just an 10x10 array filled with 0s
let isboard = [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
               [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
               [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
               [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
               [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
               [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
               [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]; // 1 if the cell is in the board
const isBorderVertical = [[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
                          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                          [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                          [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                          [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0]]; // 1 if the vertical border is on the border of the map
const isBorderHorizontal = [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                            [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
                            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]; // 1 if the horizontal border is on the border of the map
let pieces = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], 
              [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
              [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
              [3, 3], [3, 4], [3, 5], [3, 6],
              [4, 4], [4, 5], [4, 6],
              [5, 5], [5, 6],
              [6, 6]]; // All the possible dominos
let board; // Value of the squares
let genboard; // 1 if the square has not been generated yet
let answer; // Answer to this game
let chosen; // 1 if the square is in a domino
let connectedto; // 2 square with the same id (not 0) is in the same domino
const checkpiece = arrayClone(pieces); // A const copy of pieces
let usedpiece = new Array(28); // usedpiece[i] is true if checkpiece[i] has been used by user
let clickx1 = -1, clicky1 = -1, clickx2 = -1, clicky2 = -1; // X and Y position of two sqquares of the domino
let cntpiece; // Number of pieces already put
let idconnectedto; // Generate id for connectedto
let gamestatus = -1; // -1 : Begin; 0 : In game; 1: Win; 2: Gameplay (From -1); 3 : Gameplay (From 0); 4 : Reveal answer
  