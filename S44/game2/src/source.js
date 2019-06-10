let canh = 25, kc = 5, bankinh = 20, page = 0, time; // các thông tin để khởi tạo bản đồ

let flag, buttonclicked = false, instruct = 0, ending, trietly = false, entered;

let arr // bản đồ đường đi

let check // bản đồ kiểm tra ô vuông đã khởi tạo hay chưa

let value = [9, 10, 11, 12]; // biến để tạo các bản đồ khác nhau

let thief // biến chứa thông tin thằng trộm

let someone // bản đồ chứa tọa độ của các cảnh sát và bảo vệ

let pathstage1, pathstage2 // đường đi thỏa mãn

let patha, pathb

let backstory = "   Cốt truyện: Ngày xưa từ thuở còn chưa có Yasuo có 1 chàng trai tên là Đông. Anh này hay đi comment dạo + sunsee nên đã đánh mất bản chất của 1 giáo sư kiêm triết học gia khủng lớp 9H. Cuộc sống sa đọa của anh kéo dài không lâu và đã kết thúc khi anh phải lòng 1 cô gái (chị Dung).\n\n   1 ngày nọ, anh lấy hết can đảm của cuộc đời ra hỏi cô: \"Em có thích 1 thằng khủng như anh không?\" Chị Dung said: \"Del, em không thích anh, em chỉ thích 1 thằng đẹp trai + nhà giàu\". Vì biết mình chỉ khủng mà del đẹp trai hay nhà giàu, Đông đã quyết định cướp ngân hàng để có tiền cưa gấu.\n\n   Bạn là bộ não \"khủng\" của Đông. Hãy dựa vào bản đồ để giúp giáo sư (màu đen) cướp ngân hàng, chinh phục được gấu. Biết rằng, Đông không thể đi qua tường (ô màu xám đậm) và không được gặp các ông bảo vệ kính đen (xanh lam nhạt) khi vào cướp và không được gặp các ông cảnh sát (xanh lá đậm) khi trốn ra." // cốt truyện

let tobecontinue = "   Sau khi có tiền cưa gái, anh Đông đã tìm đến chị Dung. Nhưng anh đã mất đi cơ hội đó vì Dung đã thích một người \"KHỦNG\" hơn cả anh. Đó là Mr. Phúc, 1 con người \"KHỦNG\" + quân tử nhà giàu. Đau buồn, anh Đông lấy tiền đi bar để uống để quên đi nỗi đau. Anh ngồi đó, đau buồn rũ rượi. Bạn, bộ não \"khủng\" của Đông, BỖNG DƯNG NGHĨ RA 1 Ý TƯỞNG......."

function setup() {
  createCanvas(550, 450);
  frameRate(60)
  img = loadImage("43629544_1931676900468408_4501794740378796032_n.jpg")
  button1 = createButton("PLAY A NEW GAME")
  button1.position(385, 100)
  button2 = createButton("INSTRUCTION")
  button2.position(400, 125)
  button3 = createButton("Triết lý")
  button3.position(0, 430)
  button1.mousePressed(createGame)
  button2.mousePressed(instructionIsOn)
  button3.mousePressed(imag)
}

function imag(){
  trietly = true
  buttonclicked = false
}

function instructionIsOn(){
  instruct = (instruct+1)%2
  page = (page+1)%2
}

function instruction(){
  
  // Đây là hướng dẫn
  
  push()
  noStroke()
  textSize(12)
  textAlign(CENTER)
  text("W - Đi lên\nA - Đi trái\nS - Đi xuống\nD - Đi phải", 400, 155, 100, 200)
  pop()
}

function createGame(){
  
  // tạo ra trò chơi mới
  
  time = 0
  
  someone = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ] // khởi tạo ban đầu
  
  check = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ] // khởi tạo ban đầu
  
  arr = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  ] // khởi tạo ban đầu
  
  pathstage2 = [] // khởi tạo ban đầu
  pathstage1 = [] // khởi tạo ban đầu
  
  ending = false;
  trietly = false;
  
  createPath(); // tạo 1 bản đồ ban đầu và giữ nguyên
  thief = new Thief() // tạo ra 1 tên trộm
  patha = new dfspath() // tìm 1 con đường thỏa mãn từ A đến B
  pathb = new dfspath() // tìm 1 con đường thỏa mãn từ B về A (2 đường khác nhau)
  flag = false
  patha.dfs(0, 6, 1) // tìm đường đầu thỏa mãn
  flag = false
  pathb.dfs(14, 6, 2) // tìm đường hai thỏa mãn
  createPeople() // tạo ra vị trí các bảo vệ và cảnh sát
  buttonclicked = true // biến để kiểm tra xem bắt đầu chơi chưa
  entered = false // xuất hiện cốt truyện trước
}

