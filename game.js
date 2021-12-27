var player
var playerStartX = 25
var objectSpeed = 10
var objStartX = 750
var jumpHeight = 80
var gravity = 0.8
var jumping = false
var difficultyInc = 0.00125
var playerScore



var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800
        this.canvas.height = 600
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 30)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

function startGame() {
    player = new createPlayer(40, 80, "blue", playerStartX, 520)
    object = new createObject(50,30,"red", objStartX, 570)
    gameArea.start()
    playerScore = 0
    ctx = gameArea.context
    ctx.font = "24px sans-serif"
}

function createPlayer(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y  
    this.update = function(){
        ctx = gameArea.context
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function createObject(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y  
    this.update = function(){
        ctx = gameArea.context
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.x -= objectSpeed
        if(this.x < -this.width-25){ // todo
            this.x = objStartX
            newX = Math.floor(Math.random() * (100-30) + 30)
            newY = Math.floor(Math.random() * (50-30) + 30)
            this.height = newY
            this.width = newX
            this.y = gameArea.canvas.height - this.height
            // todo
        }
        objectSpeed = objectSpeed + difficultyInc         
    }
}

document.addEventListener("keydown", onKeyDown)

function jump() { 
    if(jumping)
        return
    let jumpUp = setInterval( function() {
        if(player.y > jumpHeight+player.height){
            clearInterval(jumpUp)
            let fallDown = setInterval( function() {
                if(player.y > gameArea.canvas.height - player.height){
                    clearInterval(fallDown)
                    jumping = false
                }
                if(player.y >= 520){
                    player.y = 510
                }
                player.y += 10
            },30)
        }
        jumping = true
        player.y -= jumpHeight
        player.y *= gravity
    }, 30)
}

function onKeyDown(e){
    if(e.key == " "){
        jump()
    }
}

function updateGameArea() {
  gameArea.clear()
  if(object.x < playerStartX+player.width 
    && object.x > playerStartX 
    && player.y+player.height >= object.y){
        alert("Game Over!\nYour highscore is: " + Math.round(playerScore))
        location.reload(); 
    }
  player.update()
  object.update()
  playerScore = playerScore + 0.125
  ctx.fillText("Score: " + Math.round(playerScore),600,50);
}
