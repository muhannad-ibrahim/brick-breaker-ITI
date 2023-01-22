const canvas = document.getElementById("breakOutGame");
const ctx = canvas.getContext("2d");
const PADDLE_WIDTH = 90;
const PADDLE_HEIGHT = 20;
const MARGIN_BOTTOM = 40;
const PADDLE_dX = 3;
const BALL_RADIUS = 10;
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
}

function update(){
    movePaddle();
    if(enterKey){
        moveBall();
    }
    ballWallCollision();
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();