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
  
  function gameStatus(text, textx, texty, img, imgx, imgy) {
    ctx.fillStyle = "white";
    ctx.font = "25px Arail";
    ctx.fillText(text, textx, texty);
    ctx.drawImage(img, imgx, imgy, (width = 30), (height = 30));
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