class GameSetup{

    //various params for layout of screen
    HEAD_TEXT = 75;
    REG_TEXT = 25;
    VERT_SP = 125;
    BELOW_TITLE = 225;
    HORZ1 = -100;
    HORZ2 = 50;
    HORZ3 = 300;
    HORZ4 = (this.HORZ2 + this.HORZ3)/2;

    //keeps track of which game setting user is on
    ON_MODE = 0;
    ON_P1DIFF = 1;
    ON_P2DIFF = 2;
    ON_START = 3;

    constructor(){
        //start off on the one-vs-two player mode setting
        this.selector = this.ON_MODE;

        //create canvas
        createCanvas(GameState.CANVAS_WIDTH, GameState.CANVAS_HEIGHT);
        displayMode('centered');
    }

    draw(){
        background(200, 200, 200);

        //display the game title
        strokeWeight(0);
        textFont('Courier New');
        fill('black');
        textStyle(BOLD);
        textSize(this.HEAD_TEXT);
        textAlign(CENTER, TOP);
        text('Tank Trouble', GameState.CANVAS_WIDTH/2, 25);

        //put in user selection box
        rectMode(CENTER);
        fill('black');
        rect(GameState.CANVAS_WIDTH/2 + this.HORZ4, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 500, 100);
        fill(200, 200, 200);
        rect(GameState.CANVAS_WIDTH/2 + this.HORZ4, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 490, 90);
        rect(GameState.CANVAS_WIDTH/2 + this.HORZ4, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 500, 50);
        rect(GameState.CANVAS_WIDTH/2 + this.HORZ4, this.BELOW_TITLE + this.selector*this.VERT_SP + this.REG_TEXT/2, 400, 100);

        //put in mode selection
        fill('black');
        textSize(this.REG_TEXT);
        textAlign(RIGHT, TOP);
        text('NUMBER OF PLAYERS:', GameState.CANVAS_WIDTH/2 + this.HORZ1, this.BELOW_TITLE);

        //put in difficulty selection
        text('PLAYER 1 DIFFICULTY:', GameState.CANVAS_WIDTH/2 + this.HORZ1, this.BELOW_TITLE + this.VERT_SP);
        text('PLAYER 2 DIFFICULTY:', GameState.CANVAS_WIDTH/2 + this.HORZ1, this.BELOW_TITLE + 2*this.VERT_SP);

        //put in player mode boxes
        textAlign(CENTER, TOP);
        //rect(this.CANVAS_WIDTH/2 - 50, 225, 200, this.REG_TEXT);
        text('ONE PLAYER', GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE);
        text('TWO PLAYER', GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE);

        //put in difficulty boxes
        text('EASY', GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE + this.VERT_SP);
        text('EASY', GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE + 2*this.VERT_SP);
        text('HARD', GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE + this.VERT_SP);
        text('HARD', GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE + 2*this.VERT_SP);

        //put in "start game"
        text('START GAME', GameState.CANVAS_WIDTH/2 + this.HORZ4, this.BELOW_TITLE + 3*this.VERT_SP);

        //highlight player mode selection
        fill('black');
        if(!GameState.twoPlayerMode){
            rect(GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE + this.REG_TEXT/2, 200, this.REG_TEXT + 25);
            fill('white');
            text('ONE PLAYER', GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE);
        }else{
            rect(GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE + this.REG_TEXT/2, 200, this.REG_TEXT + 25);
            fill('white');
            text('TWO PLAYER', GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE);
        }

        //highlight difficulty selection for player 1
        fill('black');
        if(GameState.player1Difficulty === GameState.EASY){
            rect(GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE + this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('EASY', GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE + this.VERT_SP);
        }else{
            rect(GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE + this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('HARD', GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE + this.VERT_SP);
        }

        //highlight difficulty selection for player 2
        fill('black');
        if(GameState.player2Difficulty === GameState.EASY){
            rect(GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE + 2*this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('EASY', GameState.CANVAS_WIDTH/2 + this.HORZ2, this.BELOW_TITLE + 2*this.VERT_SP);
        }else{
            rect(GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE + 2*this.VERT_SP + this.REG_TEXT/2, 100, this.REG_TEXT + 25);
            fill('white');
            text('HARD', GameState.CANVAS_WIDTH/2 + this.HORZ3, this.BELOW_TITLE + 2*this.VERT_SP);
        }

        //leave this back to default since it's used in drawing the tank sprites
        strokeWeight(1);
    }

    keyListening(){
        //move selector for game setting up and down
        if(keyCode === UP_ARROW && this.selector > this.ON_MODE){
            this.selector--;
        }else if(keyCode === DOWN_ARROW && this.selector < this.ON_START){
            this.selector++;
        }else if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW){
            //change appropriate settings
            if(this.selector === this.ON_MODE){
                GameState.twoPlayerMode = !GameState.twoPlayerMode;
            }else if(this.selector === this.ON_P1DIFF){
                GameState.player1Difficulty = 1 - GameState.player1Difficulty;
            }else if(this.selector === this.ON_P2DIFF){
                GameState.player2Difficulty = 1 - GameState.player2Difficulty;
            }
        }
    }

}