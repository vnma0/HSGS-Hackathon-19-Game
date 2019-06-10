let h = 30;
let w = 60;
let State = 0;
let wid = 900, hei = 700;
let inp;
let win;
 
function setup() {
  createCanvas(wid, hei);
 
  menu();
}
 
function menu(){
    // tạo nút ấn
   
    button1 = createButton(' Easy');
    button2 = createButton(' Medium');
    button3 = createButton(' Hard');
 
    button1.size(w,h);
    button2.size(w+5,h);
    button3.size(w,h);
 
    let tmp = 3*hei/5-93;
    let tmp_wid = wid/3-10;
 
 
    button1.position(tmp_wid, tmp+60 );
    button2.position(tmp_wid+100, tmp+60);
    button3.position(tmp_wid+200, tmp+60);
 
    button1.mousePressed(startE);
    button2.mousePressed(startM);
    button3.mousePressed(startH);
 
}
 
 
function startE(){
      State = 1;
      time = 0, realTime = 60;
      win  = 0;
      inp = createInput('   ');
 
      button1.hide();
      button2.hide();
      button3.hide();
 
      buttonB = createButton(' Back');
      buttonB.size(w, h);
      buttonB.position(2*wid/3 - 170, hei/7 + 270);
      buttonB.mousePressed(gotoPage);
 
     
       
  }
 
function startM(){
      State = 2;
      time = 0, realTime = 60;
      win = 0;
      inp = createInput('   ');
 
      button1.hide();
      button2.hide();
      button3.hide();
 
      buttonB = createButton(' Back');
      buttonB.size(w, h);
      buttonB.position(2*wid/3 - 170, hei/7 + 270);
      buttonB.mousePressed(gotoPage);
  }
 
  function startH(){
      State = 3;
      time = 0, realTime = 60;
      win = 0;
      inp = createInput('   ');
 
      button1.hide();
      button2.hide();
      button3.hide();
 
      buttonB = createButton(' Back');
      buttonB.size(w, h);
      buttonB.position(2*wid/3 - 170, hei/7 + 270);
      buttonB.mousePressed(gotoPage);
  }
function gotoPage()
{
  // for(var i = 1; i <= Size * Size; ++i)
  //   input[i].hide;
  inp.hide();
  State = 0;
  menu();
  buttonB.hide();
}
 
 function lose(){
    if(win==0)
        realTime = 0;
  }
 
