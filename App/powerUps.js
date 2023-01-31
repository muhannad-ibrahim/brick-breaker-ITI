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

function resetPUPs() {
    superBallPUP = false;
    paddle.width = PADDLE_WIDTH;
    extendWidthPUP = 4;
    shrinkWidthPdown = 4;
    stickyBall = false;
}


function movePowerUps() {
    for (let index = 0; index < powerUps.length; index++) {
        powerUps[index].y += powerUps[index].veticalSpeed * 0.5;
    }
}