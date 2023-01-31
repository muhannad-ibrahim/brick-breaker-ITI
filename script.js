scoreEle.classList.add("hidden");
highscoreEle.classList.add("hidden");
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

const brick = {
  width: 66,
  height: 20,
  offsettop: 30,
  margintop: 50,
  offsetleft: 20,
  rows: 1,
  cols: 9,
};

const paddle = {
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  x: (canvas.width - PADDLE_WIDTH) / 2,
  y: canvas.height - PADDLE_HEIGHT - MARGIN_BOTTOM,
  dx: PADDLE_dX,
};

let ball = {
  r: BALL_RADIUS,
  x: canvas.width / 2,
  y: paddle.y - BALL_RADIUS,
  dx: BALL_dX,
  dy: BALL_dY,
  speed: SPEED_PER_UNIT_TIME,
};

const PowerUpTypes = {
  shrinkWidthPdown: { color: "black", symbol: "><" },
  increaseLife: { color: "green", symbol: "+" },
  extendWidthPUP: { color: "white", symbol: "<>" },
  superBall: { color: "yellow", symbol: "S" },
  decreaseLife: { color: "red", symbol: "-" },
  stickyBall: { color: "blue", symbol: "=" },
};

function PowerUp(x, y, size, type) {
  this.width = size;
  this.height = size;
  this.x = x;
  this.y = y;
  this.type = type;
  this.veticalSpeed = POWERUP_SPEED * this.height;
}

function drawPaddle() {
  ctx.fillStyle = stickyBall ? "blue" : "black";
  ctx.lineWidth = "2";
  ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 50);
  ctx.strokeStyle = stickyBall ? "blue" : "white";
  ctx.fill();
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = superBallPUP ? "yellow" : "red";
  ctx.lineWidth = "3";
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.fill();
  ctx.stroke();
}

function drawPups() {
  ctx.lineWidth = "4";
  for (const pup of powerUps) {
    ctx.beginPath();
    ctx.fillStyle = pup.type.color;
    ctx.strokeStyle = pup.type.color;
    ctx.strokeRect(
      pup.x - pup.width * 0.5,
      pup.y - pup.height * 0.5,
      pup.width,
      pup.height
    );
    ctx.textAlign = "center";
    ctx.fillText(pup.type.symbol, pup.x, pup.y + pup.height / 4);
  }
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

function resetPUPs() {
  superBallPUP = false;
  paddle.width = PADDLE_WIDTH;
  extendWidthPUP = 4;
  shrinkWidthPdown = 4;
  stickyBall = false;
}

function moveBall() {
  BallMoved = true;
  ball.x += ball.dx;
  ball.y += ball.dy;
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

function movePowerUps() {
  for (let index = 0; index < powerUps.length; index++) {
    powerUps[index].y += powerUps[index].veticalSpeed * 0.5;
  }
}

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
createBrikersHandler();

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

//=========================Ball's brick_collision==============//

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

function hardmenu() {
  hardl.addEventListener("click", (e) => {
    if (e.target.id === "easy") {
      ball.speed = SPEED_PER_UNIT_TIME;
      POWERUP_PROBABILITY= 0.4;
      document.getElementById("medium").removeAttribute("style");
      document.getElementById("hard").removeAttribute("style");
      e.target.style.width = "180px";
      e.target.style.borderWidth = "2px";
      e.target.borderColor = "wheate";
    } 
    else if (e.target.id === "medium") {
      ball.speed = SPEED_PER_UNIT_TIME + 2;
      POWERUP_PROBABILITY= 0.3;
      document.getElementById("easy").removeAttribute("style");
      document.getElementById("hard").removeAttribute("style");
      e.target.style.width = "180px";
      e.target.style.borderWidth = "2px";
      e.target.borderColor = "wheate";
    } 
    else if (e.target.id === "hard") {
      ball.speed = SPEED_PER_UNIT_TIME + 5;
      POWERUP_PROBABILITY= 0.2;
      document.getElementById("easy").removeAttribute("style");
      document.getElementById("medium").removeAttribute("style");
      e.target.style.width = "180px";
      e.target.style.borderWidth = "2px";
      e.target.borderColor = "wheate";
    }
  });
}
hardmenu();

//======== Game over====//
function gameOver() {
  if (life <= 0) {
    Game_Over = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 850, 500);
    checkhighscore();
    scoreHandler();
    ctx.drawImage(game_over_img, canvas.width / 3.5, canvas.height / 5, 300, 300);
    replay.style.display = "block";
  }
}

function scoreHandler() {
  scoreEle.classList.remove("hidden");
  highscoreEle.classList.remove("hidden");
  highscoreval.innerHTML = "";
  highscoreval.innerHTML = `${localStorage.getItem("highscore")}`;
  scoreval.innerHtml = "";
  scoreval.innerHTML = `${Score}`;
}

//================ game status============//
function gameStatus(text, textx, texty, img, imgx, imgy) {
  ctx.fillStyle = "white";
  ctx.font = "25px Arail";
  ctx.fillText(text, textx, texty);
  ctx.drawImage(img, imgx, imgy, (width = 30), (height = 30));
}

function levelUp() {
  let isLevelFinished = true;
  let mainbricks = brick.rows * brick.cols ;
  
  for (let i = 0; i < brick.rows; i++) {
    for (let j = 0; j < brick.cols; j++) {
      isLevelFinished = isLevelFinished && !bricks[i][j].status;
      if(!bricks[i][j].status){
        mainbricks--;
      }
    }
  }

  if (mainbricks==solidbricks) {
    isLevelFinished=1;
  }
  if (isLevelFinished) {
    if (Level >=Max_Level  ) {
      win.play();
      winGame();
      sound.classList.add("hidden");
      return;
    }
    brick.rows++;
    createBrikersHandler();
    ball.speed += 1;
    resetBall();
    resetPUPs();
    Level++;
    if (Level == 2) {
      freeblocks(brick.rows, 0);
    } else if (Level == 3) {
      freeblocks(brick.rows, "solid");
    }
  }
}

function winGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, 850, 500);
  checkhighscore();
  scoreHandler();
  ctx.drawImage(youwon_img, canvas.width / 3, canvas.height / 5, 300, 250);
  replay.style.display = "block";
}

