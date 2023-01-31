scoreEle.classList.add("hidden");
highscoreEle.classList.add("hidden");
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
createBrikersHandler();
hardmenu();


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, 850, 500);
  drawPups();
  drawPaddle();
  drawBall();
  drawbricks();
  gameStatus(Score, 70, 30, score_img,20, 5);
  gameStatus(Level, 400, 30, level_img,350, 5);
  gameStatus(life, 720, 30, life_img, 680, 5);

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