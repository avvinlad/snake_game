const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const scale = 25;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

var snake; 
var apple;

var game;
var gameSpeed = 120;
var slow = 150, normal = gameSpeed, fast = 90;

(function setup() {
  snake = new Snake();
  apple = new Apple();

  apple.pickLocation();

  start();
})();

function start(){
  game = window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    apple.draw();
    snake.update();
    snake.draw();
    if (snake.eat(apple.x, apple.y)){
      apple.pickLocation();
    }
    snake.collision();
    win();
  }, gameSpeed);
}

window.addEventListener("keydown", (evt) => {
  if([32, 37, 38, 39, 40].indexOf(evt.keyCode) != -1) {
    evt.preventDefault();
    const dir = evt.key.replace("Arrow", "");
    snake.changeDir(dir);
  }
});

function changeSpeed(speed, id) {
  if (speed != gameSpeed){
    var result = confirm("Are you sure you would like to change the speed?\nThis will reset the game.");
    if (result){
      gameSpeed = speed;
      snake.reset();
      clearInterval(game);
      document.getElementById(id).focus();
      start();
    }
    else{

    }
  }
}

function win(){
  if (snake.tail == (rows*cols)){
    clearInterval(game);
    var again = window.confirm("You Won!\nPlay Again?");
    if (again){
      snake.reset();
      gameSpeed = normal;
      document.getElementById("normal").focus();
      start();
    }
  }
}


