var runner
 var runImg
 var runnerJump
 var idle
 var ground
 var invGround
 var groundImg
 var goldImg
 var silverImg
var bronzeImg
var coinsGroup
var stoneImg
var score=0;
var coins=0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
runImg = loadAnimation("images1/run1.png","images1/run3.png","images1/run4.png");
runnerJump = loadImage("images1/jump.png")
idle = loadAnimation("images1/idle.png")
groundImg = loadImage("images1/ground2.png")
goldImg = loadAnimation("images1/Gold_a.png","images1/Gold_b.png","images1/Gold_c.png")
silverImg = loadAnimation("images1/Silver_a.png","images1/Silver_b.png","images1/Silver_c.png")
bronzeImg = loadAnimation("images1/Bronze_a.png","images1/Bronze_b.png","images1/Bronze_c.png")
stoneImg = loadImage("images1/stone_burned.png")
 }
 function setup(){
createCanvas(1200,800)
  runner = createSprite(150,580,100,100)
  runner.scale = 2.0;
  runner.addAnimation("a",idle);
  runner.addAnimation("running",runImg)
  ground = createSprite(600,685,1200,20)
  invGround = createSprite(600,710,1200,10)
  invGround.visible = false;
  ground.addImage(groundImg);
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
  coins=0;
  runner.debug = true;
  obstaclesGroup.debug = true;
  runner.setCollider("circle",0,0,30)
 }
 function draw(){
   background("white")
   runner.collide(invGround);
  
   if (gameState===PLAY){
         score = score + Math.round(getFrameRate()/60);
         if(keyDown("space") && runner.y >= 159) {
         runner.velocityY = -14;
          }
         runner.velocityY = runner.velocityY + 0.7
         if(keyDown("space")){
            ground.velocityX = -6
            runner.changeAnimation("running",runImg)
           }
           if(ground.x<0){
        ground.x = ground.width/2;
           }  
           text("Score: "+ score, 400,300);
           text("Coins: "+ coins,600,300);
           Coins();
           obstacles();
   }
   
  if(runner.isTouching(obstaclesGroup)){
     gameState = END;
     runner.changeAnimation("a",idle);
  }
  else if(gameState === END){
   ground.velocityX = 0;
   runner.changeAnimation("images1/idle.png")
   obstaclesGroup.setVelocityXEach(0);
   coinsGroup.setVelocityXEach(0);
   text("Final score: "+ score,400,300)
   text("Total coins: "+ coins,400,200)
}

   drawSprites();
 }
 
 
 function Coins(){
    if(World.frameCount%150 === 0){
       var Gcoin = createSprite(1200,600,10,10);
       Gcoin.velocityX = -5
       var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: Gcoin.addAnimation("gold",goldImg);
              break;
      case 2: Gcoin.addAnimation("silver",silverImg);
              break;
      case 3: Gcoin.addAnimation("bronze",bronzeImg);
              break;
      default: break;
    }
    coinsGroup.add(Gcoin);
    Gcoin.scale = 0.09
    }
    
 
}
function obstacles(){
   if(World.frameCount%120 === 0){
      var stone = createSprite(1200,680,10,10)
      stone.addImage(stoneImg)
      stone.scale = 0.09
      stone.velocityX = -3
      obstaclesGroup.add(stone);
      stone.debug = true;
   }
  }