function showTime(){
 
    if (frameCount % 60 == 0 && realTime > 0&&win==0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    realTime --;
  }
 
  let tmp_time = realTime;
  let min = int(tmp_time/60);
  let sec = tmp_time%60;
 
  textSize(25);
  fill(0);
 
  if(!sec)
      text("Time : "+min+":00",2*wid/3-350,hei/7-50);
 
  else if(sec<10)
      text("Time :"+min+":0"+sec,2*wid/3-350,hei/7-50);
  else
      text("Time : "+min+":"+sec,2*wid/3-350,hei/7-50);
}
function draw() {
  if(State == 0 ) {
    background(196,168,84);
      fill(255);
      rect(100,40,670,400);
      // image(img, 0, 0);
      textSize(17);
 
      let tmp = hei/6+10;
      let tmp_wid = 5*wid/24;
 
      fill('red');
      textSize(30);
      text('Thuật toán trên hộp bánh',2*wid/5-90,tmp-35);
 
       fill(80);
       stroke(196,168,84);
       strokeWeight(5);
       rect(wid/3-53,3*hei/5-42,350,48);
 
       noStroke();
 
      tmp_wid-=20;
      tmp+=20;
      textSize(20);
      fill(0);
    text('Là 1 thương gia kinh doanh mặt hàng thực phẩm khủng',tmp_wid,tmp);
      tmp+=30;
      text('cho sức khỏe, bạn vừa phát minh ra một thuật toán thú vị   ',tmp_wid,tmp);
      tmp+=30;
 
      text('và đã bắt đầu in nó vào nhãn hộp của thương hiệu HKThon ',tmp_wid,tmp);
      tmp+=30;
 
      text('do chính bạn sản xuất. Nguyên tắc để tìm ra lời giải là bắt đầu  ',tmp_wid,tmp);
      tmp+=30;
 
      text('từ ô trên cùng bên trái, lần lượt giải theo trình tự, sử dụng ',tmp_wid,tmp);
      tmp+=30;
 
      text('hướng dẫn trong các ô kế tiếp để có được đáp án cuối cùng.',tmp_wid,tmp);
      tmp+=30;
 
   
      textSize(14);
      text('( Để đơn giản hóa dãy số, bạn ưu tiên chọn kết quả nhỏ nhất )' ,tmp_wid,tmp);
  }
 
 else if(State === 1){
   
  background(196,168,84);
  inp.size(50,50)
  inp.position(223,197);
   const Ans = inp.value();
  textSize(13);
  fill(255);
  stroke(20);
  strokeWeight(2);
  rect(10,10,70,70);
  rect(95,85,70,70);
  rect(210,85,70,70);  
  rect(320,85,70,70);
  rect(420,85,70,70);
  rect(520,85,70,70);
   
  rect(520,190,70,70);
  rect(320,190,70,70);
  rect(415,190,70,70);
  rect(215,190,70,70);
   noStroke();
   
   
  fill('black');
  text("119",33,48);
  text('1/7 của 119',95,120);  
  text('1/3',340,115);
  text('số vừa tìm',323,135);
  text('+67',230,120);
  text('x5.5',444,120);
  text('chia 11',534,120);
  text('1/7',540,215);
  text('số vừa tìm',525,235);
  text('+15',440,225);
  text('x2',345,225);
   
  stroke(0);
  line(80,80,95,85);
  line(520,115,490,115);
  line(555,155,555,190);
  line(420,115,390,115);
  line(520,225,485,225);
  line(320,115,280,115);
  line(210,115,165,115);
  line(390,225,415,225);
  line(285,225,320,225);
 
  if(Ans == 34) {
  win = 1;
  textSize(30);
    fill('red');
    text(' YOU WIN ', 200, 400 );}
   showTime();
          if(!realTime){
            text("YOU LOSE",200, 400);
  }
 }
else if(State == 2){
  background(196,168,84);
 
  inp.size(50,50)
  inp.position(223,197);
 
  textSize(13);
  fill(255);
  stroke(20);
  strokeWeight(2);
  rect(10,10,70,70);
  rect(95,85,70,70);
  rect(210,85,70,70);  
  rect(320,85,70,70);
  rect(420,85,70,70);
  rect(520,85,70,70);
   
  rect(520,190,70,70);
  rect(320,190,70,70);
  rect(415,190,70,70);
  rect(215,190,70,70);
  noStroke();
   
   
  fill('black');
  text("261",33,48);
  text('1/9 hoặc ',100,110)
  text('1/3 của 261',95,135);
  text('+79',230,105);
  text('hoặc',230,125);
  text('+62',230,145);
  text('1/7 hoặc',330,107);
  text('2/5 số',333,128);
  text('vừa tìm ',330,148);
  text('x2',445,105);
  text('hoặc', 435, 125);
  text('chia 1/3', 430, 145);
  text('x5/2 hoặc',527,105);
  text('x2 số',530,125);
  text('vừa tìm',530,145);
  text('x3.5',542,227);
  text('+38',434,227);
  text('25%',335,210);
  text('hoặc 75%',327,230);
  text('số vừa tìm', 325,250);
  stroke(0);
  line(80,80,95,85);
  line(520,115,490,115);
  line(555,155,555,190);
  line(420,115,390,115);
  line(520,225,485,225);
  line(320,115,280,115);
  line(210,115,165,115);
  line(390,225,415,225);
  line(285,225,320,225);
 
 
  if(inp.value() == 55) {
    win = 1;
    textSize(30);
    fill('red');
    text(' YOU WIN ', 200, 400 ); }
  showTime();
          if(!realTime){
            text("YOU LOSE",200,400);
          }
 
   }
  else if(State == 3){
  background(196,168,84);
   
  inp.size(50,50)
  inp.position(223,197);
   
  textSize(13);
  fill(255);
  stroke(20);
  strokeWeight(2);
  rect(10,10,70,70);
  rect(95,85,70,70);
  rect(210,85,70,70);  
  rect(320,85,70,70);
  rect(420,85,70,70);
  rect(520,85,70,70);
   
  rect(520,190,70,70);
  rect(320,190,70,70);
  rect(415,190,70,70);
  rect(215,190,70,70);
  noStroke();
   
   
  fill('black');
  text('374',35,45);
  text('1/11 hoặc ',100,110)
  text('1/17 ',115,135);
  text('+96',230,105);
  text('hoặc',230,125);
  text('+108',230,145);
 
  text('1/2 số',335,115);
  text('vừa tìm ',333,140);
  text('(số vừa tìm ',422,105);
  text(' +1 ) ', 435, 125);
  text(' x1/2', 430, 145);
  text('x6 số',535,115);
  text('vừa tìm',530,135);
  text('Lấy Căn',530,215);
  text('bậc hai',530,235);
  text('2/(căn 5) ',425,210);
  text('hoặc', 435, 230);
  text('1/1.11...',425,250);
  text('x673',340,230);
 
  stroke(0);
  line(80,80,95,85);
  line(520,115,490,115);
  line(555,155,555,190);
  line(420,115,390,115);
  line(520,225,485,225);
  line(320,115,280,115);
  line(210,115,165,115);
  line(390,225,415,225);
  line(285,225,320,225);
   
   
  if(inp.value() == 2019) {
    win = 1;
    textSize(30);
    fill('red');
    text(' YOU WIN ', 200, 400 ); }
    showTime();
          if(!realTime){
            text("YOU LOSE",200, 400);
          }
  }
}