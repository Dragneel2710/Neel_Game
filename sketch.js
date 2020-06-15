var spaceS,spaceI;

var AST,ASTR;

var scale;

var backgroundIMG;

var GameState;

var Lives = 3;

var score;

var bullet,bulletI;

var button,buttonI;

function setup() {
  createCanvas(500,500);

  spaceS = createSprite(250, 250, 50, 50);
  spaceS.addImage(spaceI);
  spaceS.scale = 1.5
  //spaceS.shapeColor = "white";

  AST = createSprite(1,1,1,1);
  AST.addImage(ASTR);
  AST.visible = false;
  AST.scale = 0.5;

  bullet = createSprite(1,1,1,1);
  bullet.addImage(bulletI)
  
  GameState = "Begin";

  score = -5;

  AST.debug = true;
  AST.setCollider("rectangle", 40, 10, 0, 0);
  //spaceS.debug = true;
  //bullet.debug = true;

  button = createSprite(250,250,40,10);
}

function preload(){
  spaceI = loadImage("SS.png");

  ASTR = loadImage("sprite_0.png");

  backgroundIMG = loadImage("space.png");
  
  bulletI = loadImage("bullet.png");

  buttonI = loadImage("playbutton.png");
}

function draw() {
  background(backgroundIMG);  

  if(GameState === "Begin"){
    //button = createSprite(250,250,40,10);
    button.addImage(buttonI);
    if(mousePressedOver(button)){
      //console.log("get");
      GameState = "PLAY"
    }
  }
  else if(GameState === "PLAY"){
    button.destroy();
    if(keyDown(LEFT_ARROW)){
      spaceS.x = spaceS.x + -7.5;
    }
    else if(keyDown(RIGHT_ARROW)){
      spaceS.x = spaceS.x + 7.5;
    }
    else if(keyDown(UP_ARROW)){
      spaceS.y = spaceS.y + -7.5;
    }
    else if(keyDown(DOWN_ARROW)){
      spaceS.y = spaceS.y + 7.5;
    }
  
    if(keyWentDown("W")){
      bullet = createSprite(200,350,10,10);
      bullet.velocityY = -5;
      bullet.x = spaceS.x;
      bullet.y = spaceS.y;
      bulletI = loadImage("bullet.png");
      bullet.addImage(bulletI)
    }
  
    if(keyWentDown("s")){
      bullet = createSprite(200,350,10,10);
      bullet.x = spaceS.x;
      bullet.y = spaceS.y;
      bulletI = loadImage("bullet.png");
      bullet.addImage(bulletI)
      bullet.velocityY = 5;
    }
  
    if(keyWentDown("a")){
      bullet = createSprite(200,350,10,10);
      bullet.x = spaceS.x;
      bullet.y = spaceS.y;
      bullet.velocityX = -5;
      bulletI = loadImage("bullet.png");
      bullet.addImage(bulletI)
      bullet.rotation = 90;
    }
  
    if(keyWentDown("d")){
      bullet = createSprite(200,350,10,10);
      bullet.x = spaceS.x;
      bullet.y = spaceS.y;
      bullet.velocityX = 5;
      bulletI = loadImage("bullet.png");
      bullet.addImage(bulletI)
      bullet.rotation = 90;
    }
  
    SpawnOB();

    text("Score_" + score,300,10);
    text("Lives_" + Lives,300,20);
  
    //mousePressed();
  
    AST.scale = AST.scale + 0.02;
  
    Delete();
  
    console.log(AST.scale);

    if(AST.isTouching(spaceS)){
      Lives = Lives - 1;
      console.log(Lives);
      score = score - 5;
      AST.destroy();
      if(Lives === 0){
        GameState = "END";
      }
    }

    if(bullet.isTouching(AST)){
      AST.destroy();
      score = score + 10;
    }

  }
  else if(GameState === "END"){
   spaceS.destroy();
   AST.destroy();
   background("white");
   textSize(25);
   fill("Red");
   text("GAME OVER",200,200);
   text ("Your Score_" + score,200,250);
  }

  drawSprites();
}

function SpawnOB(){
  if(World.frameCount % 120 === 0){
    AST = createSprite(10,10,50,50);
    AST.x = random(0,500);
    AST.y = random(0,500);
    AST.addImage(ASTR);
    AST.visible = true;
    AST.scale = 0.6;
  }
}

function Delete(){
  if(AST.scale > 2.6){
    AST.destroy();
  }
}

function mousePressed(){
}