function buildStart(){ 
  
  // khởi tạo các ô vòng thứ 2 để xác định đường trong
  
  for(let i=1;i<=11;i++){
    if (check[i][2]===0)
      continue;
    else{
      check[i][2] = 0;
      if(arr[i-1][2]===1)
        arr[i][2] = 0
      else{
        let color = random(0, 2)
        if (color>=1)
          arr[i][2] = 0
        else
          arr[i][2] = 1
      }
    }
    if (check[i][12]===0)
      continue;
    else{
      check[i][12] = 0;
      if(arr[i-1][12]===1)
        arr[i][12] = 0
      else{
        let color = random(0, 2)
        if (color>=1)
          arr[i][12] = 0
        else
          arr[i][12] = 1
      }
    }
  }
  for(let i=2;i<=12;i++){
    if (check[1][i]===0)
      continue;
    else{
      check[1][i] = 0;
      if(arr[1][i-1]===1)
        arr[1][i] = 0
      else{
        let color = random(0, 2)
        if (color>=1)
          arr[1][i] = 0
        else
          arr[1][i] = 1
      }
    }
    if (check[11][i]===0)
      continue;
    else{
      check[11][i] = 0;
      if(arr[11][i-1]===1)
        arr[11][i] = 0
      else{
        let color = random(0, 2)
        if (color>=1)
          arr[11][i] = 0
        else
          arr[11][i] = 1
      }
    }
  }
}

function createPath(){ 
  
  //  tạo đường đi thỏa mãn
  
  let pathbroken = random(value) // biến khởi tạo tránh sự trùng lặp với các bản đồ chơi trước
  
  buildStart();
  let trick = 1;
  for(let i=2;i<=10;i++){
    for(let j=3;j<=11;j++){
      if(check[i][j+1]!==0){
        if(check[i+1][j]!==0){
          if((!arr[i-1][j]&&!arr[i][j-1])||(arr[i-1][j]&&arr[i][j-1]&&arr[i-1][j-1]))
            arr[i][j] = 0
          else{
            arr[i][j] = trick
            trick = (trick + 1)%pathbroken
          }
        }
        else{
          if(arr[i-1][j]&&arr[i][j-1]&&arr[i-1][j-1])
            arr[i][j] = 0
          else if(arr[i+1][j]&&arr[i][j-1]&&arr[i+1][j-1])
            arr[i][j] = 0
          else if(!arr[i-1][j]&&!arr[i][j-1]&&!arr[i+1][j])
            arr[i][j] = 0
          else{
            arr[i][j] = trick
            trick = (trick + 1)%pathbroken
          }
        }
      }
      else{
        if(check[i+1][j]!==0){
          if(arr[i-1][j]&&arr[i][j-1]&&arr[i-1][j-1])
            arr[i][j] = 0
          else if(arr[i][j+1]&&arr[i-1][j]&&arr[i-1][j+1])
            arr[i][j] = 0
          else if(!arr[i-1][j]&&!arr[i][j-1]&&!arr[i][j+1])
            arr[i][j] = 0
          else{
            arr[i][j] = trick
            trick = (trick + 1)%pathbroken
          }
        }
        else{
          if(!arr[i-1][j]&&!arr[i][j-1]&&!arr[i-1][j-1])
            arr[i][j] = 0
          else if(!arr[i+1][j]&&!arr[i][j-1]&&!arr[i+1][j-1])
            arr[i][j] = 0
          else if(!arr[i][j+1]&&!arr[i-1][j]&&!arr[i-1][j+1])
            arr[i][j] = 0
          else if(!arr[i+1][j]&&!arr[i][j+1]&&!arr[i+1][j+1])
            arr[i][j] = 0
          else if(!arr[i-1][j]&&!arr[i][j-1]&&!arr[i+1][j]&&!arr[i][j+1])
            arr[i][j] = 0
          else{
            arr[i][j] = trick
            trick = (trick + 1)%pathbroken
          }
        }
      }
      check[i][j] = 0
    }
  }
}

function keyPressed(){
  if(keyIsPressed&&!entered)
    entered = true
  else if(!thief.home){
    if(keyIsPressed)
      thief.update(key)
  }
  else
    ending = true; 
}


