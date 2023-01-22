/*const canvas = document.getElementById("breakOutGame");
const ctx = canvas.getContext("2d");
const PADDLE_WIDTH = 90;
const PADDLE_HEIGHT = 20;
const MARGIN_BOTTOM = 40;
const PADDLE_dX = 3;
const BALL_dX = 3;
const BALL_dY = -3;
const BALL_RADIUS = 10;
const SPEED_PER_UNIT_TIME = 5;
let rightKey = false;
let leftKey = false;
let enterKey = false;
let BallMoved = false;
let LIFE = 3;
const img = new Image();
img.src = "/media/BG.jpg";

document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);
const brick = {

    width   :55,
    height  :20,
 offsettop  :20,
 margintop  :40,
 offsetleft :20,
 rows        :4,
 cols       :5

}

var bricks = [] ;





function createBrikersHandler (){
     let color;
 for(i=0 ; i<brick.rows ; i++){
   bricks[i] =[]

    for(j=0; j<brick.cols ; j++){
        if(i==0){
          color = "blue"
        }
        else if( i==1){
            color="green"
        }
        else if(i==2){
         color="yellow"   
        }
        else{
            color="red"    
        } 

        
        let  x = j * (brick.offsetleft+brick.width)+brick.offsetleft;
        
        let  y = i * (brick.offsettop+brick.height)+brick.margintop+brick.offsettop
           bricks[i][j] = { xpos:x,
            ypos:y,
            status:0,
            color:color
        }
    }
 }
}

function ballPaddleCollision() {
    if (ball.y > paddle.y && ball.y < paddle.y + paddle.height &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            let collisionPointGradient = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            let collisionAngle = collisionPointGradient * Math.PI / 3; 
            ball.dx = ball.speed * Math.sin(collisionAngle);
            ball.dy = -ball.speed * Math.cos(collisionAngle);
        }
}

function drawbricks(){
    
    for(i=0 ; i<brick.rows ; i++){
        for(j=0; j<brick.cols ; j++){

        if(bricks[i][j].status<2){

            if(bricks[i][j].status==1){
                    bricks[i][j].color= "lightgray"
                    }

                    ctx.beginPath();
                    ctx.fillStyle = bricks[i][j].color;
                
                    ctx.lineWidth = "3"
                    ctx.strokeStyle="white" 
                    ctx.strokeRect(bricks[i][j].xpos,bricks[i][j].ypos,brick.width,brick.height)
                    ctx.fillRect(bricks[i][j].xpos,bricks[i][j].ypos,brick.width,brick.height)  
            }
    

    }
   
}}






const paddle = {
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    x: (canvas.width - PADDLE_WIDTH) / 2,
    y: canvas.height - PADDLE_HEIGHT - MARGIN_BOTTOM,
    dx: PADDLE_dX
};

const ball = {
    r: BALL_RADIUS,
    x: canvas.width / 2,
    y: paddle.y - BALL_RADIUS,
    dx: 3,
    dy: -3,
};

function drawPaddle() {
    ctx.fillStyle = "black";
    ctx.lineWidth = "3"
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "yellow"
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
};

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.lineWidth = "3"
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
};

function resetBall(){
    ball.x = canvas.width / 2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random()*2 -1);
    ball.dy = -3;
}

function moveBall(){
    BallMoved = true;
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function ballWallCollision(){
    if(ball.x + ball.r > canvas.width || ball.x - ball.r < 0){
        ball.dx = - ball.dx;
    }
    else if(ball.y - ball.r < 0){
        ball.dy = -ball.dy;
    }
    else if(ball.y + ball.r > canvas.height){
        LIFE--;
        resetBall();
    }
};


function movePaddle() {
    if (rightKey && paddle.x + paddle.width < canvas.width && !BallMoved) {
        paddle.x += paddle.dx;
        ball.x += paddle.dx;
    } else if (leftKey && paddle.x > 0 && !BallMoved) {
        paddle.x -= paddle.dx;
        ball.x -= paddle.dx;
    }
    if (rightKey && paddle.x + paddle.width < canvas.width && BallMoved) {
        paddle.x += paddle.dx;
    } else if (leftKey && paddle.x > 0 && BallMoved) {
        paddle.x -= paddle.dx;
    }
};

function keydownHandler(event) {
    if(event.keyCode === 13){
        enterKey = true;
    }
    if (event.keyCode === 39) {
        rightKey = true;
    } else if (event.keyCode === 37) {
        leftKey = true;
    }
};

function keyupHandler(event) {
    if (event.keyCode === 39) {
        rightKey = false;
    } else if (event.keyCode === 37) {
        leftKey = false;
    }
};

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 400, 500);
    drawPaddle();
    drawBall();
    createBrikersHandler ()
    drawbricks()

}

function update(){
    movePaddle();
    if(enterKey){
        moveBall();
    }
    ballWallCollision();
    ballPaddleCollision();
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();*/

