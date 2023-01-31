const paddle = {
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    x: (canvas.width - PADDLE_WIDTH) / 2,
    y: canvas.height - PADDLE_HEIGHT - MARGIN_BOTTOM,
    dx: PADDLE_dX,
};

function drawPaddle() {
    ctx.fillStyle = stickyBall ? "blue" : "black";
    ctx.lineWidth = "2";
    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 50);
    ctx.strokeStyle = stickyBall ? "blue" : "white";
    ctx.fill();
}

function movePaddle() {
    if (rightKey && paddle.x + paddle.width < canvas.width - 5 && !BallMoved) {
      paddle.x += paddle.dx;
      ball.x += paddle.dx;
    } else if (leftKey && paddle.x > 5 && !BallMoved) {
      paddle.x -= paddle.dx;
      ball.x -= paddle.dx;
    }
    if (rightKey && paddle.x + paddle.width < canvas.width - 5 && BallMoved) {
      paddle.x += paddle.dx;
    } else if (leftKey && paddle.x > 5 && BallMoved) {
      paddle.x -= paddle.dx;
    }
}