function draw() { 
  
  // biến vẽ liên tục
  background(220);
  if(trietly)
    image(img, 60, 200, 490, 250)
  else{
    push()
    fill(0)
    textAlign(CENTER)
    textSize(14)
    text("Chapter 1: Đông đi cướp", 450, 80)
    pop()
    
    if(buttonclicked){ //kiểm tra xem bắt đầu chưa
      if(ending){
        push()
        fill(0)
        textSize(16)
        text(tobecontinue, 32.5, 32.5, 330, 230)
        textSize(20)
        text("To Be Continue...", 160, 300)
        pop()
      }
      else if(entered){
        
        push()
          stroke("black")
          fill(90)
          square(32.5, 32.5, 335)
          fill(205)
          square(7.5+kc, 32.5+canh*6+kc, canh)
          square(32.5+canh*13+kc, 32.5+canh*6+kc, canh)
        pop()
        for(let i=0;i<=12;i++){
          for(let j=1;j<=13;j++){
            push()
              if(arr[i][j]===0){
                noStroke()
                fill(90)
              }
              else{
                stroke("black");
                fill(205)
              }
              square(32.5+canh*(j-1)+kc, 32.5+canh*i+kc, canh);
            pop()
            if(someone[i][j]===1){
              fill(0, 206, 209)
              circle(45+canh*(j-1)+kc, 45+canh*i+kc, bankinh);
              fill(130)
              rect(45+canh*(j-1)+kc+2, 45+canh*i+kc-5, 7.5, 5)
              rect(45+canh*(j-1)+kc-9.5, 45+canh*i+kc-5, 7.5, 5)
            }
            else if (someone[i][j]===2){
              fill(5, 77, 31)
              circle(45+canh*(j-1)+kc, 45+canh*i+kc, bankinh);
              fill(0)
              quad(32.5+canh*(j-1)+kc+5, 32.5+canh*i+kc, 32.5+canh*(j-1)+kc+20, 32.5+canh*i+kc, 32.5+canh*(j-1)+kc+18, 32.5+canh*i+kc+4, 32.5+canh*(j-1)+kc+7, 32.5+canh*i+kc+4) 
            }
          }
        }
      
        //đoạn trên là xây dựng bản đồ sau khi khởi tạo ngẫu nhiên
        push()
        thief.display() // hiển thi tên trộm
        pop()
        
        if (thief.home){ // kiểm tra xem tên trộm thắng chưa
          push()
            textSize(16)
            fill(0)
            text("Press ANY key to continue", 40, 400)
            textSize(20);
            fill(random(0, 256), random(0, 256), random(0, 256))
            text("ĐÔNG SẼ CÓ GẤU!!!", 420, 220, 50, 150)
          pop()
        }
      
        if (!thief.home)
          time++;
        
        push()
        fill(0)
        noStroke()
        text("Time: " + int(time/60) + "s", 385, 40)
        pop()
      }
      else{
        push()
        fill(0)
        text(backstory, 32.5, 32.5, 330, 330)
        text("Press ANY key to play", 140, 350)
        pop()
      }
    }
    if(instruct)
      instruction()
  }
}

function Thief(){ 
  
  // thông tin về thằng trộm
  
  this.posX = 0; // tọa độ xuất phát X
  this.posY = 6; // tọa độ xuất phát Y
  this.stage = 1; // khởi tạo lúc vào
  this.home = false; // kiểm tra xem thành công chưa
  
  this.display = function(){
    
    // hiển thị vị trí tên trộm trên bản đồ
    
    fill(255, 224, 189);
    circle(20+this.posX*canh+kc, 45+this.posY*canh+kc, bankinh);
    //if(
  };
  
  this.update = function(button){
    
    // cập nhật vị trí thằng trộm
    
    if(this.stage===1){ // lúc đi
      if(button==='a'){
        if(this.posX-1>=0&&arr[this.posY][this.posX-1]&&someone[this.posY][this.posX-1]!==1)
          this.posX--
      }
      else if(button==='s'){
        if(this.posY+1<=12&&arr[this.posY+1][this.posX]&&someone[this.posY+1][this.posX]!==1)
          this.posY++
      }
      else if(button==='w'){
        if(this.posY-1>=0&&arr[this.posY-1][this.posX]&&someone[this.posY-1][this.posX]!==1)
          this.posY--
      }
      else if(button==='d'){
        if(this.posX+1<=14&&arr[this.posY][this.posX+1]&&someone[this.posY][this.posX+1]!==1)
          this.posX++
      }
      
      // kiểm tra xem đi được không
    }
    
    else{ // lúc quay lại
      if(button==='a'){
        if(this.posX-1>=0&&arr[this.posY][this.posX-1]&&someone[this.posY][this.posX-1]!==2)
          this.posX--
      }
      else if(button==='s'){
        if(this.posY+1<=12&&arr[this.posY+1][this.posX]&&someone[this.posY+1][this.posX]!==2)
          this.posY++
      }
      else if(button==='w'){
        if(this.posY-1>=0&&arr[this.posY-1][this.posX]&&someone[this.posY-1][this.posX]!==2)
          this.posY--
      }
      else if(button==='d'){
        if(this.posX+1<=14&&arr[this.posY][this.posX+1]&&someone[this.posY][this.posX+1]!==2)
          this.posX++
      }
      
      // như lúc đi
    }
    
    // đoạn kiểm tra trạng thái sau mỗi bước đi
    if(this.posX===14&&this.posY===6&&this.stage===1)
      this.stage = 2  //trạng thái lúc quay về
    
    if(this.posX===0&&this.posY===6&&this.stage===2)
      this.home = true; // chứng tỏ đã thắng trò chơi
  }
}