const canvas = document.getElementById("breakOutGame");
const ctx = canvas.getContext("2d");
const PADDLE_WIDTH = 90;
const PADDLE_HEIGHT = 20;
const MARGIN_BOTTOM = 40;
const PADDLE_dX = 3;
const BALL_dX = 3;
const BALL_dY = -3;
const BALL_RADIUS = 10;
const SPEED_PER_UNIT_TIME = 5;
let rightKey = false;
let leftKey = false;
let enterKey = false;
let BallMoved = false;
let LIFE = 3;
const img = new Image();
img.src = "/media/BG.jpg";


document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);

const paddle = {
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    x: (canvas.width - PADDLE_WIDTH) / 2,
    y: canvas.height - PADDLE_HEIGHT - MARGIN_BOTTOM,
    dx: PADDLE_dX
};

const ball = {
    r: BALL_RADIUS,
    x: canvas.width / 2,
    y: paddle.y - BALL_RADIUS,
    dx: BALL_dX,
    dy: BALL_dY,
    speed: SPEED_PER_UNIT_TIME
};

function drawPaddle() {
    ctx.fillStyle = "black";
    ctx.lineWidth = "3"
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "yellow"
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.lineWidth = "3"
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function resetBall(){
    ball.x = canvas.width / 2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random()*2 -1);
    ball.dy = -3;
}

function moveBall(){
    BallMoved = true;
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function ballWallCollision(){
    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0){
        ball.dx = - ball.dx;
    }
    else if (ball.y - ball.r < 0){
        ball.dy = -ball.dy;
    }
    else if (ball.y + ball.r > canvas.height){
        LIFE--;
        resetBall();
    }
}

function ballPaddleCollision() {
    if (ball.y > paddle.y && ball.y < paddle.y + paddle.height &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            let collisionPointGradient = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            let collisionAngle = collisionPointGradient * Math.PI / 3; 
            ball.dx = ball.speed * Math.sin(collisionAngle);
            ball.dy = -ball.speed * Math.cos(collisionAngle);
        }
}


function movePaddle() {
    if (rightKey && paddle.x + paddle.width < canvas.width && !BallMoved) {
        paddle.x += paddle.dx;
        ball.x += paddle.dx;
    } else if (leftKey && paddle.x > 0 && !BallMoved) {
        paddle.x -= paddle.dx;
        ball.x -= paddle.dx;
    }
    if (rightKey && paddle.x + paddle.width < canvas.width && BallMoved) {
        paddle.x += paddle.dx;
    } else if (leftKey && paddle.x > 0 && BallMoved) {
        paddle.x -= paddle.dx;
    }
}

function keydownHandler(event) {
    if(event.keyCode === 13){
        enterKey = true;
    }
    if (event.keyCode === 39) {
        rightKey = true;
    } else if (event.keyCode === 37) {
        leftKey = true;
    }
}

var bricks = [] ;
const brick = {

    width   :55,
    height  :20,
 offsettop  :20,
 margintop  :40,
 offsetleft :20,
 rows        :4,
 cols       :5

}

function createBrikersHandler (){
     let color;
 for(i=0 ; i<brick.rows ; i++){
   bricks[i] =[]

    for(j=0; j<brick.cols ; j++){
        if(i==0){
          color = "blue"
        }
        else if( i==1){
            color="green"
        }
        else if(i==2){
         color="yellow"   
        }
        else{
            color="red"    
        } 

        
        let  x = j * (brick.offsetleft+brick.width)+brick.offsetleft;
        
        let  y = i * (brick.offsettop+brick.height)+brick.margintop+brick.offsettop
           bricks[i][j] = { xpos:x,
            ypos:y,
            status:0,
            color:color
        }
    }
 }
}


function drawbricks(){
    
    for(i=0 ; i<brick.rows ; i++){
        for(j=0; j<brick.cols ; j++){

        if(bricks[i][j].status<2){

            if(bricks[i][j].status==1){
                    bricks[i][j].color= "lightgray"
                    }

                    ctx.beginPath();
                    ctx.fillStyle = bricks[i][j].color;
                
                    ctx.lineWidth = "3"
                    ctx.strokeStyle="white" 
                    ctx.strokeRect(bricks[i][j].xpos,bricks[i][j].ypos,brick.width,brick.height)
                    ctx.fillRect(bricks[i][j].xpos,bricks[i][j].ypos,brick.width,brick.height)  
            }
    

    }
   
}}


function keyupHandler(event) {
    if (event.keyCode === 39) {
        rightKey = false;
    } else if (event.keyCode === 37) {
        leftKey = false;
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 400, 500);
    drawPaddle();
    drawBall();
    createBrikersHandler ()
    drawbricks()
}

function update(){
    movePaddle();
    if(enterKey){
        moveBall();
    }
    ballWallCollision();
    ballPaddleCollision();
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();