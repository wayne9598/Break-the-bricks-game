import Paddle from '/paddle.js'
import InputHandler from '/input.js'
import Ball from '/ball.js'
import Brick from '/brick.js'
import {buildLevel, level1, level2, level3, level4, level5} from '/level.js'
import { detectCollision } from './collisionDetection.js'

const GAMESTATE = {
     PAUSED : 0,
     RUNNING : 1,
     MENU : 2,
     GAMEOVER : 3, 
     NEWLEVEL: 4,

}

export default class Game {

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.lives = 3; 
        this.gameObject = [];
        this.bricks = [];
        this.levels = [level1, level2, level3];
        this.currentLevel = 0;
        this.score = 0;
        new InputHandler(this.paddle, this); 

    }


    start(){
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
        this.bricks = buildLevel(this.levels[this.currentLevel], this);
        this.gameObject = [this.ball, this.paddle,];
        this.gamestate = GAMESTATE.RUNNING; 
    }

    update(deltaTime, context) {
        console.log(this.gamestate);

        if(this.gamestate == GAMESTATE.PAUSED || this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.GAMEOVER) {
            return;
        }

        [...this.gameObject, ...this.bricks].forEach((object) => object.update(deltaTime))

        this.bricks.forEach((brick) => {
            if(detectCollision(this.ball, brick)) {
                this.score ++;
            }
        })

        this.bricks = this.bricks.filter(object => !object.markedForDeletion);

        if (this.bricks.length == 0) {
            // load new level!
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.currentLevel ++;
            this.start();
        }

        if(this.lives == 0){
            console.log('score = ' + this.score);
            this.score = 0;
            this.lives = 3;
            this.currentLevel = 0; 
            this.paddle = new Paddle(this);
            this.ball = new Ball(this);
            this.ball.reset();
            let bricks = buildLevel(level1, this);
            this.gameObject = [this.ball, this.paddle, ...bricks,]; 
            new InputHandler(this.paddle, this);
            this.gamestate = GAMESTATE.GAMEOVER;

        }
    }

    draw(context) {

        [...this.gameObject, ...this.bricks].forEach(
            (object) => object.draw(context));   
                
        if(this.gamestate == GAMESTATE.PAUSED) {
            context.rect(0,0,this.gameWidth, this.gameHeight);
            context.fillStyle = 'rgba(0,0,0,0.5)';
            context.fill();

            context.font = '30px Arial';
            context.fillStyle = 'white'; 
            context.textAlign = 'center';
            context.fillText('Paused', this.gameWidth/2, this.gameHeight /2);
        }

        if(this.gamestate == GAMESTATE.MENU) {
            context.rect(0,0,this.gameWidth, this.gameHeight);
            context.fillStyle = 'rgba(0,0,0,0.2)';
            context.fill();

            context.font = '30px Arial';
            context.fillStyle = 'black'; 
            context.textAlign = 'center';
            context.fillText('Press to Play', this.gameWidth/2, this.gameHeight /2);

        }

        if(this.gamestate == GAMESTATE.GAMEOVER) {
            context.rect(0,0,this.gameWidth, this.gameHeight);
            context.fillStyle = 'rgba(0,0,0,0.9)';
            context.fill();

            context.font = '30px Arial';
            context.fillStyle = 'white'; 
            context.textAlign = 'center';
            context.fillText('GAMEOVER', this.gameWidth/2, this.gameHeight /2);

        }

        if(this.gamestate == GAMESTATE.RUNNING) {
            context.font = '20px Arial';
            context.fillStyle = 'black';
            context.textAlign = 'center'; 
            context.fillText('Score: '+ this.score, this.gameWidth/1.1 , 20);

        }

    }

    togglePause() {
        if (this.gamestate === GAMESTATE.RUNNING) {
            this.gamestate = GAMESTATE.PAUSED;
        }else if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        }
    }

    // startGame() {
    //     if (this.gamestate === GAMESTATE.MENU) {
    //         this.start();
    //     }else if (this.gamestate === GAMESTATE.GAMEOVER) {
    //         this.gamestate = GAMESTATE.MENU;
    //     }
    // }
}    