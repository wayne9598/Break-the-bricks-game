import { detectCollision } from '/collisionDetection.js';

export default class Brick {

    constructor(game, position){
        this.image = document.getElementById('img_brick');
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game
        this.width = 80;
        this.height = 40;
        this.speed = 0;
        this.position = position;

        this.markedForDeletion = false;

    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        if(detectCollision(this.game.ball, this)){
            this.game.ball.speed.y *= -1; 
            // this.game.ball.position.y = this.position.y + this.height;        
            this.markedForDeletion = true;
        }
    }

    disappear(context) {
        // context.clearRect(this.position.x,this.position.y,this.width,this.height);
        context.clearRect(0,0,this.gameWidth, this.game);

    }

}