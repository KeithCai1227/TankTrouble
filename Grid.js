let walls;
class Grid {
	current;
    constructor(gridHeight) {
        this.w = 80;
        this.cols = floor(gridHeight/this.w);
        this.rows = floor(width/this.w);
        this.celltack = [];
        this.grid = [];
        walls = new Group();
        walls.color = 'RGB(211, 111, 76)';
        walls.stroke = 'black';
        walls.strokeWeight = '3';
        walls.overlaps(walls);
        walls.collider = ('static');
        walls.autoDraw = false;
        walls.autoUpdate = false;
    }

    initGrid() {
        for(let y = 0; y < this.rows; y++){
            let row = [];
            for(let x = 0; x < this.cols; x++){
                row.push(new Cell(y, x, this.grid, this.cols, this.rows, this.w));
            }
            this.grid.push(row);
        }
        this.current = this.grid[0][0];
    }
    generateMap(){
        //do{
        this.current.visited++;
        
        let next = this.current.checkNeighbours();
        if(next){
            next.visited++;
            this.celltack.push(this.current);

            this.current.removeWall(next);

            this.current = next;
        }
        else if (this.celltack.length > 0){
            this.current = this.celltack.pop();
        }
    //}while(this.celltack != 0);
    }
    initMap(){
        do {
            this.generateMap();
        }while(this.celltack != 0);

        for(let i = 0; i < this.grid[0].length; i++){
            for(let j = 0; j < this.grid.length; j++){
            this.grid[j][i].show();
            }
        }
    }

    draw() {
        walls.draw();
    }

    update() {
        walls.update();
    }
}

