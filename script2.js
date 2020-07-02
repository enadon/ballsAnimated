let canvas = document.getElementById("ballsCanvas");
let ctx = canvas.getContext("2d");

let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;

canvas.width = w;
canvas.height = h;

// =====  for creating a ball (color function + constructor of a ball)

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Ball {
    constructor(dx, dy, ballRadius, color) {

        this.dx = dx;
        this.dy = dy;
        this.ballRadius = ballRadius;
        this.x = 0 + ballRadius;
        this.y = 0 + ballRadius;
        this.color = color;

    }

}

// ==========  create an array of balls

let ballsArray = [];

function drawBall() {
    if (ballsArray.length < 20) {
        let color = getRandomColor();
        let dx = Math.round(Math.random() * 5);
        let dy = Math.round(Math.random() * 5);
        let radius = Math.round(Math.random() * 100);

        ballsArray.push(new Ball(dx, dy, radius, color));
    }
}

// ==========  function to move balls

function moveBall() {

    ctx.clearRect(0, 0, w, h);

    for (const element of ballsArray) {
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = element.color.toString();
        ctx.fill();
        ctx.closePath();

        element.y + element.dy < 0 + element.ballRadius || element.y + element.dy > h - element.ballRadius ? element.dy = -element.dy : element.dy;
        element.x + element.dx < 0 + element.ballRadius || element.x + element.dx > w - element.ballRadius ? element.dx = -element.dx : element.dx;

        element.x += element.dx;
        element.y += element.dy;
    }


    requestAnimationFrame(moveBall);

}

// ==========  EXECUTION  ========

// -----------  draw a first ball to make animation immideatly
drawBall();

function drawMoving() {

    setInterval(() => {
        if (ballsArray.length < 19) drawBall();
    }, 5000);

    requestAnimationFrame(moveBall);

}

drawMoving();

// ==============  IF RESIZE

window.addEventListener(`resize`, event => {
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;

    canvas.width = w;
    canvas.height = h;

    // ----------  if element isn't in the view zone
    for (const element of ballsArray) {
        if (element.x + element.ballRadius > h) {
            element.x = h - element.ballRadius;
        }
        element.x + element.ballRadius > w ? element.x = w - element.ballRadius : element.x;
        element.y + element.ballRadius > h ? element.y = h - element.ballRadius : element.y;
    }

}, false);