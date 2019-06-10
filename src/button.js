class Button {
    constructor(val = 0) {
        this.value = val;
    }

    drawButtonText(positionX, positionY, width, height, txtSize, positionTextX, positionTextY, txt = this.value) {
        this.x = positionX;
        this.y = positionY;
        this.w = width;
        this.h = height;
        rect(this.x, this.y, this.w, this.h);
        push();
        textSize(txtSize)
        text(this.value, positionTextX, positionTextY);
        pop();
    }

    drawButtonPic(positionX, positionY, pic, width, height) {
        this.x = positionX;
        this.y = positionY;
        this.w = width;
        this.h = height
        image(this.x, this.y, pic, this.w, this.h);
    }

    isClicked() {
        if(mouseIsPressed && mouseX >= this.x && mouseY >= this.y && mouseX <= this.x + this.w && mouseY <= this.y + this.h) {
            console.log('mouse_clicked');
            return true;
        }
        else return false;
    }
}