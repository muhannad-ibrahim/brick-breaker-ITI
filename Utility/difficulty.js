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