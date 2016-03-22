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
            context.fillStyle = '#0000FF';
            context.strokeStyle = '#AAAAAA';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    context.fill();
                    context.stroke();
                }
            }
            context.closePath();

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
      

        public lastpoint :astar.Node=new astar.Node(1,1);
        public currentpoint :astar.Node = new astar.Node(1,1);
        public b_path : Array<astar.Node>;
        public count:number;
        
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
            
            this.displayObject.x = GRID_PIXEL_WIDTH * (path[2].x -1);
            this.displayObject.y = GRID_PIXEL_HEIGHT * (path[2].y -1);
            
            console.log(path);
            console.log(grid.toString());
            alert(grid.toString());
        }

        public onTicker(duringTime) {
            this.count ++;
            var direction = (this.currentpoint.x - this.lastpoint.x ,this.currentpoint.y - this.lastpoint.y);
            this.displayObject.vx = direction.x;
            this.displayObject.vy = direction.y;
            // this.displayObject.x += duringTime * this.displayObject.vx;
            // this.displayObject.y += duringTime * this.displayObject.vy;
            
            switch(this.count/100){
                case 1:
                    this.displayObject.x = GRID_PIXEL_WIDTH * (this.b_path[1].x -1);
                    this.displayObject.y = GRID_PIXEL_HEIGHT * (this.b_path[1].y -1);
                
               
            }
            
          
            
           
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