function createPeople(){
  
  // tạo ra các vị trí cho cảnh sát và bảo vệ đeo kính râm
  
  for(let i=0;i<20;i++){ // đoạn tạo ra các nhân viên bảo vệ
    flag = true
    let x=0, y=0
    while(arr[y][x]===0){
      x = int(random(random(1, 2), random(13, 14)))
      y = int(random(random(0, 1), random(12, 13)))
    }
    for(let j=0;j<pathstage1.length;j++){
      // kiểm tra xem vị trí đó có nằm trên đường thỏa mãn tạo ra ban đầu không
      if (pathstage1[j][0]===y&&pathstage1[j][1]===x){
        flag = false;
        break;
      }
    }
    
    if(flag&&someone[y][x]===0) // kiểm tra vị trí đã có người chưa
      someone[y][x] = 1;
    else
      i-- // chạy đến khi thỏa mãn vị trí thì thôi
  }
  
  for(let i=0;i<20;i++){ // tương tự nhưng với cảnh sát
    flag = true
    let x=0, y=0
    while(arr[y][x]===0){
      x = int(random(random(1, 2), random(13, 14)))
      y = int(random(random(0, 1), random(12, 13)))
    }
    
    for(let j=0;j<pathstage2.length;j++){
      if (pathstage2[j][0]===y&&pathstage2[j][1]===x){
        flag = false;
        break;
      }
    }
    
    if(flag&&someone[y][x]===0)
      someone[y][x] = 2;
    else
      i--
  }
  
  //someone[y][x] = 1 hoặc 2 để phân biệt đâu là cảnh sát còn đâu là nhân viên bảo vệ
}

function dfspath(){
  
  // tạo ra đường đi thỏa mãn khi đi và khi về (2 đường khác nhau)
  // P.S: có thể giống nhau nhưng tỉ lệ thấp
  // đơn giản thì đây là DFS(Depth First Search) đường đi
  
  this.dfs = function(dx, dy, stage){// stage để phân biệt đang xét đường nào
    
    if(dx===14&&dy===6&&stage===1){
      flag = true // đánh dấu là tìm thấy đường thỏa mãn
      return
    }
      
    if(dx===0&&dy===6&&stage===2){
      flag = true // giống như trên nhưng với đường quay về
      return
    }

    check[dy][dx] = 1; // đánh dấu là đã đi qua

    if (stage===1) // cho từng đường, giả sử vị trí này thỏa mãn
      pathstage1.push([dy, dx])
    else
      pathstage2.push([dy, dx])
    
    // đoạn tiếp theo kiểm tra từng đường(lên, xuống, phải, trái)

    if(dx+1<15&&arr[dy][dx+1]&&!check[dy][dx+1]){
      this.dfs(dx+1,dy, stage)
      if (flag){
        check[dy][dx] = 0;
        return
      }
    }

    if(dy+1<13&&arr[dy+1][dx]&&!check[dy+1][dx]){
      this.dfs(dx,dy+1, stage)
      if (flag){
        check[dy][dx] = 0;
        return
      }
    }

    if(dy-1>-1&&arr[dy-1][dx]&&!check[dy-1][dx]){
      this.dfs(dx,dy-1, stage)
      if (flag){
        check[dy][dx] = 0;
        return
      }
    }

    if(dx-1>-1&&arr[dy][dx-1]&&!check[dy][dx-1]){
      this.dfs(dx-1,dy, stage)
      if (flag){
        check[dy][dx] = 0;
        return
      }
    }

    if (stage===1) // cho từng đường, nếu vị trí không thỏa mãn thì bỏ ra
      pathstage1.pop()
    else
      pathstage2.pop()
  }
  // các đoạn if(flag) là đoạn kiểm tra đường này tạo được đường thỏa mãn không
  // các đoạn check[dy][dx] = 0; là để cho pathstage2 tìm đường sau khi tìm được pathstage1
}
