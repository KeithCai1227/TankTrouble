class Projectile {

    constructor(x, y, angle, duration) {
		this.x = x;
		this.y = y;
		this.duration = duration;
		this.despawnTime = millis() + (this.duration * 1000);
	}
	draw(){}
	update(){}
}
