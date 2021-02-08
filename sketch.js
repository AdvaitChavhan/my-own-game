var man,manImage
var ground, groundImage;
var scene;
var dragon;
var dragonsGroup;
var score;
var gamestate="play";
var swordGroup;
var dragonkillsound;
var score=0;
var gameOver , restart;
 var gameOverimg,restartimg
function preload(){
  manImage=loadImage("swordman2.png");
  sceneImage=loadImage("mountain.jpg");
  dragon1=loadImage("dragon.png");
  dragon2=loadImage("dragon2.png");
  dragon3=loadImage("dragon3.png");
  swordImage=loadImage("sword.png");
  dragonkillsound=loadSound("dragonsound.mp3");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");

}

function setup() {
  createCanvas(1200,600);
  
  man = createSprite(100,550,20,50);
 man.addImage("sword",manImage);
  man.scale=0.7;
  ground = createSprite(600,550,1200,20);
//  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  scene=createSprite(600,500,1200,600);
 scene.addImage(sceneImage);
  scene.scale=2.5;
  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverimg);
  
  restart = createSprite(400,340);
  restart.addImage(restartimg);

  gameOver.visible = false;
  restart.visible = false;
 score = 0;
  ground.visible=false;
  swordGroup=new Group();
  dragonsGroup=new Group();
  score = 0;
  gameOver.scale = 1.2;
  restart.scale = 1.2;

}

function draw() {
  background(0);
 scene.depth=0; 
 
  // text("Highestscore:"+localStorage["HighestScore"],400,50);
  
 if (gamestate==="play"){

  score = score + Math.round(getFrameRate()/60);
 scene.velocityX=-2;
  if (scene.x<0){
    scene.x=scene.width/2;
  }
  if (keyDown("UP_ARROW")){
    man.y=man.y-2;
  }
  if (keyDown("DOWN_ARROW")){
    man.y=man.y+2;
  }
  if (keyDown("RIGHT_ARROW")){
    throwSword();

  }
  
  spawndragons();
  if (dragonsGroup.isTouching(swordGroup)){
    dragonsGroup.destroyEach();
    swordGroup.destroyEach();
    dragonkillsound.play();
  }
  if (dragonsGroup.isTouching(man)){
    man.x=2000;
    gameOver.visible = true;
    restart.visible = true;
    gamestate="end";
  }
  

}
else if(gamestate==="end"){
  dragonsGroup.destroyEach();
 
scene.velocityX=0;
}
if (mousePressedOver(restart)){
  reset()
}

  man.collide(ground);
  drawSprites();
  textSize(20);
  text("Score: "+ score, 500,50);
}
function spawndragons(){
  if (frameCount % 180 === 0){
    var dragon = createSprite(1200,Math.round(random(200,500)),10,40);
    dragon.velocityX = -6;
    
     //generate random dragons
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: dragon.addImage(dragon1);
               break;
       case 2: dragon.addImage(dragon2);
               break;
       case 3: dragon.addImage(dragon3);
               break;
      
       default: break;
     }
    
     //assign scale and lifetime to the dragon           
     dragon.scale = 0.8;
     dragon.lifetime = 300;
    
    //add each dragon to the group
    dragonsGroup.add(dragon);
  }
 }
 function throwSword(){
var sword=createSprite(100,400,20,50);
sword.y=man.y-50;
sword.addImage(swordImage)
sword.scale=0.3;
sword.velocityX=4;
swordGroup.add(sword);
 }
 function reset(){
   gamestate="play"
   score=0;
   gameOver.visible=false
   restart.visible=false
   man.x=100;
 } 