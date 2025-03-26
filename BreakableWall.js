class BreakableWall {
    constructor(x, y) {
        this.sprite = new Sprite(x, y, 50, 50);
        this.hitPoints = 3;
        this.takeDamage();
        this.updateColor();
    }

    takeDamage() {
        this.hitPoints--;
        this.updateColor();
        if (this.hitPoints <= 0) {
            this.sprite.remove();
        }
    }

    updateColor() {
        let bwcolor = map(this.hitPoints, 0, 3, 255, 100);
        this.sprite.color = color(bwshade);
    }
}

checkProjectileWallOverlaps() {
        for (let proj of this.projectileList) {
            for (let wall of this.mapTiles) {
                if (proj.sprite.overlapping(wall.sprite)) {
                    wall.takeDamage();
                }
            }
        }
}
