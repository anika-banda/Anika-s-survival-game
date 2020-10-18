//GAME RULES:
// 1. The game starts with 3 lives. Our friend Henry the monkey should eat fruits spawning at random positions to score a point.
//2. Balloons will also be appearing at random positions in this game. Make sure Henry doesn't touch any of the balloons or else he will lose one life. 
//3. Press space key to start the game. You can make Henry go left,right, up and down using the arrow keys on your keyboard.
//Good luck and have fun!! Watch out for those balloons or else RIP Henry.
var monkey,monkey_running,moving;
var redballoonImage, blueballoonImage;
var groundImage, ground;
//var banana,bananaImage,bananaGroup;
var fruit,fruit1Image, fruit2Image, fruitGroup;
var obstacle,obstacleImage,obstacleGroup;
var score = 0;
let life = 3;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover = "Good Bye";
var r, a;
var position;
//let noloop;

function preload(){
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
fruit1Image = loadImage("fruit1.png");  
fruit2Image = loadImage("fruit2.png");
fruit3Image = loadImage("fruit3.png");  
fruit4Image = loadImage("fruit4.png");
obstacleImage = loadImage("obstacle.png");  
groundImage=loadImage("background_0.png");
redballoonImage = loadImage("red_balloon0.png");
blueballoonImage = loadImage("blue_balloon0.png");

  
 
}


function setup() {
createCanvas(600,600);
//creating ground
 ground = createSprite(0,0,600,600);
 ground.addImage("background_20.png",groundImage);
 ground.scale = 4.5
 

  //creating monkey
  monkey = createSprite(200,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating banana & obstacle group
  fruitGroup = createGroup();
  obstacleGroup = createGroup();

 
  
}


function draw() {
  
     // this is so that we can reset the ground to half its width.
      ground.velocityX=-5;
      if(ground.x < 0)
       {
       ground.x = ground.width/2;
       }
   
 // when we press the space command the monkey will move up. 
  if(keyDown("space"))
     {
     monkey.velocityY=-10;
     }  
  //to help pull the monkey down by gravity so it doesn't stay up.
  monkey.velocityY = monkey.velocityY+0.8;
  //this is so that when you press the left arrow on your keyboard the monkey moves left.
  if(keyDown("right")){
    monkey.velocityX=5;
  }
  if(keyDown("left")){
    monkey.velocityX=-5;
  }
  
  
     // this is to help generate the fruits and balloons at random positions
     r = Math.round(random(1,4));
     a = Math.round(random(1,2));
  //we are calling our functions before play State 
  
  food();
  objects();
 
  
  if(gamestate===PLAY){
    gameover.visible=false;
    
   //if the monkey touches a fruit then the monkey will get one point.
    if(fruitGroup.isTouching(monkey)){
      score=score+1;
      fruitGroup.destroyEach();
    }
 // Player has three lives when the Game starts. Player will loose one life if the monkey touches a balloon.
   if (obstacleGroup.isTouching(monkey)) { 
    
     life = life-1; 
     obstacleGroup.destroyEach();
   }  
    
     drawSprites();
   
  stroke("blue");
  textSize(30);
  fill("blue");
  text("Score " + score,350,40);

  stroke("black");
  textSize(30);
  fill("black");
  text("Life " + life,150,40);
   
} 
  // when the life count is zero "game over" message will display on the canvas. 
  if (life==0){
    gamestate=END
    
  }if(gamestate===END) {
  
  //    gameover.visible=true;
         
    monkey.destroy();
    fruitGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible=true;
      

    drawSprites();
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Gameover: " + gameover,200,300);
    
  }   
   
 
}
     
function food(){
  //this is to make sure the fruit appears for every 80 frames
   
 if(World.frameCount%60==0){
   position = Math.round(random(1,2));
   fruit = createSprite(400,400,10,10);
   fruit.scale=0.2;
   
   fruit.y = Math.round(random(100,200));
   fruit.velocityX=-2;
   
   fruit.setLifetime = 100; 
  
   
   if(r==1){
     fruit.addImage(fruit1Image);
   } else if(r ==2) {
      fruit.addImage(fruit2Image);
   } else if(r ==3) {
      fruit.addImage(fruit3Image);
   }  else if(r ==4) {
      fruit.addImage(fruit4Image);
   }
   
   fruitGroup.add(fruit);  
 }
  if(position==1)
  {
  fruit.x=400;
  //fruit.velocityX=-(7+(score/4));
  }
  else 
  {
  if(position==2){
    fruit.x=0;
  
   
  
  }
}
}


function objects(){
  // this to make sure the balloons appear after every 80 frames.   
 if(World.frameCount%80==0){
   position = Math.round(random(1,3));
   obstacle = createSprite(300,200,10,10);
   obstacle.scale=0.1;
   
   obstacle.y = Math.round(random(120,200));
   obstacle.velocityX=-2;
   
   obstacle.setLifetime = 100; 
  
   
   if(a==1){
     obstacle.addImage(redballoonImage);
   } else if(a ==2) {
     obstacle.addImage(blueballoonImage);
   } 
   
   obstacleGroup.add(obstacle);  
 }
}
