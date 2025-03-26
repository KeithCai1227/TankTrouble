let size = 30;
let colourRed = 0;
let colourGreen = 0;
let colourBlue = 0;


function setup() {
  createCanvas(800, 600);
  background(240);
  
}

function draw() {

  if(keyIsDown(SHIFT) && keyIsDown(90)){
    background(240);
  }
  
  if(mouseIsPressed && !keyIsDown(SHIFT) ){
    noStroke();
    fill(colourRed, colourGreen, colourBlue);
    ellipse(mouseX, mouseY, size, size);
  }
  
  if(mouseIsPressed && keyIsDown(SHIFT) ){
    noStroke();
    fill(240);
    ellipse(mouseX, mouseY, size, size);
  }
  
  if(keyIsDown(UP_ARROW)){
    size += 2;
  }
  
  if(keyIsDown(DOWN_ARROW) && size > 0){
    size -= 2;
  }
  
  if(keyIsDown(82) && !keyIsDown(18) && colourRed < 256){
    colourRed += 2;
  }
  
  if(keyIsDown(71) && !keyIsDown(18) && colourGreen < 256){
    colourGreen += 2;
  }
  
  if(keyIsDown(66) && !keyIsDown(18) && colourBlue < 256){
    colourBlue += 2;
  }
  
  if(keyIsDown(82) && keyIsDown(18) && colourRed > 0){
    colourRed -= 2;
  }
  
  if(keyIsDown(71) && keyIsDown(18) && colourGreen > 0){
    colourGreen -= 2;
  }
  
  if(keyIsDown(66) && keyIsDown(18) && colourBlue > 0){
    colourBlue -= 2;
  }
  
  fill(240);
  noStroke();
  rect(20, 540, 200, 10)
  fill(0);
  stroke(255);
  let colourString = `G: ${colourGreen} B: ${colourBlue} R: ${colourRed}`
  text(colourString, 20, 550);
  
  text('Press UP/DOWN Keys for Brush size', 520, 500);
  text('R, B, G Keys to increase colour', 520, 520);
  text('ALT + R, B, or G to reduce colour', 520, 540)
  text('Hold shift to erase', 520, 560);
  text('SHIFT+ Z to reset canvas', 520, 580)
  
  
}