var boy, boyImg;
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");
    boyImg = loadImage("boy.png");
}

function setup() {
    createCanvas(600,600);
    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY = 1;
    
    doorsGroup = new Group();
    climbersGroup = new Group();
    invisibleBlockGroup = new Group();
    
    ghost = createSprite(200,200,50,50);
    ghost.scale = 0.3;
    ghost.addImage("ghost", ghostImg);

    boy = createSprite(200,200,50,50)
    boy.scale = 0.08;
    boy.addImage("boy",boyImg);
}

function draw() {
    background(0);
    ghost.x=boy.x-100;
    ghost.y=boy.y+100;
    if (gameState === "play") {
      if(keyDown("a")){
        boy.x = boy.x - 3;
      }
      
      if(keyDown("d")){
        boy.x = boy.x + 3;
      }
      
      if(keyDown("space")){
        boy.velocityY = -10;
      }
      
      boy.velocityY = boy.velocityY + 0.8
      
      if(tower.y > 400){
        tower.y = 300
      }
      spawnDoors();

      
      //climbersGroup.collide(boy);
      if(climbersGroup.isTouching(boy)){
        boy.velocityY = 0;
      }
      if(invisibleBlockGroup.isTouching(boy) || boy.y > 600){
        boy.destroy();
        gameState = "end"
      }
      
      drawSprites();
    }
    
    if (gameState === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250)
    }
  
  }
  function spawnDoors() {
    //write code here to spawn the doors in the tower
    if (frameCount % 240 === 0) {
      var door = createSprite(200, -50);
      var climber = createSprite(200,10);
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      
      door.x = Math.round(random(120,400));
      climber.x = door.x;
      invisibleBlock.x = door.x;
      
      door.addImage(doorImg);
      climber.addImage(climberImg);
      
      door.velocityY = 1;
      climber.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      boy.depth = door.depth;
      boy.depth +=1;
     
      //assign lifetime to the variable
      door.lifetime = 600;
      climber.lifetime = 600;
      invisibleBlock.lifetime = 800;
  
      
      //add each door to the group
      doorsGroup.add(door);
      invisibleBlock.debug = true;
      climbersGroup.add(climber);
      invisibleBlockGroup.add(invisibleBlock);
    }
  }
