class Bullet extends Projectile {

    //lifespan of bullet in seconds
    static LIFESPAN = 10;

    constructor(x, y, angle) {
        super(x, y, angle, Bullet.LIFESPAN);
        this.bulletSprite = new Sprite();
        this.bulletSprite.x = x;
        this.bulletSprite.y = y;
        this.bulletSprite.duration = Bullet.LIFESPAN;
        this.bulletSprite.diameter = 10;
        this.bulletSprite.color = color(0, 0, 0);
        this.bulletSprite.direction = angle;
        this.bulletSprite.speed = 4;
        this.bulletSprite.bounciness = 1;
        this.bulletSprite.friction = 0;
        this.bulletSprite.autoUpdate = false;
        this.bulletSprite.autoDraw = false;
    }
    
    draw(){
        this.bulletSprite.draw();
    }
  
    update() {
        this.bulletSprite.update();

        //after half the life of bullet, shrink the bullet
        if(this.despawnTime - millis() < 0.5*1000*Bullet.LIFESPAN){
            this.bulletSprite.diameter -= 0.025;
        }
    }
}
