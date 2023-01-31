let ball = {
    r: BALL_RADIUS,
    x: canvas.width / 2,
    y: paddle.y - BALL_RADIUS,
    dx: BALL_dX,
    dy: BALL_dY,
    speed: SPEED_PER_UNIT_TIME,
  };

  function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = superBallPUP ? "yellow" : "red";
    ctx.lineWidth = "3";
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
  }

  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
  
    paddle.x = (canvas.width - PADDLE_WIDTH) / 2;
    paddle.y = canvas.height - PADDLE_HEIGHT - MARGIN_BOTTOM;
    paddle.dx = PADDLE_dX;
  
    enterKey = false;
    BallMoved = false;
  }

  function moveBall() {
    BallMoved = true;
    ball.x += ball.dx;
    ball.y += ball.dy;
  }

  