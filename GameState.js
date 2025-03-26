class GameState{
    projectileList;
    tankList;
    collectibleList;
    isGameOver;
    gameOverCnt;
    static CANVAS_WIDTH = 960;
    static GRID_HEIGHT = 480;
    static LOWER_PANEL_HT = 200;
    static CANVAS_HEIGHT = GameState.GRID_HEIGHT + GameState.LOWER_PANEL_HT;
    gameMap;
    RAND1X = floor(random(9, 11)); 
    RAND1Y = floor(random(1, 5)); 
    RAND2X = floor(random(1, 4));
    RAND2Y = floor(random(1, 5));
    TANK1X = this.RAND1X*80-40;
    TANK1Y = this.RAND1Y*80-40;
    TANK2X = this.RAND2X*80-40;
    TANK2Y = this.RAND2Y*80-40;
    ANGLE1 = atan2(this.TANK2Y - this.TANK1Y, this.TANK2X - this.TANK1X);
    ANGLE2 = atan2(this.TANK1Y - this.TANK2Y, this.TANK1X - this.TANK2X);
    TANK1ROT = this.ANGLE1;
    TANK2ROT = this.ANGLE2;
    static HARD = 0;
    static EASY = 1;


    //initial values for the game settings
    static player1Difficulty = GameState.EASY;
    static player2Difficulty = GameState.EASY;
    static twoPlayerMode = true;
    static currentWinner;
    
    constructor(){ 
        this.isGameOver = false;
        this.gameOverCnt = 0;
        
        //create empty lists for projectiles and collectibles
        this.projectileList = [];
        this.collectibleList = [];
        
        //generate map
        this.gameMap = new Grid(GameState.GRID_HEIGHT);
        this.gameMap.initGrid();
        this.gameMap.initMap();
        
        //create two tanks
        this.tankList = [];
        let tank1 = new Tank(this.TANK1X, this.TANK1Y, this.TANK1ROT, GameState.player1Difficulty, 1);
        this.tankList.push(tank1);
        let tank2 = new Tank(this.TANK2X, this.TANK2Y, this.TANK2ROT, GameState.player2Difficulty, 2);
        this.tankList.push(tank2);

        //create new KeyListener object for the first tank
        let keyListener1, keyListener2;
        keyListener1 = new KeyListener(this.tankList[0], true);

        //create KeyListener for second tank if two player mode is true 
        if(GameState.twoPlayerMode){
            keyListener2 = new KeyListener(this.tankList[1], false);
        }
        
        //create two Player objects
        this.player1 = new Player(GameState.player1Difficulty, true, keyListener1);
        this.player2 = new Player(GameState.player2Difficulty, GameState.twoPlayerMode, keyListener2);
        
    }
    
    draw(){
        background(200, 200, 200);
        
        //draw the map
         this.gameMap.draw();
         
        //draw tanks
        for(let i = 0; i < this.tankList.length; i++){
                this.tankList[i].draw();
        }
        
        //draw projectiles
        for(let i = 0; i < this.projectileList.length; i++){
            this.projectileList[i].draw();
        } 
        
        //draw collectibles
        for(let i = 0; i < this.collectibleList.length; i++){
            this.collectibleList[i].draw();
        }

        //draw scores of players
        this.drawHUD();
    }
    
    update(){
        //update map
        this.gameMap.update();
        
        //update tanks
        for(let i = 0; i < this.tankList.length; i++){
            this.tankList[i].update();
        }
        
        //update projectiles
        for(let i = 0; i < this.projectileList.length; ){
            if (this.projectileList[i].despawnTime < millis()) {
                this.projectileList[i].bulletSprite.remove();
                this.projectileList.splice(i, 1);
            }
            else {
                this.projectileList[i].update();
                i++;
            }
        } 
        
        //update collectibles
        for(let i = 0; i < this.collectibleList.length; i++){
            this.collectibleList[i].update();
        }
    
        //update tank movements based on user key presses
        this.player1.respondToPlayerInput();
        this.player2.respondToPlayerInput();
        
        //collision checks
        this.checkProjectileTankOverlaps();
        this.checkProjectileWallOverlaps();

        //restart game if tank life is 0
        for(let i = 0; i < this.tankList.length; i++){
            if(this.tankList[i].getLife() === 0){
                //to ensure the score is not updated during the restart "wait time"
                if(!this.isGameOver){
                    //update the relevant score
                    i == 0 ? this.player2.incScore() : this.player1.incScore();
                }

                this.isGameOver = true;
                //get rid of all current projectiles
                for(let j = 0; j < this.projectileList.length; j++){
                    this.projectileList[j].bulletSprite.remove();
                }

                this.restartGame();
                for(let j = 0; j < this.tankList.length; j++){
                    this.tankList[j].lifeRefresh();
                }

            }
        }

        this.setCurrentWinner();

    }
    
    addProjectile(newProjectile){
        this.projectileList.push(newProjectile);
    }

    getIsGameOver(){
        return this.isGameOver;
    }

    getGameOverCnt(){
        return this.gameOverCnt;
    }

    setCurrentWinner(){
        if(this.player1.getScore() > this.player2.getScore()) GameState.currentWinner = "Player 1";
        else if(this.player1.getScore() < this.player2.getScore()){
            GameState.currentWinner = "Player 2";
        }
        else{
            GameState.currentWinner = "Draw";
        }
    }

    //restart game when tank dies
    restartGame(){
    // wait 2 seconds before restart
        setTimeout (() => {
            //only refresh map once
            if(this.isGameOver){
                walls.remove();
                this.gameMap = new Grid(GameState.GRID_HEIGHT);
                this.gameMap.initGrid();
                this.gameMap.initMap();
            }
            for(let i = 0; i < this.tankList.length; i++){
                //complete destroy method in tank class
                //change position refresh when tank spawn implemented
                //for now back to original positions
                this.tankList[i].positionRefresh();
                this.tankList[i].numberOfRoundsRefresh();
            }
             //increment every time a game is won 
             this.gameOverCnt++;
             this.isGameOver = false;
        }, 2000);
      
    }
    
    checkProjectileTankOverlaps(){
        for (let i = 0; i < this.tankList.length; i++) {
            for (let j = 0; j < this.projectileList.length; ) {
                if (this.projectileList[j].bulletSprite.collides(this.tankList[i].tankSprite)) {
                    this.projectileList[j].bulletSprite.remove();
                    this.projectileList.splice(j, 1);
                    this.tankList[i].lifeDecrement();
                } else j++;
            }
        }
    }
    
    //for now - empty
    checkProjectileWallOverlaps(){
        for(let wall of walls){
            if(!wall.outerWall){
                for(let projectile of this.projectileList){
                    if(wall.collides(projectile.bulletSprite)){
                        wall.remove();
                    }
                }
            }
        }
    }

    drawHUD(){
        //obtain strings for scores
        let scoreString1 = "Score : ";
        let scoreString2 = "Score : ";
        if(!GameState.twoPlayerMode) scoreString2 = "CPU Score : ";
        let hitPointString = "Health : ";
        let ammoString = "Ammo : ";
        scoreString1 = scoreString1.concat(this.player1.getScore().toString());
        scoreString2 = scoreString2.concat(this.player2.getScore().toString());
        let hitPointString1 = hitPointString.concat(this.tankList[0].getLife().toString());
        let hitPointString2 = hitPointString.concat(this.tankList[1].getLife().toString());
        let ammoString1 = ammoString.concat(this.tankList[0].getAmmo().toString());
        let ammoString2 = ammoString.concat(this.tankList[1].getAmmo().toString());

        //display scores below the grid
        let xMargin = 25;
        let yMargin = 25;
        textFont('Courier New');
        fill('black');
        textStyle(BOLD);
        textSize(GameState.LOWER_PANEL_HT/4 - yMargin);
        textAlign(RIGHT, TOP);
        text(scoreString1, GameState.CANVAS_WIDTH - xMargin, GameState.GRID_HEIGHT + yMargin);
        text(hitPointString1, GameState.CANVAS_WIDTH - xMargin, GameState.GRID_HEIGHT + yMargin + ((GameState.LOWER_PANEL_HT/4 - yMargin) * 1.3));
        text(ammoString1, GameState.CANVAS_WIDTH - xMargin, GameState.GRID_HEIGHT + yMargin + ((GameState.LOWER_PANEL_HT/4 - yMargin) * 2.6));
        textAlign(LEFT, TOP);
        text(scoreString2, xMargin, GameState.GRID_HEIGHT + yMargin);
        text(hitPointString2, xMargin, GameState.GRID_HEIGHT + yMargin + ((GameState.LOWER_PANEL_HT/4 - yMargin) * 1.3));
        text(ammoString2, xMargin, GameState.GRID_HEIGHT + yMargin + ((GameState.LOWER_PANEL_HT/4 - yMargin) * 2.6));
    }
}
