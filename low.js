// simplified background for lower CPU 
//create checker to output final screen
let ans = 0;
// set up difficulty 
let diff = 1;
//animation crate
let example, back,sound,lose;
//stage information
let op = ['green', 'blue', 'yellow', 'red'];
let stat = ['Original game', 'Expert', 'Master', 'TOURIST'];
let mode = 1;
//create game's setting + torturial button
var harder, easier;

var button, how, hint, stage, reset;
//game correct answer 
var result = "ABCD";
//create class NODE
function preload() 
{
  soundFormats('mp3','ogg');
  sound = loadSound('Horror-Game-Intro.mp3');
 
   back = loadImage('low ani1.png');
  example = loadImage('ow.png');
  lose = loadImage('LOSE.png');
}
class node {
  constructor(color, key, x, y, size) {
    this.color = color;
    this.key = key;
    this.x = x;
    this.y = y;
    this.size = size;
  }
}
//create graph
class papa {
  constructor(node0, node1, node2, node3, node4) {
    this.node = [];
    this.node[1] = node1;
    this.node[2] = node2;
    this.node[3] = node3;
    this.node[4] = node4;
    this.node[0] = node0;

    let bug = 0;
    for (let i = 1; i <= diff; i++) {

      bug += comma[i] * (unchar(this.node[rule[i]].key) - 65);
    }
    bug += 26 * diff;
    bug %= 26;
    this.node[0].key = char(bug + 65);

  }
}

//setup var for changing rules .
let rule = [];
let comma = [];
let roll = [1, -1];
//setup for first game 
function init() {
  for (let i = 1; i <= diff; i++) {
    rule[i] = (i - 1) % 4 + 1;
    comma[i] = 1;
  }
}
init();

// set up for games details

let colour = ["purple", "red", "black", "green", "blue"]
let is = 0;
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let arr = [];
let chain = [];
let w = 800;
let h = 800;
let xx = [w / 4-30, 3 * w / 4-30, w / 4-30, 3 * w / 4-30];
let yy = [h / 4-10, h / 4-10, 3 * h / 4-10, 3 * h / 4-10];
// creating picture

function setup() {
  is = random(colour);
  //eye.size(150,150);
  
  createCanvas(720, 720);
  sound.playMode('restart');
  sound.setVolume(0.9);
  sound.play();
  sound.setLoop(true);
  //creating new games button
  
  //restart button
  button = createButton(' restart ');
  button.position(650-60, 10);
  button.size(50, 50);
  button.mousePressed(restart);
  
  // creating game_rules  button 
  how = createButton('How to play');
  how.position(10, 10);
  how.size(50, 50);
  how.mousePressed(Game_Guild);
  how.mouseReleased(Game_continue);
  
  //creating hint button
  hint = createButton('got stuck ?');
  hint.position(100, 10);
  hint.size(50, 50);
  hint.mousePressed(Solution);
  hint.mouseReleased(Game_continue);
  
  //creating difficulty button
  harder = createButton('lvl  up');
  harder.position(590-60, 10);
  harder.size(50, 50);
  harder.mousePressed(up);
  
  easier = createButton('lvl down');
  easier.position(720-60, 10);
  easier.size(50, 50);
  easier.mousePressed(down);
  
  //creating stage button
  stage = createButton('stage');
  stage.position(180, 10);
  stage.size(50, 50);
  stage.mousePressed(standing);
  stage.mouseReleased(Game_continue);
  
  //creating mode change button
  reset = createButton('reset');
  reset.position(530-60, 10);
  reset.size(50, 50);
  reset.mousePressed(gameset);
  play();
}
// creating nodes position
function play() {
  for (let i = 0; i < 4; ++i) {
    arr[i] = new node(random(colour), "?", xx[i], yy[i], 70);
  }
  //create basic node
  for (let i = 0; i < 4; ++i) {
    for (let j = 1; j < 5; ++j) {
      arr[i + 4 * j] = new node(random(colour), random(alphabet), 0, 0, 70)
      if (j == 1) {
        arr[i + j * 4].x = arr[i].x - width / 8;
        arr[i + j * 4].y = arr[i].y - height / 8;
      } else if (j == 2) {
        arr[i + j * 4].x = arr[i].x + width / 8;
        arr[i + j * 4].y = arr[i].y - height / 8;
      } else if (j == 3) {
        arr[i + j * 4].x = arr[i].x + width / 8;
        arr[i + j * 4].y = arr[i].y + height / 8;
      } else if (j == 4) {
        arr[i + j * 4].x = arr[i].x - width / 8;
        arr[i + j * 4].y = arr[i].y + height / 8;
      }
    }
  }
  //add to graph
  chain[0] = new papa(arr[0], arr[4], arr[8], arr[12], arr[16])
  chain[1] = new papa(arr[1], arr[5], arr[9], arr[13], arr[17])
  chain[2] = new papa(arr[2], arr[6], arr[10], arr[14], arr[18])
  chain[3] = new papa(arr[3], arr[7], arr[11], arr[15], arr[19])
}

//restart engine 
function restart() {
  setup();
  fun = '?';
  ans = 0;
  if (mode >= 3) {
    for (let i = 1; i <= diff; i++) {
      rule[i] = int(random(3.49) + 1);
    }
  }

  if (mode == 2 || mode == 4) {
    for (let i = 1; i <= diff; i++) {
      comma[i] = random(roll);
    }
  }
  play();
}

// submit solution
let fun = '?';

