var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var Banana ,bananaImage;
var    obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime= 0;
var BananaCollected = 0;
var invisiblewall;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(100,304,10,1);
  monkey.addAnimation("monkeyrunning",monkey_running);
  monkey.scale = 0.1;
  
  
  invisiblewall = createSprite(100,304,100,1);
  invisiblewall.visible = false;
  
   ground = createSprite(400,360,10000,110);
  ground.velocityX = -5;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
}


function draw() {
background("Green")
 
      monkey.collide(obstacleGroup);
  
   if(gameState===PLAY){
   if(monkey.isTouching(FoodGroup)){
     BananaCollected = BananaCollected + 1;
      FoodGroup.destroyEach();
   }
  monkey.collide(invisiblewall)
  console.log(monkey.y);
  if(keyDown("space")&&monkey.y>265){
    monkey.velocityY = -12;
  }
  monkey.velocityY =  monkey.velocityY+0.8;
  obstacleSpawn();
  BananaSpawn();
     
      survivalTime = survivalTime + Math.round(getFrameRate()/60);
     
     
  if(ground.x>0){
    ground.x=ground.width/2;
    if(obstacleGroup.isTouching(monkey)){
      Gamestate = END;
    }
  }
  
   }
 else if(gameState===END){
   monkey.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
              ground.velocityX = 0;
       obstacleGroup.destroyEach();
    foodGroup.destroyEach();
     
   }
  
  
  
  
  drawSprites();
  
  textSize(15);
  fill("Red");
  text("banana Collected:"+ BananaCollected,100,50);
  
  textSize(15);
  fill("red");
  text("survival time :"+survivalTime,250,50);
  
  
}

function obstacleSpawn(){
  if(frameCount%100===0){
    obstacle = createSprite(400,290,10,5);
    obstacle.addImage(  obstaceImage);
    obstacle.scale = 0.095;
    obstacle.velocityX= -10;
    obstacle.lifetime= 300;
    
     obstacleGroup.add(obstacle);
    
  }
}

function BananaSpawn(){
  if(frameCount%200===0){
    var Banana = createSprite(600,120,40,10);
     Banana.y = Math.round(random(150,200));
    Banana .addImage(bananaImage);
    Banana.scale = 0.075;
    Banana.velocityX = -3;
    Banana.depth = monkey.depth;
    
    FoodGroup.add(Banana);
     //assign lifetime to the variable
    Banana.lifetime = 200;
   
    
   
  }
    
    
  
  
  
  
}



