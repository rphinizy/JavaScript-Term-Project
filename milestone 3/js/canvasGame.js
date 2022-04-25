var myGamePiece;
var myGamePieceTwo;
var myGamePieceThree;
var slideSpeed =1;
var toggle = false;
var backgroundMusic;
var loserAudio;
var owAudio;
var ladderAudio;
var stepAudio;
var winAudio;
var audioToggleTwo = false;
var isFalling =false;
var deathBlockOne =true;
var deathBlockTwo =true;
var deathBlockThree =true;
var gameLevel =1;


const btnHide = document.getElementById('start');

btnHide.addEventListener('click', () => {
    btnHide.style.visibility = 'hidden';
  });

function startGame() {
    loserAudio =new sound("media/lose.wav");
    stepAudio=new sound("media/footstep.wav");
    ladderAudio=new sound('media/ladder.wav');
    owAudio= new sound('media/ow.wav');
    winAudio=new sound('media/win.wav');
    platformOne =new component(300, 70, 'ledge', 100,330 );
    platformTwo =new component(250, 70, 'ledge', 300,210 );
    platformThree =new component(150, 70, 'ledge', 400,90 );
    ladderOne =new component(50,100,'ladder', 160,350);
    ladderTwo =new component(50,100,'ladder', 310,227);
    ladderThree =new component(50,90,'ladder', 490,110);
    finishFlag =new component(53,60,'flag', 410,50);
    myGamePiece = new component(50, 20, "red", 0,280 );
    myGamePieceTwo = new component(50, 20, "red", 700,180 );
    myGamePieceThree = new component(50, 20, "red", 300,60 );
    myPlayer = new player(85, 85,10, 390);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.getElementById("gameScreen"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.canvas = document.getElementById("gameScreen");
        this.interval = setInterval(updateGameArea, 20);
        
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
      }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

function playSound() {
    backgroundMusic = new sound("media/music.wav");
    backgroundMusic.loop=true;
    backgroundMusic.play();
}

function getScore(){
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle="black";
    ctx.fillText("Curret Level: " +gameLevel,20,50);
}

function component(width, height, color, x, y) {
    const ladderImg =new Image();
    const ledgeImg =new Image();
    const gameOverImg = new Image();
    const flagImg = new Image();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    flagImg.src="media/flag.png";
    ladderImg.src = "media/ladder.png";
    ledgeImg.src = "media/ledge.png";
    gameOverImg.src="media/gameover.jpg";

    this.update = function(){
        if (color==="ladder"){
            ctx.drawImage(ladderImg, this.x, this.y, this.width, this.height);
    }
        else if (color==="ledge"){
            ctx.drawImage(ledgeImg, this.x, this.y, this.width, this.height);
        }
        else if (color==="flag"){
            ctx.drawImage(flagImg, this.x, this.y, this.width, this.height);
        }
        else if (color ==="gameOver"){
            ctx.drawImage(gameOverImg, this.x, this.y, this.width, this.height); 
         }
        
        else {
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    // I was not able to reuse this method for multiple components by passing in a unique boolean variable 
    //The blocks would get stuck on the outer edges and not change direction. There must be a way to code this 
    //so it does not have to be duplicated for each sliding block. 
    // Update. Ok I realized I was being dumb and it needs to return the boolean. Will fix later if have time. 
    this.checkEdgeOne = function(){
        if (this.x >= myGameArea.canvas.width-this.width){
            deathBlockOne =false;
        }
        if(deathBlockOne==true){
            this.x +=slideSpeed;
        }
        if(deathBlockOne ==false){
            this.x -=slideSpeed;
        }
        if (this.x <=0){
            deathBlockOne =true;
        }
    }

    this.checkEdgeTwo = function(){
        if (this.x >= myGameArea.canvas.width-this.width){
            deathBlockTwo =false;
        }
        if(deathBlockTwo==true){
            this.x +=slideSpeed;
        }
        if(deathBlockTwo ==false){
            this.x -=slideSpeed;
        }
        if (this.x <=0){
            deathBlockTwo =true;
        }
    }
    this.checkEdgeThree = function(){
        if (this.x >= myGameArea.canvas.width-this.width){
            deathBlockThree =false;
        }
        if(deathBlockThree==true){
            this.x +=slideSpeed;
        }
        if(deathBlockThree ==false){
            this.x -=slideSpeed;
        }
        if (this.x <=0){
            deathBlockThree =true;
        }
    }

    
}

function player(width, height, x, y) {
    const toonImg = new Image();
    var playerSpeed =15;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    toonImg.src = "media/toon.png";
    
    this.update = function(){
        ctx.drawImage(toonImg, this.x, this.y, this.width, this.height);
    }

    this.moveRight = function(){
        var rightEdge= false;
        if (this.x == myGameArea.canvas.width-this.width){
            rightEdge =true;
        }

        if(!rightEdge){
            this.x +=playerSpeed;
            stepAudio.play();
        }
        }

    this.moveLeft = function(){
        var leftEdge= false;
        if (this.x <= 0){
            leftEdge =true;
        }
        if(!leftEdge){
            this.x -=playerSpeed;
            stepAudio.play();
        }
}
    this.moveUp = function(){
        onPlatOne=false;
        onPlatTwo=false;
        onPlatThree = false;

        switch(this.y){
            case 270:
                onPlatOne = true;
                break;
            case 150:
                onPlatTwo = true;
                break;
            case 30:
                onPlatThree = true;
        }
     
        if(this.crashWith(ladderOne) && onPlatOne == false){
            this.y -=playerSpeed;
            ladderAudio.play();
        }

        if(this.crashWith(ladderTwo) && onPlatTwo == false){
            this.y -=playerSpeed;
            ladderAudio.play();
        }

        if(this.crashWith(ladderThree) && onPlatThree == false){
            this.y -=playerSpeed;
            ladderAudio.play();
        }
}
    this.moveDown = function(){
        if(this.y < 390 && this.crashWith(ladderOne)){
            this.y +=playerSpeed;
            ladderAudio.play();
        }

        if(this.y<270 && this.crashWith(ladderTwo)){
            this.y +=playerSpeed;
            ladderAudio.play();
        }

        if(this.y<150 && this.crashWith(ladderThree)){
            this.y +=playerSpeed;
            ladderAudio.play();
        }
}
    this.crashWith = function(otherobj) {
        var myleft = this.x+25;
        var myright = this.x + (this.width-40);
        var mytop = this.y+12;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x+10;
        var otherright = otherobj.x + (otherobj.width/1.1);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
  }
    this.fallDown = function() {
        var gameGround = 390;
        if(this.y ==381){
            owAudio.play();
        }
        if(this.y >= gameGround){
            isFalling =false;
            this.y = gameGround;
        }

        if(!this.crashWith(ladderOne)&& 
           !this.crashWith(ladderTwo)&&
           !this.crashWith(ladderThree)&& 
           !this.crashWith(platformOne)&& 
           !this.crashWith(platformTwo)&&
           !this.crashWith(platformThree)
           ){
            if (this.y <gameGround)
               isFalling = true;
                console.log(this.y);
        }

        if(!this.crashWith(ladderOne) && this.crashWith(platformOne) && this.y>270){
            this.y +=3;
        }

        if(!this.crashWith(ladderTwo) && this.crashWith(platformTwo) && this.y>150){
            this.y +=3;
        }

        if(!this.crashWith(ladderThree) && this.crashWith(platformThree) && this.y>30){
            this.y +=3;
        }

        if(isFalling){
            this.y +=3;
        }
      
  }
}

function updateGameArea() {
    if (myPlayer.crashWith(myGamePiece) || myPlayer.crashWith(myGamePieceTwo) || myPlayer.crashWith(myGamePieceThree)) {
        myGameArea.clear();
        backgroundMusic.stop();
        loserAudio.play();
        endOfGame= new component(800,500,'gameOver', 0,0);
        endOfGame.update();
        myGameArea.stop();
        
      }
    
    else if(myPlayer.crashWith(finishFlag)){
          slideSpeed=slideSpeed+1;
          myPlayer.y=390;
          myPlayer.x=100;
          gameLevel +=1;
          winAudio.play();
      }
    else {
        myGameArea.clear();
        myGamePiece.checkEdgeOne();
        myGamePiece.update();
        myGamePieceTwo.checkEdgeTwo();
        myGamePieceTwo.update();
        myGamePieceThree.checkEdgeThree();
        myGamePieceThree.update();
        platformOne.update();
        platformTwo.update();
        platformThree.update();
        ladderOne.update();
        ladderTwo.update();
        ladderThree.update();
        finishFlag.update();
        myPlayer.fallDown();
        myPlayer.update();
        getScore();
        console.log(myPlayer.y)
    }
}
