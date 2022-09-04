var PLAY = 1;
var END = 0;
var gameState = PLAY;

var plr , plrImg, plr_collided;
var bg, bgImg;

var car , carGroup ;
var C1 , C1Img;

var score;
var groundB, groundT ;
var  gameOverImg;
var restartImg;

var plrSound, endSound;


function preload(){
  plrImg = loadImage("plr/run.png");
  plr_collided = loadImage("plr/fall.png");
       
  C1Img  = loadImage("images/Car1.png");

  gameOverImg = loadImage("Images/gameOver.png") ;
  restartImg  = loadImage("Images/restart.png") ;
  bgImg  = loadImage("Images/bg1.png");

  plrSound = loadSound("music/sound.mp3");
  endSound = loadSound("music/over.wav");
}

function setup() {
  createCanvas(2000,800);
  bg = createSprite(1200,400,5000,400);
  bg.addImage(bgImg)
  bg.scale = 1
  


  plr = createSprite(100,620);
  plr.addImage(plrImg)
  // plr.addAnimation("running", plrImg)
  // plr.addAnimation("collided", plr_collided)
  plr.scale = 1.5

  groundB = createSprite(200,790,5000,20);
  groundB.visible = false ;

  
  groundT = createSprite(200,10,5000,20);
  groundT.visible = false;

  plr.setCollider("rectangle",00,0,100,140)
  plr.debug = false ;
  groundT.debug = false;

  gameOver = createSprite(1000,400);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(1000,470);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1;
  restart.scale = 0.8;


  carGroup = new Group();

   score = 0;
}

function draw() {
  background("grey"); 
  text("Score: "+ score, 500,50);

  

  console.log(frameCount);
  if(gameState === PLAY){
    bg.velocityX = -5;

    plrSound.play();
    endSound.stop();
    gameOver.visible = false;
    restart.visible = false;
    console.log("Score")
    if(bg.x < 0){
     bg.x = width/2
   }
   score = score + Math.round(getFrameRate() / 10 );
  if(keyDown(UP_ARROW)){
    plr.velocityY = -3;
  }
 
  
  if(keyDown(DOWN_ARROW)){
    plr.velocityY = 3;
  }
  
    
  if(plr.isTouching(groundT)){
    plr.y = 620 ;
  }
 
  
  if(plr.y > 620){
    plr.y = 620
  }
  spawnCar();

  if(carGroup.isTouching(plr)){
    gameState = END
    plrSound.stop();
 }
  

}
 else if(gameState === END){
    endSound.play();
    plr.velocityY = 0;
    gameOver.visible = true;
    restart.visible =  true;
    if(mousePressedOver(restart)) {
      reset();
    }
    carGroup.setVelocityXEach(0);
    bg.velocityX = 0;
    console.log("Game Over");
    plr.visible = false;
    carGroup.destroyEach();
    fill("white");
    // size(35);
    text("Game OVER" ,800,600)
    carGroup.setLifetimeEach(-1);
    
  
  if(plr.isTouching(groundB)){
    plr.y = 610 ;
  }
 }
  drawSprites();

}

function spawnCar(){
  if(frameCount%100 === 0){

  

  var y = Math.round(random(200,710))
  car = createSprite(1600,y)
  // var rand = Math.round(random(1,5))

  car.addImage(C1Img);

  car.velocityX = -5
  car.scale = 0.5
  carGroup.add(car);
  plr.depth = car.depth + 1 ;
}
}

function reset(){
  gameState = PLAY ;
  gameOver.visible = false ;
  restart.visible = false ;
}