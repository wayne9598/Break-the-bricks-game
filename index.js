// import Paddle from '/paddle.js'
// import InputHandler from '/input.js'
// import Ball from '/ball.js'
import Game from '/game.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let gameWidth = 800;
let gameHeight = 600;

let game = new Game(gameWidth, gameHeight);

let lastTime = 0;


function gameLoop(timestamp){
    let deltaTime =  timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0,0,gameWidth,gameHeight);
    game.update(deltaTime, context);
    game.draw(context);

    requestAnimationFrame(gameLoop)

}

requestAnimationFrame(gameLoop);
