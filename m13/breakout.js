
/*
 * Breakout Game - Part 2
 * Author: KimHong Poun
 * Date: 11/13/2026
 * File Name: breakout.js
 * Project for COSC 1350
 */

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;
let xMoveDist = 3;
let yMoveDist = 3;

let paddleWidth = 100;
let paddleHeight = 15;
let xPaddle = (canvas.width - paddleWidth) / 2;
let yPaddle = canvas.height - paddleHeight - 10;

let moveLeft = false;
let moveRight = false;

const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;

let bricks = [];

for (let r = 0; r < brickRows; r++) {
    bricks[r] = [];

    for (let c = 0; c < brickColumns; c++) {
        let brickX = brickLeftOffset +
            c * (brickWidth + brickPadding);

        let brickY = brickTopOffset +
            r * (brickHeight + brickPadding);

        bricks[r][c] = {
            x: brickX,
            y: brickY,
            hit: false
        };
    }
}

function ballRender() {
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffcc00";
    ctx.fill();
    ctx.closePath();
}

function paddleRender() {
    ctx.fillStyle = "#00d9ff";
    ctx.fillRect(xPaddle, yPaddle, paddleWidth, paddleHeight);
}

function brickRender() {
    for (let r = 0; r < brickRows; r++) {
        for (let c = 0; c < brickColumns; c++) {
            let brick = bricks[r][c];

            if (!brick.hit) {
                ctx.fillStyle = "#ff6347";
                ctx.fillRect(
                    brick.x,
                    brick.y,
                    brickWidth,
                    brickHeight
                );
            }
        }
    }
}

function brickCollision() {
    for (let r = 0; r < brickRows; r++) {
        for (let c = 0; c < brickColumns; c++) {
            let brick = bricks[r][c];

            if (!brick.hit) {
                if (
                    xPos + ballRadius > brick.x &&
                    xPos - ballRadius < brick.x + brickWidth &&
                    yPos + ballRadius > brick.y &&
                    yPos - ballRadius < brick.y + brickHeight
                ) {
                    brick.hit = true;
                    yMoveDist = -yMoveDist;
                    return;
                }
            }
        }
    }
}

function keyDownHandler(event) {
    if (event.key === "ArrowLeft") {
        moveLeft = true;
        event.preventDefault();
    }

    if (event.key === "ArrowRight") {
        moveRight = true;
        event.preventDefault();
    }
}

function keyUpHandler(event) {
    if (event.key === "ArrowLeft") {
        moveLeft = false;
    }

    if (event.key === "ArrowRight") {
        moveRight = false;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function gameOver() {
    clearInterval(intervalID);

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        canvas.height / 2
    );
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (moveLeft && xPaddle > 0) {
        xPaddle = Math.max(0, xPaddle - 3);
    }

    if (moveRight && xPaddle < canvas.width - paddleWidth) {
        xPaddle = Math.min(
            canvas.width - paddleWidth,
            xPaddle + 3
        );
    }

    if (
        xPos + xMoveDist > canvas.width - ballRadius ||
        xPos + xMoveDist < ballRadius
    ) {
        xMoveDist = -xMoveDist;
    }

    if (yPos + yMoveDist < ballRadius) {
        yMoveDist = -yMoveDist;
    }

    if (
        yMoveDist > 0 &&
        yPos + ballRadius <= yPaddle &&
        yPos + yMoveDist + ballRadius >= yPaddle &&
        xPos + ballRadius > xPaddle &&
        xPos - ballRadius < xPaddle + paddleWidth
    ) {
        yMoveDist = -yMoveDist;
    }

    xPos += xMoveDist;
    yPos += yMoveDist;

    brickCollision();

    brickRender();
    paddleRender();
    ballRender();

    if (yPos - ballRadius > canvas.height) {
        gameOver();
    }
}

const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
