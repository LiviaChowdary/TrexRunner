var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,
    obstacle6;
var count ;

var cloudsGroup,obstaclesGroup;
//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState;

var reset;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  reset = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  rectMode(CENTER);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug= true;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,1000,10);
  invisibleGround.visible = true;
  
  cloudGroup = new Group();
  obstaclesGroup = new Group();
  gameState= PLAY;
  
  score = 0;
  
}

function draw() {
  background(180);
  
  
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    text("score= " + score,500,50);
    
    
    if(keyDown("space")) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    trex.collide(invisibleGround);
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(trex.isTouching(obstaclesGroup);
        //trex.x-obstaclesGroup.x<(trex.width+obstaclesGroup.width)/2
    ){
      gameState = END;
    }
    
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.setAnimation("trex_collided");
    
  
    
  }
  
  if(mousePressedOver(reset)) {
    location.reload();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);


  
  drawSprites();

}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
   cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {

    rectMode(CENTER);
    var obstacle = createSprite(600,165,10,40);
    obstacle.debug= true;
   
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){ 
        case 1 : obstacle.addImage(obstacle1);
          break;
        case 2 : obstacle.addImage(obstacle2);
          break;
        case 3 : obstacle.addImage(obstacle3);
          break; 
        case 4 : obstacle.addImage(obstacle4);
          break; 
        case 5 : obstacle.addImage(obstacle5);
          break;
        case 6 : obstacle.addImage(obstacle6);
          break;
      default:
        break ;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    
    obstaclesGroup.add(obstacle);
  }
}


  
  
  
