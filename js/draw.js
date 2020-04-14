const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

var snake; 
var apple;

var game;
var gameSpeed = 120;
var slow = 150, normal = 120, fast = 90;

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
  }, gameSpeed);
}

window.addEventListener("keydown", (evt) => {
  // disable arrow key scrolling
  if([32, 37, 38, 39, 40].indexOf(evt.keyCode) != -1) {
    evt.preventDefault();
  }

  const dir = evt.key.replace("Arrow", "");
  snake.changeDir(dir);
});

function changeSpeed(speed, id) {
  if (speed != gameSpeed){
    var result = confirm("Are you sure you would like to change the speed?\nThis will reset the game.");
    if (result){
      gameSpeed = speed;
      snake.reset();
      clearInterval(game);
      document.getElementById(id).classList.add("activeButton");
      start();
    }
  }
}


