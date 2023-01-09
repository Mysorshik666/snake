"use strict"
let berry ={
    x: 0,
    y: 0
}

const cfg = {
  step : 0,
  maxStep: 6,
  sizeCell: 16,
  sizeBerry: 16/4
}

const snake = {
    x: 160,
    y: 160,
    dx: cfg.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3
}
let scoreBlock = document.querySelector('.game-score .score-count'), score = 0;
let canvas = document.querySelector('#game-canvas')
let context = canvas.getContext('2d')
drawScore()

function gameLoop() {
    requestAnimationFrame(gameLoop)

    if(++cfg.step < cfg.maxStep){
        return
    }
    cfg.step = 0;

    context.clearRect(0,0, canvas.width, canvas.height)

    drawBerry()
    drawSnake()

}

requestAnimationFrame(gameLoop) 

function drawSnake (){
    snake.x += snake.dx
    snake.y += snake.dy

    collisionBorder()

    snake.tails.unshift({x: snake.x, y: snake.y})

    if( snake.tails.length > snake.maxTails) {
        snake.tails.pop()
    }

    snake.tails.forEach((el, index)=> {
        if(index === 0){
            context.fillStyle = "#FA0556"
        } else  context.fillStyle = "#A00034"
        context.fillRect(el.x, el.y, cfg.sizeCell, cfg.sizeCell)
        if( el.x === berry.x && el.y === berry.y){
            snake.maxTails++
            incScore()
            randomPositionBerry()
        }
        for(let i = index + 1; i< snake.tails.length; i++ ){
            if( el.x === snake.tails[i].x && el.y === snake.tails[i].y){
                refreshGame()
            }
        }
    })
}
function collisionBorder() {
    if (snake.x <0){
        snake.x = canvas.width - cfg.sizeCell
    } else if (snake.x >= canvas.width){
        snake.x = 0
    }

    if (snake.y <0){
        snake.y = canvas.height - cfg.sizeCell
    } else if (snake.y >= canvas.height){
        snake.y = 0
    }
}
function refreshGame() {
    score = 0
    drawScore()
    
    snake.x = 160
    snake.y = 160
    snake.tails = []
    snake.maxTails = 3
    snake.dx = cfg.sizeCell
    snake.dy = 0
    randomPositionBerry();
}

function randomPositionBerry() {
    berry.x = getRandom(0, canvas.width/cfg.sizeCell) * cfg.sizeCell
    berry.y = getRandom(0, canvas.height/cfg.sizeCell) * cfg.sizeCell

}

function drawBerry () {
    context.beginPath()
    context.fillStyle = "#A00034"
    context.arc(berry.x+ (cfg.sizeCell / 2), berry.y +  (cfg.sizeCell / 2), cfg.sizeBerry, 0, 2*Math.PI)
    context.fill()
}


function incScore(){
    score++
    drawScore()    
}

function drawScore() {
        scoreBlock.innerHTML = score
}

function getRandom(min, max) {
    return Math.floor(Math.random()*(max-min)+min)
}

document.addEventListener('keydown', e =>{
    switch (e.code) {
        case 'KeyW': snake.dy = -cfg.sizeCell;
                    snake.dx = 0;
            break;

        case 'KeyA': snake.dx = -cfg.sizeCell;
                     snake.dy = 0;
            break;

        case 'KeyS': snake.dy = cfg.sizeCell;
                     snake.dx = 0; 
            break;
        case 'KeyD': snake.dx = cfg.sizeCell;
                     snake.dy = 0; 
            break;
    
        default:
            break;
    }
})