freeblocks(brick.rows,"solid");
function freeblocks(rows, value) {
  let num = Math.trunc(Math.random() * (2 - 1) + 1);
  solidbricks = num * rows;

  for (i = 0; i < rows; i++) {
    for (j = 0; j < num; j++) {
      let rcol = Math.trunc(Math.random() * (6 - 0) + 0);
      bricks[i][rcol].status = value;
    }
  }
  for (i = 0; i < rows; i++) {
    for (j = 0; j < brick.cols; j++) {
      if (bricks[i][j].status != value) {
        bricks[i][j].status = 2;
      }

      if (j > 0) {
        if (bricks[i][j].status == value && bricks[i][j - 1].status == value) {
          bricks[i][j].status = 2;
          if (j + 1 != 7) {
            bricks[i][j + 1].status = value;
          }
        }
      }
    }
  }
}

function checkhighscore() {
  if (!localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", "0");
    highscoreval.innerHTML = "0";
  } else if (localStorage.getItem("highscore") < Score) {
    localStorage.setItem("highscore", `${Score}`);
    highscoreval.innerHTML = `${localStorage.getItem("highscore")}`;
  }
}

function keyupHandler(event) {
  if (event.keyCode === 39) {
    rightKey = false;
  } else if (event.keyCode === 37) {
    leftKey = false;
  }
}

function keydownHandler(event) {
  if (event.keyCode === 13) {
    enterKey = true;
  }
  if (event.keyCode === 39) {
    rightKey = true;
  } else if (event.keyCode === 37) {
    leftKey = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, 850, 500);
  drawPups();
  drawPaddle();
  drawBall();
  drawbricks();
  gameStatus(Score, 300, 30, score_img, 250, 5);
  gameStatus(Level, 520, 30, level_img,480, 5);
  gameStatus(life, 740, 30, life_img, 690, 5);

}

function update() {
  movePaddle();
  if (enterKey) {
    moveBall();
  }
  ballWallCollision();
  ballPaddleCollision();
  ballBrickCollision();
  movePowerUps();
  powerUpsPaddleCollision();
  gameOver();
  levelUp();
}

function loop() {
  draw();
  update();
  checkhighscore();
  if (!Game_Over) {
    requestAnimationFrame(loop);
  }
}

modalElt.addEventListener("click", function () {
  hardl.classList.add("hidden");
  modalElt.classList.add("hidden");
  highscoreEle.classList.add("hidden");
  scoreEle.classList.add("hidden");
  document.getElementById("sound").style.display = "flex";
  loop();
});

soundBtn.addEventListener("click", function () {
  let imgSrc = soundBtn.getAttribute("src");
  let soundImg =
    imgSrc == "./media/SOUND_ON.png"
      ? "./media/SOUND_OFF.png"
      : "./media/SOUND_ON.png";
  soundBtn.setAttribute("src", soundImg);

  brick_hit.muted = brick_hit.muted ? false : true;
  wall.muted = wall.muted ? false : true;
  win.muted = win.muted ? false : true;
});

replay.addEventListener("click", () => {
  location.reload();
});