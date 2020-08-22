export function detectCollision(ball, gameObject) {

    let bottomOfBall = ball.position.y + ball.radius;
    let topOfBall = ball.position.y;
    let leftOfBall = ball.position.x;
    let rightOfBall = ball.position.x + ball.radius;

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;
    let leftOfObject = gameObject.position.x;
    let rightOfObject = gameObject.position.x + gameObject.width;
    
    if (bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        leftOfObject <= leftOfBall &&
        rightOfBall <= rightOfObject 
        ) {
        return true;
    } 
}