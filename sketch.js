let wid = 900; // rộng của canvas
let hei = 700; // cao của canvas

let w = 60; // rộng của button
let h = 30; // cao của button

let State = 0; // trạng thái game
let Size = 4; // kích cỡ bảng
const base_x = 55; // hoành độ ô đầu
const base_y = 55; // tung độ ô đầu
let Cell = []; // ô vuông
let num; // số
let wa = []; // đáp án ô

let sol = []; // bảng đáp án
let used = []; // used[i] = 1 nếu ô thứ i đã điền số, có thể đúng hoặc sai
let input = []; 

let win = 0;

for(let i=1;i<=Size*Size;++i){
    used[i] = 0;
}

class cell {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    display(){
    push();
    noFill();
    stroke(110,27,31);
    rect(this.x,this.y,55,55);
    pop();
    }
}

function mousePressed(){
  
  let pos;
  
  // tìm ô click vào là ô nào
  if(mouseX<base_x||mouseY<base_y||mouseX>base_x*Size+base_x||mouseY>base_y*Size+base_y){
      pos = -1;
  }
  else    
  pos = int((mouseX-base_x)/base_x)+1 + Size*int((mouseY-base_y)/base_y);

  if(pos<=Size*Size&&pos>=0){
    cur_pos = pos;
    input[pos].input(myInputEvent);
  }
  // console.log(mouseX,mouseY,pos);
}

function setup() {
  createCanvas(wid, hei);
  menu();
} 

function menu(){
    // tạo nút ấn
    buttonE = createButton('Easy');
    buttonM = createButton('Medium');
    buttonH = createButton('Hard');

    buttonE.size(w,h);
    buttonM.size(w+5,h);
    buttonH.size(w,h);

    let tmp = 3*hei/5-93;
    let tmp_wid = wid/3-10;


    buttonE.position(tmp_wid, tmp+60);
    buttonM.position(tmp_wid+100, tmp+60);
    buttonH.position(tmp_wid+200, tmp+60);

    buttonE.mousePressed(startEasy);
    buttonM.mousePressed(startMedium);
    buttonH.mousePressed(startHard);

}

  function startEasy(){
      State = 1;
      Size = 3;
      time=0,realTime=180;
      win = 0;

      buttonE.hide();
      buttonM.hide();
      buttonH.hide();

      buttonB = createButton(' Back');
      buttonB.size(w,h);
      buttonB.position(2*wid/3 + 80, hei/7+30);

      buttonSur = createButton('Surrender');
      buttonSur.size(w+15,h);
      buttonSur.position(2*wid/3, hei/7+30);

      buttonB.mousePressed(goToPage);
      buttonSur.mousePressed(lose);

          for(let i=1;i<=Size*Size;++i){
          wa[i] = 1;
          input[i] =  createInput('');
          pos = i;

          input[pos].position(0,1024);
          input[pos].size(0,0);
        }
  }

  function startMedium(){
      State = 2;
      Size = 4;
      time=0,realTime=780;
      win = 0;

      buttonE.hide();
      buttonM.hide();
      buttonH.hide();

      buttonB = createButton(' Back');
      buttonB.size(w,h);
      buttonB.position(2*wid/3 + 80, hei/7+30);
      
      buttonSur = createButton('Surrender');
      buttonSur.size(w+15,h);
      buttonSur.position(2*wid/3, hei/7+30);

      buttonB.mousePressed(goToPage);
      buttonSur.mousePressed(lose);

          for(let i=1;i<=Size*Size;++i){
          wa[i] = 1;
          input[i] =  createInput('');
          pos = i;

          input[pos].position(0,1024);
          input[pos].size(0,0);
        }
  }

  function startHard(){
      State = 3;
      Size = 5;
      time=0,realTime=1500;
      win = 0;

      buttonE.hide();
      buttonM.hide();
      buttonH.hide();

      buttonB = createButton(' Back');
      buttonB.size(w,h);
      buttonB.position(2*wid/3 + 80, hei/7+30);
      
      buttonSur = createButton('Surrender');
      buttonSur.size(w+15,h);
      buttonSur.position(2*wid/3, hei/7+30);

      buttonB.mousePressed(goToPage);
      buttonSur.mousePressed(lose);

          for(let i=1;i<=Size*Size;++i){
          wa[i] = 1;
          input[i] =  createInput('');
          pos = i;

          input[pos].position(0,1024);
          input[pos].size(0,0);
        }
  }

  function goToPage(){
    for(let i = 1;i<=Size*Size;i++){
        input[i].hide();
      }

      State = 0;
      menu();
      buttonB.hide();
      buttonSur.hide();
  }

  function lose(){
    if(win==0)
        realTime = 0;
  }


