import { detectCollision } from './collisionDetection.js';


export default class Ball {

    constructor(game){
        this.image= document.getElementById('img_ball');
        this.radius = 16;
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;

        this.game = game;
        this.reset();
        
        }
    

    reset() {
        this.position = { 
            x: this.game.paddle.position.x + 0.5* this.game.paddle.width,
            y: this.game.paddle.position.y,
        }
        this.speed = {
            x: 10,
            y: -10,
        }
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.radius, this.radius);
 
    }

    // gameover(){
    //     if(this.position.y >= this.gameHeight){
    //         return true;

    //     }else {
    //         return false;
    //     }
    // }

    update(deltaTime){
        this.position.y += this.speed.y;   
        this.position.x += this.speed.x;   

        //upper boundary
        if(this.position.y <= 0){ 
            this.speed.y *= -1;
        } 
        //side boundaries
        if(this.position.x <= 0 || this.position.x + this.radius >= this.gameWidth){
            this.speed.x *= -1;
        } 

        //bot boundry
        if (this.position.y >= this.gameHeight){
            this.game.lives --;
            this.reset();
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y *= -1;
            this.position.y = this.game.paddle.position.y - this.radius;
        } 
         
        if(this.game.paddle.speed < 0 && this.speed.x > 0 && detectCollision(this, this.game.paddle)){
                this.speed.x *= -1;
        }

        if(this.game.paddle.speed > 0 && this.speed.x < 0 && detectCollision(this, this.game.paddle)){
            this.speed.x *= -1;
        }
    } 


}