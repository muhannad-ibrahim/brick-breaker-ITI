const canvas = document.getElementById("breakOutGame");
const ctx = canvas.getContext("2d");
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 20;
const MARGIN_BOTTOM = 40;
const PADDLE_dX = 5;
const BALL_RADIUS = 10;
let rightKey = false;
let leftKey = false;

const img = new Image();
img.src = "/media/BG.jpg";

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
    y: paddle.y - BALL_RADIUS
    // dx: PADDLE_dX
};

const drawPaddle = function() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.lineWidth = "3"
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fill();
    ctx.stroke();
};

const drawBall = function() {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.lineWidth = "3"
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};

const movePaddle = function() {
    if (rightKey && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.dx;
        ball.x += paddle.dx;
    } else if (leftKey && paddle.x > 0) {
        paddle.x -= paddle.dx;
        ball.x -= paddle.dx;
    }
    drawPaddle();
    drawBall();
};

const keydownHandler = function(event) {
    if (event.keyCode === 39) {
        rightKey = true;
    } else if (event.keyCode === 37) {
        leftKey = true;
    }
    movePaddle();
};

const keyupHandler = function(event) {
    if (event.keyCode === 39) {
        rightKey = false;
    } else if (event.keyCode === 37) {
        leftKey = false;
    }
    movePaddle();
};

document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, 400, 500);
    drawPaddle();
    drawBall();
    requestAnimationFrame(loop);
}
loop();