var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var ob1, ob2, ob3, ob4, ob5
var gObstacle1, gObstacle2
//var barGroup
var gameState = 1
var gameOver, gameOverImg 
var restart, restartImg
var jumpSound;
var dieSound;

function preload(){
bgImg = loadImage("assets/bg.png")
ob1 = loadImage("assets/obsBottom1.png")
ob2 = loadImage("assets/obsBottom2.png")
ob3 = loadImage("assets/obsBottom3.png")
ob4 = loadImage("assets/obsTop1.png")
ob5 = loadImage("assets/obsTop2.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
gameOverImg = loadImage("assets/fimdejogo.png")
restartImg = loadImage("assets/restart.png")
jumpSound = loadSound("/assets/jump.mp3")
dieSound = loadSound("/assets/die.mp3")
}

function setup(){

//imagem de plano de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3;               

//criando canto superior e inferior
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//criando o balão     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

gObstacle1 = new Group();
gObstacle2 = new Group();
//barGroup = new Group();

gameOver = createSprite(220,200);
restart = createSprite(220,240);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;


}

function draw() {
  
  background("black");
        if(gameState == 1){
          if(keyDown("space")) {
            balloon.velocityY = -6;
            //jumpSound.play();
          }
          balloon.velocityY = balloon.velocityY + 0.8;
          
          //Bar();
          bottomObstacles();
          topObstacles();


          if(balloon.isTouching(gObstacle1)||balloon.isTouching(gObstacle2)||balloon.isTouching(bottomGround)||balloon.isTouching(topGround)){
            gameState = 2;
            dieSound.play();
          }

          /*if(balloon.isTouching(gObstacle1)|| balloon.isTouching(topGround)){
            balloon.velocityY = 6;
            jumpSound.play();
          }

          if(balloon.isTouching(gObstacle2)|| balloon.isTouching(bottomGround)){
            balloon.velocityY = - 6;
            jumpSound.play();
          }*/
          

          if(gameState == 2 ){

            gameOver.visible = true;
            gameOver.depth = gameOver.depth+1
            restart.visible = true;
            restart.depth = restart.depth+1

            balloon.velocityY = 0;
            balloon.velocityX = 0;

            gObstacle1.setVelocityXEach(0);
            gObstacle2.setVelocityXEach(0);

            gObstacle1.setLifetimeEach(-1);
            gObstacle2.setLifetimeEach(-1);


            balloon.y = 180;
          }
            if(mousePressedOver(restart)){
              reset();
            }
          
        }

        drawSprites();
        
}

 function bottomObstacles(){
   if(frameCount%60 === 0){
     var obstacle = createSprite(400,360,30,90);
     obstacle.velocityX = -4;
     obstacle.scale = 0.1
     var r = Math.round(random(1,3));
    switch(r){
      case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
      break;
      case 3: obstacle.addImage(ob3);
      break;
       }  
       gObstacle2.add(obstacle);
       obstacle.lifetime = 100;
  }
}
 

 function topObstacles(){
  if(frameCount%60 === 0){
    var obstacle = createSprite(400,40,30,90);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    var r = Math.round(random(1,2));
    switch(r){
      case 1: obstacle.addImage(ob4);
      break;
      case 2: obstacle.addImage(ob5);
      break;
    }
    gObstacle1.add(obstacle);
    obstacle.lifetime = 100;
  }
  
}

function Bar(){
  if(world.frameCount % 60 === 0){
    var bar = createSprite()
    bar.velocityX = -6;
    bar.depth = balloon.depth;
    bar.lifetime = 70;
    bar.visible = false;
    barGroup.add(bar);
  }
}

function reset(){
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  gObstacle1.destroyEach();
  gObstacle2.destroyEach();
}

/* function Score(){

  }*/

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);

  if(hour>=0o6 && hour<=19){
    bg.addImage(bgImg);
    bg.scale = 1.3
  }
  else{
    bg.addImage(bgImg2);
    bg.scale = 1.5;
    bg.x = 200;
    bg.y = 200;
  }
}