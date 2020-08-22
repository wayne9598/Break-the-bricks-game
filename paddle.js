export default class Paddle {

    constructor(game){
        this.gameWidth = game.gameWidth
        this.width = 120;
        this.height = 20;
        this.speed = 0;
        this.maxSpeed = 10;
        

        this.position = {
            x: (game.gameWidth - this.width)/2,
            y: game.gameHeight - this.height - 10
            
        };
    }

    draw(context){
        context.fillStyle = '#000';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    update(deltaTime){

        // if (!deltaTime) return;
        this.position.x += this.speed ;
        if (this.position.x > this.gameWidth - this.width){
            this.position.x = this.gameWidth - this.width
        }else if(this.position.x < 0) {
            this.position.x = 0
        }

    }

    moveLeft(){

        this.speed = -this.maxSpeed;

    }

    moveRight(){

        this.speed = this.maxSpeed;
    }
    
    stop(){

        this.speed = 0;
    }

}