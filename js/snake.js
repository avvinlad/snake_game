function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.trail = [];
  this.tail = 0;

  this.draw = function () {
    ctx.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.tail; i++){
      ctx.fillRect(this.trail[i].x, this.trail[i].y, scale, scale);
    }
    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function () {
    for (let i = 0; i < this.trail.length-1; i++){
      this.trail[i] = this.trail[i+1];
    }

    this.trail[this.tail - 1] = { x: this.x, y: this.y };

    this.x += this.xspeed;
    this.y += this.yspeed;

    gameOver = false;
    if (this.x > canvas.width) { gameOver = true; } 
    else if (this.x < 0) { gameOver = true; }
    if (this.y > canvas.height) { gameOver = true; } 
    else if (this.y < 0) { gameOver = true; }

    if (gameOver == true) {
      window.alert("Game Over!\nYour score was: " + this.tail);
      this.reset();
    }
  };

  this.changeDir = function (dir) {
    if (dir == "Up") {
      this.xspeed = 0;
      this.yspeed = scale * -1;
    } 
    else if (dir == "Down") {
      this.xspeed = 0;
      this.yspeed = scale * 1;
    } 
    else if (dir == "Left") {
      this.xspeed = scale * -1;
      this.yspeed = 0;
    } 
    else if (dir == "Right") {
      this.xspeed = scale * 1;
      this.yspeed = 0;
    }
  };

  this.eat = function(posx, posy) {
    if (this.x == posx && this.y == posy){
      this.tail++;
      score = document.getElementById("score");
      score.innerHTML = "{Score}: " + this.tail;
      return true;
    }
    return false;
  }

  this.collision = function() {
    for (let i = 0; i < this.trail.length; i++){
      if (this.x == this.trail[i].x && this.y == this.trail[i].y){
        window.alert("Game Over!\nYour score was: " + this.tail);
        this.reset();
      }
    }
  }

  this.reset = function() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.trail = [];
    this.tail = 0;
    score = document.getElementById("score");
    score.innerHTML = "{Score}: 0";
  }

}
