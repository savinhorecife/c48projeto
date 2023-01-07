var jumpmusic,diemusic,pointmusic;

var gameover,gameoverimg,restart,restartimg;

var obstaclegroup,cloudgroup;

var PLAY=1;

var END=0;

var gamestate=PLAY

var score=0

var obstaculo,obs1,obs2,obs3,obs4,obs5,obs6

var ground,groundimg,groundinvisible;

var link, link_img, edges, linkimg;

var nuvem, nuvem_img;

function preload(){
    //carregar as imagens e animações do código

    link_img = loadAnimation("link.png","link.png","link.png");
    linkimg = loadAnimation("link2.png");

    groundimg=loadImage ("bg.png") 
    nuvem_img=loadImage ("cloud.png") 

    obs1=loadImage ("dark.png")
    obs2=loadImage ("dark.png")
    obs3=loadImage ("dark.png")
    obs4=loadImage ("dark.png")
    obs5=loadImage ("dark.png")
    obs6=loadImage ("dark.png")

    gameoverimg=loadImage ("gameOver.png")
    restartimg=loadImage ("restart.png")

    jumpmusic=loadSound("jump.mp3");
    diemusic=loadSound("die.mp3");
    pointmusic=loadSound("checkPoint.mp3");
}

function setup(){
    //criar os componentes

    createCanvas(windowWidth,windowHeight);

    //criar o link
    link = createSprite(100,height-70,20,50);

    link.addAnimation("correndo", link_img);
    link.addAnimation("colidindo",linkimg)
    link.scale = 0.4;
    link.setCollider("circle",0,0,40)
    //link.debug="true"

    ground=createSprite(618,450,windowWidth,windowHeight);
    ground.scale=2
    ground.addImage(groundimg);

    groundinvisible=createSprite(width/2,height-40,width,10);
    groundinvisible.visible=false;

    obstaclegroup = new Group();
    cloudgroup = new Group();

    gameover=createSprite(width/2,height/2);
    gameover.addImage(gameoverimg);

    restart=createSprite(width/2,height/2+50);
    restart.addImage(restartimg);

  // a mensagem e uma variavel local 
  var mensagem = "isto e uma mesagem";
  console.log(mensagem)
  link.depth=ground.depth;
  link.depth=link.depth+1
  
   
}

function draw(){
  //crio o jogo em si
  background("white");
  textSize(25);
  text("score:"+score,width-200,50);
  
  console.log("isto é:"+gamestate)

  if (gamestate===PLAY){
    score = score + Math.round(getFrameRate()/60);

    if (score>0 && score%1000===0){
    pointmusic.play();  
    }

    gameover.visible=false
    restart.visible=false
  
    //movimentando o solo em direção ao link
    ground.velocityX=+4;
  
    //reiniciando a posição do solo
   if (ground.x>1000){
    ground.x=800;
    }

    //fazer o link saltar
    if(touches.length > 0 ||  keyDown("space") && link.y>height-100){
        link.velocityY = -15;
      jumpmusic.play();  
      touches  = [] ;
    }
    //gravidade
    link.velocityY = link.velocityY + 0.5;
    
    //chamar a função
    
    gerarobstaculos();

    if (obstaclegroup.isTouching(link)){
    gamestate = END;
    diemusic.play();
     
    }
 
    } 

    else if (gamestate===END){
     ground.velocityX=0;
     link.velocityY=0;
     
    link.changeAnimation("colidindo",linkimg);

    gameover.visible=true
    restart.visible=true
  

    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset (); 
     }

     if(touches.length > 0 ||  keyDown("space")) {
      reset();
      touches = []
     }
   
    }

  
  //link colide com a parede
  link.collide(groundinvisible);

   
  drawSprites();
}

function reset () {
gamestate = PLAY;
gameover.visible = false;
restart.visible = false;
obstaclegroup.destroyEach();
cloudgroup.destroyEach();
link.changeAnimation("correndo",link_img);
score = 0
}

//função para gerar nuvens



 function gerarobstaculos(){
if (frameCount % 90 === 0){  
 obstaculo = createSprite(width,height-60,10,40)
 obstaculo.velocityX = -(5+score/1000)  
 
 var sorteio =Math.round(random(1,6));
 switch(sorteio){
 case 1:obstaculo.addImage(obs1);
 break;
 case 2:obstaculo.addImage(obs2);
 break;  
 case 3:obstaculo.addImage(obs3);
 break;
 case 4:obstaculo.addImage(obs4);
 break;
 case 5:obstaculo.addImage(obs5);
 break;
 case 6:obstaculo.addImage(obs6);
 break;
 default:break;
 }
 obstaculo.scale=0.3
 obstaculo.lifetime=width/2

 obstaclegroup.add(obstaculo);
}


 }