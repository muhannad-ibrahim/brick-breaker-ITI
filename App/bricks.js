const brick = {
    width: 66,
    height: 20,
    offsettop: 30,
    margintop: 50,
    offsetleft: 20,
    rows: 1,
    cols: 9,
  };
  
function createBrikersHandler() {
    let color;
    for (let i = 0; i < brick.rows; i++) {
        bricks[i] = [];
        for (let j = 0; j < brick.cols; j++) {
        if (i == 0) {
            color = `rgba(0,0,255,1)`;
        } else if (i == 1) {
            color = `rgba(100,255,190,1)`;
        } else if (i == 2) {
            color = `rgba(255,255,0,1)`;
        } else {
            color = `rgba(255,0,0,1)`;
        }

        let x = j * (brick.offsetleft + brick.width) + brick.offsetleft;
        let y = i * (brick.offsettop + brick.height) + brick.margintop + brick.offsettop;
        bricks[i][j] = {
            xpos: x,
            ypos: y,
            status: 2,
            color: color
        };
        }
    }
}

function drawbricks() {
    for (i = 0; i < brick.rows; i++) {
      for (j = 0; j < brick.cols; j++) {
        if (bricks[i][j].status >= 1 || bricks[i][j].status == "solid") {
          if (bricks[i][j].status == 1) {
            bricks[i][j].color = `#FFC3A1`;
          }
          if (bricks[i][j].status == "solid") {
            bricks[i][j].color = "black";
          }
          ctx.beginPath();
          ctx.fillStyle = bricks[i][j].color;
          ctx.lineWidth = "3";
          ctx.strokeStyle = "white";
          ctx.strokeRect(
            bricks[i][j].xpos,
            bricks[i][j].ypos,
            brick.width,
            brick.height
          );
          ctx.fillRect(
            bricks[i][j].xpos,
            bricks[i][j].ypos,
            brick.width,
            brick.height
          );
        }
      }
    }
}

function ballBrickCollision() {
    for (i = 0; i < brick.rows; i++) {
      for (j = 0; j < brick.cols; j++) {
        if (bricks[i][j].status == "solid") {
          if (
            ball.x + ball.r > bricks[i][j].xpos &&
            ball.x - ball.r < bricks[i][j].xpos + brick.width &&
            ball.y + ball.r > bricks[i][j].ypos &&
            ball.y - ball.r < bricks[i][j].ypos + brick.height
          ) {
            brick_hit.play();
            ball.dy = -ball.dy;
          }
        }
        if (bricks[i][j].status >= 1 && bricks[i][j].status != "solid") {
          if (
            ball.x + ball.r > bricks[i][j].xpos &&
            ball.x - ball.r < bricks[i][j].xpos + brick.width &&
            ball.y + ball.r > bricks[i][j].ypos &&
            ball.y - ball.r < bricks[i][j].ypos + brick.height
          ) {
            brick_hit.play();
            if (Math.random() < POWERUP_PROBABILITY) {
              var pupX = bricks[i][j].xpos + brick.width / 2;
              var pupY = bricks[i][j].ypos + brick.height / 2;
              var pupSize = brick.width / 2;
              var pupType = Object.keys(PowerUpTypes);
              var pupSelected =
                pupType[Math.floor(Math.random() * pupType.length)];
              powerUps.push(
                new PowerUp(pupX, pupY, pupSize, PowerUpTypes[pupSelected])
              );
            }
            if (bricks[i][j].status != "solid") {
              if (superBallPUP) {
                bricks[i][j].status = 0;
                Score += 10;
              } else {
                bricks[i][j].status = bricks[i][j].status - 1;
                Score += 5;
                ball.dy = -ball.dy;
              }
            }
          }
        }
      }
    }
    drawbricks();
  }