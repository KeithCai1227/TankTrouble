class Tank{

    tankWeapon; //which particular type of weapon the tank has
    tankSprite; //sprite created with P5 Play
    static TANK_HEIGHT = 30;
    static TANK_WIDTH = 20;
    static GUN_HEIGHT = 6;
    static GUN_WIDTH = 8;
    static PROJECTILE_SPAWN_DIST = 6;
    static UP_DIRECTION = 0;
    static DOWN_DIRECTION = 1;
    static LEFT_DIRECTION = 2;
    static RIGHT_DIRECTION = 3;
    static NO_DIRECTION = 4;
    
    //locX and locY are the initial co-ordinates
    //initialDirection is the initial direction the tank is pointing in
    //initialDirection should be in degrees measured clockwise from x-axis
    constructor(locX, locY, initialDirection, difficultyLevel, index){
        this.tankWeapon = new Weapon(Weapon.BULLET_TYPE);

        //create a sprite in P5 Play for the tank
        this.tankSprite = new Sprite();
        this.tankSprite.x = locX;
        this.INITIALX = locX;
        this.tankSprite.y = locY;
        this.INITIALY = locY;
        this.tankSprite.width = Tank.TANK_HEIGHT;
        this.tankSprite.height = Tank.TANK_WIDTH;
        this.tankSprite.addCollider((Tank.GUN_HEIGHT + Tank.TANK_HEIGHT)/2, 0, Tank.GUN_HEIGHT, Tank.GUN_WIDTH);
        this.tankSprite.autoUpdate = false;
        this.tankSprite.autoDraw = false;
        this.tankSprite.rotationLock = true;
        this.tankSprite.speed = 0;
        this.tankSprite.rotation = initialDirection;
        this.INITIALROTATION = initialDirection;
        if(index === 1){
            this.tankSprite.color = color(240, 0, 0);
        } else this.tankSprite.color = color(0, 240, 0);

        //set the tank's speed and life based on the difficulty level
        if(difficultyLevel == GameState.EASY){
            this.tankLife = 3;
            this.spdFactor = 4;
            this.tankWeapon.capacity = 10;
        } else if(difficultyLevel == GameState.HARD){
            this.tankLife = 1;
            this.spdFactor = 2;
            this.tankWeapon.capacity = 5;
        }
        this.initialLife = this.tankLife;
    }
    
    draw(){
        //call the draw method of the underlying sprite
        this.tankSprite.draw();
    }
    canFire(){
        return (this.tankWeapon.numberOfRounds < this.tankWeapon.capacity);
    }

    fire(){
        //Create new projectile according to appropriate weapon type
        let projDist = Tank.TANK_HEIGHT/2 + Tank.GUN_HEIGHT + Tank.PROJECTILE_SPAWN_DIST;
        let projX = this.tankSprite.x + projDist*cos(this.tankSprite.rotation);
        let projY = this.tankSprite.y + projDist*sin(this.tankSprite.rotation); 
        if(this.tankWeapon.weaponType == Weapon.BULLET_TYPE){
            this.tankWeapon.numberOfRounds++;
            return new Bullet(projX, projY, this.tankSprite.rotation);
        }
        else if(this.tankWeapon.weaponType == Weapon.LASER_TYPE){
            this.tankWeapon.numberOfRounds++;
            return new Laser(projX, projY, this.tankSprite.rotation);
        }
    }

    lifeDecrement(){
        this.tankLife--;
    }

    // life refresh when game restarts
    lifeRefresh(){
        this.tankLife = this.initialLife;
    }

    getLife(){
        return this.tankLife;
    }

    getAmmo(){
        return this.tankWeapon.getAmmo();
    }

    numberOfRoundsRefresh(){
        this.tankWeapon.numberOfRounds = 0;
    }

    //refresh positions when game restarts
    positionRefresh(){
        this.tankSprite.x = this.INITIALX;
        this.tankSprite.y = this.INITIALY;
        this.tankSprite.rotation = this.INITIALROTATION;
    }

    //animates tank destruction
    destroy(){
        //AT THE MOMENT NO ANIMATION IS DISPLAYED
    }
    
    update(){
        //call the update method of the underlying sprite
        this.tankSprite.update();
    }
    
    //updates the rotation and speed attributes of the tank sprite
    //directionOfMove corresponds to either UP, DOWN, LEFT or RIGHT
    move(directionOfMove){
        if(directionOfMove == Tank.RIGHT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation += 1*this.spdFactor;
            else this.tankSprite.rotation += 2*this.spdFactor;
        }
        if(directionOfMove == Tank.LEFT_DIRECTION){
            if (this.tankSprite.speed === 0) this.tankSprite.rotation -= 1*this.spdFactor;
            else this.tankSprite.rotation -= 2*this.spdFactor;
        }
        if(directionOfMove == Tank.UP_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = 1*this.spdFactor;
        }
        else if(directionOfMove == Tank.DOWN_DIRECTION){
            this.tankSprite.direction = this.tankSprite.rotation;
            this.tankSprite.speed = -0.5*this.spdFactor;
        }
        else {
            this.tankSprite.speed = 0;
        }
    }
}
