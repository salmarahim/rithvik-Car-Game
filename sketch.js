var car1,car1IMG,car2,car2IMG,thief,thiefIMG,police,policeIMG,play=1,pliceTXT,ThiefTXT,PoliceIXTIMG,thiefTXTIMG,backgroundIMG;
var police2,police2IMG,thief2,thief2IMG;
var winIMG,win,nitrus,nitrusIMG;
var BG,edges,sound1,sound2;
var gameState = "start";
var lose,loseIMG,reset,resetIMG;
var cargroup,count = 0;
var leftimg,rightimg;

function preload(){
    car1IMG = loadImage("Blue.png");
    car2IMG = loadImage("White.png");
    thiefIMG = loadImage("Thief.png");
    car1IMG = loadImage("Blue.png");
    policeTXTIMG = loadImage("policeButton.jpg");
    thiefTXTIMG = loadImage("thiefButton.PNG");
    thiefIMG = loadImage("Thief.png");
    backgroundIMG = loadImage("track.png");
    policeIMG = loadImage("Police.png");
    loseIMG = loadImage("lose.jpg");
    resetIMG = loadImage("reset.png");
    police2IMG = loadImage("Police.png");
    thief2IMG = loadImage("Thief.png");
    winIMG = loadImage("win.png");
    sound1=loadSound("crash.mp3");
    sound2=loadSound("haha.mp3");
    leftimg= loadImage("left.png");
    rightimg= loadImage("right.png");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    
    edges = createEdgeSprites();
    BG = createSprite(width/2,height/2,150,150);
    BG.addImage(backgroundIMG);
    BG.scale = 2.5;
    BG.velocityY = 1.5;
    policeTXT = createSprite(width/2,height/2+100,150,150);
    policeTXT.addImage(policeTXTIMG);
    policeTXT.visible = false;
    thiefTXT=createSprite(width/2,height/2+150,150,150);
    thiefTXT.addImage(thiefTXTIMG);
    thiefTXT.visible=false;
    thief  = createSprite(width/2,height/2-100,100,100);
    thief.addImage(thiefIMG);
    thief.debug = true;
    thief.scale=1.319
    thief.visible=false;
    police = createSprite(width/2,height/2+100,100,100)
    police.addImage(policeIMG);
    police.visible=false;
    cargroup = new Group();
    police2 = createSprite(width/2,height/2+200,150,150);
    police2.x = random(thief.x-25,thief.x+25);
    police2.addImage(police2IMG);
    police2.visible = false;
    thief2 = createSprite(width/2,height/2-200,150,150);
    thief2.x = random(250,700);
    thief2.scale = 1.8;
    thief2.addImage(thief2IMG);
    thief2.visible = false;
    lose = createSprite(width/2,height/2)
    lose.addImage(loseIMG)
    lose.scale = 0.5;
    reset = createSprite(width-150,50);
    reset.addImage(resetIMG);
    reset.scale = 0.3;
    lose.visible = false;
    reset.visible = false;
    win = createSprite(width/2,height/2)
    win.addImage(winIMG);
    win.visible = false;

    left=createSprite(100,height-200,50,50);
    left.addImage("l",leftimg);
    left.scale=0.2;
    right=createSprite(width-100,height-200,50,50)
    right.addImage("l",rightimg);
    right.scale=0.2
}

function draw(){
    background(0);
    //image(backgroundIMG,0,-displayHeight*4,displayWidth,displayHeight*5)
    police.bounceOff(edges[0]);
    thief.bounceOff(edges[0]);
    police.bounceOff(edges[1]);
    thief.bounceOff(edges[1]);
    if(gameState === "start"){
        policeTXT.visible = true;
        policeTXT.scale = 0.5;
        thiefTXT.visible = true;
        thiefTXT.scale = 1.45;
        if(mousePressedOver(thiefTXT)){
            gameState = "play1";
            thief.visible = true;

        }else if(mousePressedOver(policeTXT)){
            gameState= "play2";
            police.visible = true
        }
    }
    else if(gameState=== "play1"){
    spwancar();
    policeTXT.visible = false;
    thiefTXT.visible = false;
    
    //camera.position.x=thief.x;
    //camera.position.y=thief.y;
     
     if(BG.y>displayHeight){
         BG.y = BG.height/2;
     }

   if(keyDown(LEFT_ARROW)||mousePressedOver(left)||(touches.length>0&&x<150&&y<height/2)){
       thief.x = thief.x-25
       touches=[]
   }
   if(keyDown(RIGHT_ARROW)||mousePressedOver(right)||(touches.length>0&&x>width/2&&y<height/2)){
       thief.x=thief.x+25
       touches=[]
   }
   if(thief.isTouching(cargroup)){
    sound1.play();
       gameState="end";
   }
   police2.visible = true;
   if(frameCount%30===0){
       police2.x = thief.x;
   }
   police2.velocityY = 0;
   if(thief.isTouching(police2)){
    sound1.play();
       gameState="end";
   }
   if(thief.x>1500){
       gameState = "win";
       sound2.play();
   }
    }else if(gameState==="play2"){
        spwancar();
        policeTXT.visible = false;
        thiefTXT.visible = false;
    
   /*camera.position.x=police.x;
   camera.position.y=police.y;*/
   if(BG.y>displayHeight){
    BG.y = BG.height/2;
}
    
    if(keyDown(LEFT_ARROW)){
        police.x = police.x-10;
    }
    if(keyDown(UP_ARROW)){
        police.y = police.y - 10;
    }
    if(keyDown(RIGHT_ARROW)){
        police.x = police.x+10;
    }
    
    if(police.isTouching(cargroup)){
        sound1.play();
        gameState="end";
    }
    thief2.visible = true;
    thief2.velocityX = random(-1,1);
    if(police.isTouching(thief2)){
        count++
        if(count<50)sound1.play();
        thief2.velocityX = 0;
        gameState = "win";
        if(count>50&&count<100)sound2.play();
        
    }
}

else if(gameState==="end"){
    BG.velocityY = 0;
    lose.visible = true;
    reset.visible = true;
     cargroup.setVelocityYEach(0);
   
    }else if(gameState ==="win"){
        BG.velocityY = 0;
        win.visible = true;
        reset.visible = true;
     cargroup.setVelocityYEach(0);
    }
    if(mousePressedOver(reset)){
        cargroup.destroyEach();
        reset.visible = false;
        lose.visible = false;
        police.visible = false;
        police2.visible = false;
        thief.visible  = false;
        thief2.visible = false;
        BG.velocityY = 1.5;
        win.visible = false;
       /* if(gameState ==="win"){
            win.destroy()
        }
        if(gameState ==="end"){
            lose.destroy()
        }
        */
        gameState="start";
    }
    console.log(gameState)
    drawSprites();
}   
function spwancar(){
    if(frameCount%120===0){
car1 = createSprite(random(290,1100),camera.position.y-400)
car1.debug= true;
car1.setCollider("rectangle",0,0,200,350);
rand = Math.round(random(1,2))
if(rand===1){
    car1.addImage(car1IMG);
}else{
    car1.addImage(car2IMG)
}
car1.scale=0.45;
car1.velocityY = 2
cargroup.add(car1);
}}