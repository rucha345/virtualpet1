//Create variables here
var dog, dogImg, dogImg1;
var database, foodS, foodStock;
function preload()
{
  dogImg=loadImage("dogImg.png");
  dogImg1=loadImage("dogImg1.png");
}

function setup() {

  database=firebase.database();
  createCanvas(800, 700);
  

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  textSize(20); 
}


function draw() {  
background("brown");

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogImg1);
}

drawSprites();
  fill("255,255,254");
 // stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press Up Arrow Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}