function myInputEvent() {
  num  = this.value();
  // console.log(cur_pos,num,sol[cur_pos-1])
  if(num == sol[cur_pos-1]) wa[cur_pos] = 0;
}


function showTime(){
    if(time<43) time++;
    if(time==43){
      if(!win&&realTime>0)
      realTime--;
      time=0;
    }

  let tmp_time = realTime;
  let min = int(tmp_time/60);
  let sec = tmp_time%60;

  textSize(25);
  fill(0);

  if(!sec)
      text("Time : "+min+":00",2*wid/3,hei/7);

  else if(sec<10)
      text("Time :"+min+":0"+sec,2*wid/3,hei/7);
  else
      text("Time : "+min+":"+sec,2*wid/3,hei/7);
}


function draw() {
  // input.input(myInputEvent);
  if(State == 0){
      background(196,168,84);
      fill(255);
      rect(100,40,670,400);
      // image(img, 0, 0);
      textSize(17);

      let tmp = hei/6+5;
      let tmp_wid = 5*wid/24+7;

      fill('red'); 
      textSize(30);
      text('iQuasionS',2*wid/5-3,tmp-35);

       fill(80);
       stroke(196,168,84);
       strokeWeight(5);
       rect(wid/3-53,3*hei/5-42,350,48);

       noStroke();


      textSize(20);
      fill(0);
      text('Thời xưa con người tối cổ đã tu luyện ngàn năm và',tmp_wid,tmp); 
      tmp+=30;
      text('nghĩ ra các phương pháp rất khủng để giải các ',tmp_wid,tmp); 
      tmp+=30;

      text('bài toán uyên thâm,trong đó có 1 bài toán như sau:',tmp_wid,tmp);
      tmp+=30;

      text( 'Hãy điền các số nguyên vào 1 bảng sử dụng các Hint',tmp_wid,tmp);
      tmp+=30;

      text( 'sao cho không có 2 số nào giống nhau, tất cả đều lớn ',tmp_wid,tmp);
      tmp+=30;

      text( 'hơn hoặc bằng 1 và nhỏ hơn hoặc bằng 100. Hãy thử ',tmp_wid,tmp);
      tmp+=30;

      text('điền số để xem bạn có bằng người tối cổ không :D ',tmp_wid,tmp);
      tmp+=30; 

      text('À quên, thời tối cổ thời gian chạy nhanh hơn bình thường ',tmp_wid,tmp);
      tmp+=30;   

      text('nên tuổi thọ con người khá thấp :D',tmp_wid,tmp);
      tmp+=30;  

  }

else if(State == 1){
          background(204,155,52);
          Size = 3;

          sol = [90,1,10,
                 8,70,65,
                 91,9,13];

          let ques_x = 55;
          let ques_y = 3*hei/7; 
          let dis_col = 170;

          fill (0);
          textSize(25);
          text('A',base_x/2,base_y+base_y/2+7);
          text('B',base_x/2,2*base_y+base_y/2+8);
          text('C',base_x/2,3*base_y+base_y/2+9);
          text('1',base_x+base_x/2-10,base_y-10);
          text('2',2*base_x+base_x/2-10,base_y-10);
          text('3',3*base_x+base_x/2-10,base_y-10);


          stroke('blue');
          fill(0);
          rect(45,3*hei/7-30,500,150);
          noStroke();

          fill (255);
            textSize(20);
            text('HINT (DO NOT USE TAB)',ques_x,ques_y);

            ques_y+=30;

            text('A1=10C2',ques_x,ques_y );
            text('8A2=B1',ques_x,ques_y + 30);
            text('5C3=B3',ques_x,ques_y + 60);

            text('7C3=C1',ques_x+dis_col,ques_y);
            text('65A2=B3',ques_x+dis_col,ques_y + 30);
            text('B2=7A3',ques_x+dis_col,ques_y + 60);

            dis_col+=dis_col;

            text('A1=C1-1',ques_x+dis_col,ques_y);
            // text('13A2=C3',ques_x+dis_col,ques_y + 30);
            text('70A2=B2',ques_x+dis_col,ques_y + 30);
            
          let x = base_x;
          let y = base_y;
          let cnt=0;

          showTime();
          if(!realTime){
            text("YOU LOSE",370,200);
          }

          for(let i = 1;i<=Size*Size;i++){

             pos = i;

             if(pos%Size==0) 
                  input[pos].position(9+base_x+(pos-1)%Size*55,14+base_y+55*int((pos-1)/Size) );
             else 
                  input[pos].position(9+base_x+(pos%Size-1)*55,14+base_y+55*int(pos/Size));

                  input[pos].size(30,20);


              if(i%Size==1&&i!=1){
              y+=55;
              x = base_x;
            }

            // tạo ô vuông
            let c = new cell(x,y);
            Cell.push(c);
          
            c.display();
            x = x+55;
            }


            // kiểm tra còn ô nào sai không
            for(let i = 1;i<=Size*Size;++i){
              if(wa[i]==1){
                cnt++;
              }
            }

            if(cnt==0) win = 1;

            if(win&&realTime>0){
                fill("green");
                text("YOU WIN",370,200);
            }   
}

else if(State == 2){
        background(204,155,52);
        Size = 4;

        sol = [4,13,89,33,
             11,7,6,18,
             14,19,36,32,
             5,65,37,84];

        let ques_x = 55;
        let ques_y = hei/2; 
        let dis_col = 170;

        fill (0);
        textSize(25);
        text('A',base_x/2,base_y+base_y/2+7);
        text('B',base_x/2,2*base_y+base_y/2+8);
        text('C',base_x/2,3*base_y+base_y/2+9);
        text('D',base_x/2,4*base_y+base_y/2+10);
        text('1',base_x+base_x/2-10,base_y-10);
        text('2',2*base_x+base_x/2-10,base_y-10);
        text('3',3*base_x+base_x/2-10,base_y-10);
        text('4',4*base_x+base_x/2-10,base_y-10);

         stroke('blue');
         fill(0);
         rect(45,3*hei/7+20,700,180);
         noStroke();

        fill (255);
        textSize(20);
        text('HINT (DO NOT USE TAB)',ques_x,ques_y);

        ques_y+=30;

        text('B3=1/3B4',ques_x,ques_y);
        text('A3=D4+D1',ques_x,ques_y + 30);
        text('A4=3B1',ques_x,ques_y + 60);

        text('D4/7=B1+1',ques_x+dis_col,ques_y);
        text('B2=1/2C1',ques_x+dis_col,ques_y + 30);
        text('A2=1/5D2',ques_x+dis_col,ques_y + 60);
        text('B4=1/2C3',ques_x+dis_col,ques_y + 90);

        dis_col+=dis_col;

        text('C1=B4-A1',ques_x+dis_col,ques_y);
        text('D2=A4+C4',ques_x+dis_col,ques_y + 30);
        text('C3=D3-1',ques_x+dis_col,ques_y + 60);
        text('C4=5B3+2',ques_x+dis_col,ques_y + 90);

        dis_col+=dis_col/2;

        text('D1=1/13D2',ques_x+dis_col,ques_y);
        text('C2=1/2(A4+D1)',ques_x+dis_col,ques_y+30);
        text('D3=C4+D1',ques_x+dis_col,ques_y+60);
        text('D4=6C1',ques_x+dis_col,ques_y+90);

        let x = base_x;
        let y = base_y;
        let cnt=0;

        showTime();
        if(!realTime){
            text("YOU LOSE",370,200);
        }

        for(let i = 1;i<=Size*Size;i++){

         pos = i;

         if(pos%Size==0) 
              input[pos].position(9+base_x+(pos-1)%Size*55,14+base_y+55*int((pos-1)/Size) );
         else 
              input[pos].position(9+base_x+(pos%Size-1)*55,14+base_y+55*int(pos/Size));

              input[pos].size(30,20);


        if(i%Size==1&&i!=1){
            y+=55;
            x = base_x;
        }

        let c = new cell(x,y);
        Cell.push(c);
      
        c.display();
        x = x+55;
        }

        for(let i = 1;i<=Size*Size;++i){
            if(wa[i]==1){
                cnt++;
            }
        }

        if(cnt==0) win = 1;

        if(win&&realTime>0){
            fill("green");
            text("YOU WIN",370,200);
        }
}

else if(State == 3){
          background(204,155,52);
          Size = 5;

          sol = [4,13,89,33,66,
                 11,7,6,18,45,
                 14,19,36,32,64,
                 5,65,37,84,63,
                 9,1,8,12,2];

          let ques_x = 55;
          let ques_y = 4*hei/7-30; 
          let dis_col = 170;

          fill (0);
          textSize(25);
          text('A',base_x/2,base_y+base_y/2+7);
          text('B',base_x/2,2*base_y+base_y/2+8);
          text('C',base_x/2,3*base_y+base_y/2+9);
          text('D',base_x/2,4*base_y+base_y/2+10);
          text('E',base_x/2,5*base_y+base_y/2+11);
          text('1',base_x+base_x/2-10,base_y-10);
          text('2',2*base_x+base_x/2-10,base_y-10);
          text('3',3*base_x+base_x/2-10,base_y-10);
          text('4',4*base_x+base_x/2-10,base_y-10);
          text('5',5*base_x+base_x/2-10,base_y-10);


            stroke('blue');
            fill(0);
            rect(45,3*hei/7+45,850,189);
            noStroke();

          fill (255);
            textSize(20);
            text('HINT (DO NOT USE TAB)',ques_x,ques_y);

            ques_y+=30;

            text('A1=1/9C3',ques_x,ques_y);
            text('A2=1/5D2',ques_x,ques_y + 30);
            text('C1=2B2',ques_x,ques_y + 60);
            text('A4=3B1',ques_x,ques_y + 90);
            text('A3=A3 of Medium',ques_x,ques_y + 120);

            text('D5=C5-E2',ques_x+dis_col,ques_y);
            text('B3=1/3B4',ques_x+dis_col,ques_y + 30);
            text('B4=1/2C3',ques_x+dis_col,ques_y + 60);
            text('C3=2(B4-1)+E5',ques_x+dis_col,ques_y + 90);
            text('C2=1/2(A4+D1)',ques_x+dis_col,ques_y + 120);

            dis_col+=dis_col + 5;

            text('C3=(B2-1)^2',ques_x+dis_col,ques_y);
            text('C4=5B3+2',ques_x+dis_col,ques_y + 30);
            text('D1=1/13D2',ques_x+dis_col,ques_y + 60);
            text('Floor(A5/10)=A5%10',ques_x+dis_col,ques_y + 90);
            text('D3=C4+D1',ques_x+dis_col,ques_y + 120);

            dis_col = dis_col + dis_col/2+40;

            text('D4=6C1',ques_x+dis_col,ques_y);
            text('A5=2A4',ques_x+dis_col,ques_y + 30);
            text('D4+B3=2B5',ques_x+dis_col,ques_y + 60);
            text('16A1=C5',ques_x+dis_col,ques_y + 90);
            text('3D4=D5',ques_x+dis_col,ques_y + 120);

            dis_col = dis_col + dis_col/3 - 35;

            text('căn A1=E5',ques_x+dis_col,ques_y);
            text('B3+B4=2E4',ques_x+dis_col,ques_y + 30);
            text('B2=E3-1',ques_x+dis_col,ques_y + 60);
            text('E5=2E2',ques_x+dis_col,ques_y + 90);
            text('E3+1=E1',ques_x+dis_col,ques_y + 120);
 

            let x = base_x;
            let y = base_y;
            let cnt=0;

            showTime();
            if(!realTime){
                text("YOU LOSE",370,200);
              }

            for(let i = 1;i<=Size*Size;i++){

               pos = i;

               if(pos%Size==0) 
                    input[pos].position(9+base_x+(pos-1)%Size*55,14+base_y+55*int((pos-1)/Size) );
               else 
                    input[pos].position(9+base_x+(pos%Size-1)*55,14+base_y+55*int(pos/Size));

                    input[pos].size(30,20);


              if(i%Size==1&&i!=1){
              y+=55;
              x = base_x;
              }

            let c = new cell(x,y);
            Cell.push(c);
            
            c.display();
            x = x+55;
            }

            for(let i = 1;i<=Size*Size;++i){
              if(wa[i]==1){
                cnt++;
              }
            }

            if(cnt==0) win = 1;

            if(win&&realTime>0){
              fill("green");
              text("YOU WIN",370,200);
            }
}

}