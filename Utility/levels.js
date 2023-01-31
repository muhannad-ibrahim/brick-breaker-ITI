function winGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 850, 500);
    checkhighscore();
    scoreHandler();
    ctx.drawImage(youwon_img, canvas.width / 3, canvas.height / 5, 300, 250);
    replay.style.display = "block";
}
    
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
