module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);

        }

        render(context: CanvasRenderingContext2D) {
            
            context.strokeStyle = '#AAAAAA';
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    context.beginPath();
                    if(this.grid.getNode(i,j).walkable == false){
                        context.fillStyle = '#000000';
                    }
                    else{
                        context.fillStyle = '#0000FF';
                    }
                    context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    context.fill();
                    context.stroke();
                    context.closePath();
                }
            }
        }
    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0 , Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {     //Body类在animation中，用于控制Body的实时位置渲染，Body中有一个displayObject属性
      

     //   public lastpoint :astar.Node=new astar.Node(1,1);
     //   public currentpoint :astar.Node = new astar.Node(1,1);
        public b_path : Array<astar.Node>;
        public count:number;
        public _dir:Vector2;
        
        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            this.b_path = path;
            this.count = 0;
           
            // for(var i = 0; i < path.length; i++){
            //     this.displayObject.x = GRID_PIXEL_WIDTH * (path[i].x -1);
            //     this.displayObject.y = GRID_PIXEL_HEIGHT * (path[i].y -1);
            // }
            //this.displayObject.x = GRID_PIXEL_WIDTH ;
            
            this.displayObject.x = GRID_PIXEL_WIDTH * (path[0].x -1);
            this.displayObject.y = GRID_PIXEL_HEIGHT * (path[0].y -1);
            
            console.log(path);
            console.log(grid.toString());
            alert(grid.toString());
        }

        public onTicker(duringTime) {
            this.count ++;
            
            //var direction = new Vector2(this.currentpoint.x - this.lastpoint.x ,this.currentpoint.y - this.lastpoint.y);
           // var direction:Vector2;
           
            // this.displayObject.x += duringTime * this.displayObject.vx;
            // this.displayObject.y += duringTime * this.displayObject.vy;
            if((this.count/100 > 0)&&(this.count/100 <1)){
                this._dir = new Vector2(this.b_path[1].x - this.b_path[0].x , this.b_path[1].y - this.b_path[0].y);

                console.log("1 "+this._dir);
            }
        
            if((this.count/100 > 1)&&(this.count/100 <2)){
                this._dir = new Vector2(this.b_path[2].x - this.b_path[1].x , this.b_path[2].y - this.b_path[1].y);

                console.log("2 "+this._dir);
            }
            if((this.count/100 > 2)&&(this.count/100 <3)){
                this._dir = new Vector2(this.b_path[3].x - this.b_path[2].x , this.b_path[3].y - this.b_path[2].y);
        
                console.log("3 "+this._dir);
            }
            if((this.count/100 > 3)&&(this.count/100 <4)){
                this._dir = new Vector2(this.b_path[4].x - this.b_path[3].x , this.b_path[4].y - this.b_path[3].y);

                console.log("4 "+this._dir);
            }
            if((this.count/100 > 4)&&(this.count/100 <5)){
                this._dir = new Vector2(this.b_path[5].x - this.b_path[4].x , this.b_path[5].y - this.b_path[4].y);

                console.log("5 "+this._dir);
            }
            if((this.count/100 > 5)&&(this.count/100 <6)){
                this._dir = new Vector2(this.b_path[6].x - this.b_path[5].x , this.b_path[6].y - this.b_path[5].y);
      
                console.log("6 "+this._dir);
            }
            if((this.count/100 > 6)&&(this.count/100 <7)){
                this._dir = new Vector2(this.b_path[7].x - this.b_path[6].x , this.b_path[7].y - this.b_path[6].y);
    
                console.log("7 "+this._dir);
            }
            if((this.count/100 > 7)&&(this.count/100 <8)){
                this._dir = new Vector2(this.b_path[8].x - this.b_path[7].x , this.b_path[8].y - this.b_path[7].y);
   
                console.log("8 "+this._dir);
            }
            if((this.count/100 > 8)&&(this.count/100 <9)){
                this._dir = new Vector2(this.b_path[9].x - this.b_path[8].x , this.b_path[9].y - this.b_path[8].y);
       
                console.log("9 "+this._dir);
            }
            if((this.count/100 > 9)&&(this.count/100 <10)){
                this._dir = new Vector2(this.b_path[10].x - this.b_path[9].x , this.b_path[10].y - this.b_path[9].y);
              
                console.log("10 "+this._dir);
            }
            if((this.count/100 > 10)&&(this.count/100 <11)){
                this._dir = new Vector2(this.b_path[11].x - this.b_path[10].x , this.b_path[11].y - this.b_path[10].y);
             
                console.log("11 "+this._dir);
            }
            if(this.count/100 > 11){
                this._dir = new Vector2(0,0);
            }
         
            
            this.vx = 3.1 * (this._dir.getX());
            this.vy = 3.1 * (this._dir.b);
            this.x += duringTime * this.vx;
            this.y += duringTime * this.vy;
            
            // switch(this.count/100){
            //     case 1:
            //         this.displayObject.x = GRID_PIXEL_WIDTH * (this.b_path[1].x -1);
            //         this.displayObject.y = GRID_PIXEL_HEIGHT * (this.b_path[1].y -1);
            // }
    
        }
    }
    
    
    export class Vector2{
        public a:number;
        public b:number;
        constructor(a :number,b :number){
            this.a = a;
            this.b = b;
        }
        toString(){
            return "(" + this.a + "," + this.b + ")";
        }
        
        public getX(): number {
            return this.a;
        }
        
        
    }
}




var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);


var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);