function keyTyped() {
  for (let i = 65; i <= 90; i++) {
    if (keyCode === i)
      fun = char(i);
  }
}
//checker engine
function check() {
  let buggy = 0;
  for (let i = 1; i <= diff; i++) {

    buggy += comma[i] * (unchar(chain[3].node[rule[i]].key) - 65);
  }
  buggy += 26 * 4;
  buggy = buggy % 26;


  buggy = char(buggy + 65);
  result = buggy;
  return (fun != '?' && fun != buggy)
}
//animation frequency
let i = 1;
let a = 1;

//game display
function draw() {

  
  background(0);
  image(back,360-500,360-500);
  fill(255);
  
  //level information
  textSize(25);
  text('Current level :', 330, 30);
  fill(op[mode - 1]);
  text(diff, 420, 30);
  fill(190)
  textSize(50);

  //graph display 
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 5; ++j) {
      fill(is);
      
      circle(chain[i].node[j].x, chain[i].node[j].y, chain[i].node[j].size);

      fill("white");
      textSize(50);
      textAlign(CENTER, CENTER)

      if (i == 3 && j == 0) {
        chain[i].node[j].key = fun;
        // return game result 
        if (check() == true) {
          ans = -1;
        } else
        if (fun != '?' && check() === false) {
          ans = 1;

        }
      }

      text(chain[i].node[j].key, chain[i].node[j].x, chain[i].node[j].y);
    }

  }
  //game result display
  textSize(100);
  if (ans == -1) {
    image(lose,0,0);
    fill(120, 5, 0);
    text('U LOSE', width / 2, height / 2 - 100);
    
    //showing result and actual elements' value
    text(result, width / 2, height / 4);
    textSize(200 / diff);
    let j = 200 / diff;
    fill('red');
    for (let i = 1; i <= diff; i++) {
      text(comma[i] * (unchar(chain[3].node[rule[i]].key) - 65), (i - 1) * width / diff + j, 3 * height / 4 + 100);
    }

    fill('red');
    textSize(25);
    text('Press restart button to start :', 400, 3 * height / 4);

  }
  if (ans == 1) {
    background(20, 248, 7);
    fill(random(220), random(220), random(220));
    //  image(win_image,0,0,width,height);
    text('CONGRATS', width / 2, height / 2 - 100);
    fill(0);
    textSize(25);
    text('Press restart button to start :', 400, 3 * height / 4);
  }
}

//guild display
function Game_Guild() {
  frameRate(0);
  background(0);
  fill(255);
  textSize(20);
  text('Rules :', width / 2, 30);
  text('- Change the set into number .... ', 200, 100);
  text('- Assume that A  number tis 0 ,B num is 1 ,... so Z num is 25', 310, 150);
  text('- Consider the center node in the five_node set ', 300, 250);
  text('- Look for the relation between four nodes (or NOT) to get the answer !', 400, 300);
  text('- There are only add and minus in the equation between  nodes',400,450);
  
  text('- Watch out :(Except first mode) The rules never stay the same !', 400, 2 * height / 3);
  text('- press on STAGE button to see the rules change in your current stage ',400,3* height/4);
  text('- At level n , you may have to count the equation of n nodes \n which its numerical order is [1..4]',400,375);
  text('- The correct answer is the final result divided by 26 \n if your answer is negative ,then add 26 until it is positive',400,630);
  text('There is only one attempt each game , becareful ',width/2,height -40);
  text('Example : Hold Esc ',width/2,height-130);
}

//back to game
function Game_continue() {
  frameRate(60);
}

//hint display
function Solution() {
  frameRate(0);
  background(random(220), random(220), random(220));
  text(result,width/2,height/2+20);
  textSize(25);
  text('The result is the sum of nodes with the order below : ', 400, 300);
  textSize(200 / diff);
  for (let i = 1; i <= diff; i++) {
    text(comma[i] * rule[i], (i) * width / diff - width / diff / 2, height - 100);
  }

}

//lvl up
function up() {
  diff++;
  init();
  restart();
}

//lvl down
function down() {
  if (diff > 1) {
    diff--;
    init();
    restart();
  }

}

//stage details and explanation 
function standing() {
  frameRate(0);
  background(10);
  textSize(20);
  text('Each stage has changes from the previous ones : ', 300, 100);
  text('_', 50, 150);
  text('_', 50, 250);
  text('_', 50, 350);
  text('_', 50, 450);
  text('Press (reset) button to change mode', 350, 500);
  textSize(50);
  text('Current stage :', width / 2, 600);
  fill(op[mode - 1]);
  text(stat[mode - 1], width / 2, 700);
  textSize(20);
  fill(op[0]);
  text('Original game : The order of the nodes stays the same in every match', 390, 150);
  fill(op[1]);
  text('Expert : The same order of nodes but some plus sign may be replaced \n with minus ones each game ', 390, 250);
  fill(op[2]);
  text('Master : Guaranteed that everything is positive but the order is random \n nodes can be repeated', 390, 350);
  fill(op[3])
  text('TOURIST : EVERYTHING changes RAPIDLY ', 350, 450);

}

//mode change engine
function gameset() {
  mode = mode + 1;
  if (mode > 4)
    mode = 1;

  init();
  restart();
}

function keyPressed()
{
  if(keyCode == 27)
  {
    frameRate(0);
   image(example,0,0,width,height);
    
  }
  
}
function keyReleased()
{
  frameRate(60);
}
