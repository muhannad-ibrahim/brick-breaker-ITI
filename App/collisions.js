function ballWallCollision() {
    if (ball.x + ball.r > canvas.width - 1 || ball.x - ball.r < 1) {
      ball.dx = -ball.dx;
      wall.play();
    } else if (ball.y - ball.r < 0) {
      ball.dy = -ball.dy;
      wall.play();
    } else if (ball.y + ball.r > canvas.height) {
      life--;
      resetBall();
      resetPUPs();
    }
  }
  
  function ballPaddleCollision() {
    if (
      ball.y + ball.r > paddle.y &&
      ball.y - ball.r < paddle.y + paddle.height &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      let collisionPointGradient =
        (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
      let collisionAngle = (collisionPointGradient * Math.PI) / 3;
      if (stickyBall) {
        enterKey = false;
        BallMoved = false;
      }
      ball.dx = ball.speed * Math.sin(collisionAngle);
      ball.dy = -ball.speed * Math.cos(collisionAngle);
    }
  }
  
  function powerUpsPaddleCollision() {
    for (let i = 0; i < powerUps.length; i++) {
      if (
        powerUps[i].x + powerUps[i].width / 2 > paddle.x &&
        powerUps[i].x - powerUps[i].width / 2 < paddle.x + paddle.width &&
        powerUps[i].y + powerUps[i].height / 2 > paddle.y &&
        powerUps[i].y - powerUps[i].height / 2 < paddle.y + paddle.height
      ) {
        switch (powerUps[i].type) {
          case PowerUpTypes.extendWidthPUP:
            if (extendWidthPUP > 0) {
              extendWidthPUP--;
              shrinkWidthPdown++;
              paddle.width *= 1.25;
            }
            break;
          case PowerUpTypes.shrinkWidthPdown:
            if (shrinkWidthPdown > 0) {
              shrinkWidthPdown--;
              extendWidthPUP++;
              paddle.width /= 1.25;
            }
            break;
          case PowerUpTypes.increaseLife:
            life++;
            break;
          case PowerUpTypes.decreaseLife:
            life--;
            break;
          case PowerUpTypes.superBall:
            superBallPUP = true;
            break;
          case PowerUpTypes.stickyBall:
            stickyBall = true;
            break;
        }
        powerUps.splice(i, 1);
      }
    }
  }