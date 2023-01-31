var modalElt = document.getElementById("modal");
const canvas = document.getElementById("breakOutGame");
const soundBtn = document.getElementById("sound");
const highscoreEle = document.getElementById("highscore");
const scoreEle = document.getElementById("yourscore");
const scoreval = document.getElementById("scorevalue");
const highscoreval = document.getElementById("highvalue");
const replay = document.getElementById("replay");
const hardl = document.getElementById("menu");
const ctx = canvas.getContext("2d");

const PADDLE_WIDTH = 180;
const PADDLE_HEIGHT = 20;
const MARGIN_BOTTOM = 40;
const PADDLE_dX = 7;
let BALL_dX = 3;
const BALL_dY = -3;
const BALL_RADIUS = 10;
const SPEED_PER_UNIT_TIME = 4;
const POWERUP_SPEED = 0.15;
let POWERUP_PROBABILITY = 0.4;
var bricks = [];

let powerUps = [];
let extendWidthPUP = 4;
let solidbricks = 0;
let shrinkWidthPdown = 4;
let superBallPUP = false;
let stickyBall = false;

let Level = 1;
let Max_Level = 3;
let Game_Over = 0;
let Score = 0;
let life = 3;
let hard = "easy";

let rightKey = false;
let leftKey = false;
let enterKey = false;
let BallMoved = false;

const brick_hit = new Audio();
brick_hit.src = "./sounds/brick_hit.mp3";

const wall = new Audio();
wall.src = "./sounds/wall.mp3";

const win = new Audio();
win.src = "./sounds/win.mp3";

const img = new Image();
img.src = "./media/pexels-harry-cooke-6194839.jpg";

const score_img = new Image();
score_img.src = "./media/Star_image.png";

const life_img = new Image();
life_img.src = "./media/heart_image.png";

const level_img = new Image();
level_img.src = "./media/level.png";

const game_over_img = new Image();
game_over_img.src = "./media/game-over.png";

const youwon_img = new Image();
youwon_img.src = "./media/youwon.png";