class GameFinish{

    gameWinnerX = 150;
    gameWinnerY = 350;
    drawX = 375;
    drawY = 350;
    gameCompleteX = 45;
    gameCompleteY = 200;
    newGameX = 265;
    newGameY = 500;
    newGameRectX = 480;
    newGameRectY = 515;
    newGameRectWidth = 450;
    newGameRectHeight = 60;
    
    constructor(){
        createCanvas(GameState.CANVAS_WIDTH, GameState.CANVAS_HEIGHT);
        displayMode('centered');
    }

    draw(){
        background(200, 200, 200);
        
        strokeWeight(10);
        fill('black');
        textFont('Courier New');
        textSize(110);
        text("GAME COMPLETE", this.gameCompleteX, this.gameCompleteY);

        // display the winner
        strokeWeight(0);
        textSize(80);
        if(GameState.currentWinner != "Draw") text(GameState.currentWinner + " wins!", this.gameWinnerX, this.gameWinnerY);
        else{
            text(GameState.currentWinner + "!", this.drawX, this.drawY);
        }

        rect(this.newGameRectX, this.newGameRectY, this.newGameRectWidth, this.newGameRectHeight);
        fill('white');
        textSize(30);
        text("Press Enter for New Game", this.newGameX, this.newGameY);

        // add selector if more options added to screen 

        strokeWeight(1);

    }


}