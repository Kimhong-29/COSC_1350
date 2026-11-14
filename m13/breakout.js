/*
 * Breakout Game - Part 1
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ballRender();
    paddleRender();

    if (xPos + xMoveDist > canvas.width - ballRadius ||
        xPos + xMoveDist < ballRadius) {
        xMoveDist = -xMoveDist;
    }

    if (yPos + yMoveDist > canvas.height - ballRadius ||
        yPos + yMoveDist < ballRadius) {
        yMoveDist = -yMoveDist;
    }

    xPos += xMoveDist;
    yPos += yMoveDist;

    if (moveLeft && xPaddle > 0) {
        xPaddle = Math.max(0, xPaddle - 3);
    }

    // Move the paddle right without leaving the canvas.
    if (moveRight && xPaddle < canvas.width - paddleWidth) {
        xPaddle = Math.min(
            canvas.width - paddleWidth,
            xPaddle + 3
        );
    }
}

const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
