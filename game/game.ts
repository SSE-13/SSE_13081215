module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends render.DisplayObject {


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

    export class BoyShape extends render.DisplayObject {
        
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0 , Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {     //Body类在animation中，用于控制Body的实时位置渲染，Body中有一个displayObject属性
      
        public b_path : Array<astar.Node>;
        public count:number;
        
        public temp:number = 1;
       
        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.euclidian);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            this.b_path = path;
            this.count = 0;
          
            
            this.x = GRID_PIXEL_WIDTH * path[0].x;
            this.y = GRID_PIXEL_HEIGHT * path[0].y;
            
            console.log(path);
            console.log(grid.toString());
            alert("\nUse <euclidian> Method to find path:\n\n" + grid.toString());
        }

        public onTicker(duringTime) {
            
            if(this.temp < this.b_path.length - 1){
                var targetX = this.b_path[this.temp].x * GRID_PIXEL_WIDTH;
                var targetY = this.b_path[this.temp].y * GRID_PIXEL_HEIGHT;
                if(this.x < targetX){
                    this.x = (this.x + this.vx * duringTime > targetX) ? targetX : (this.x + this.vx * duringTime);
                }
                if(this.y < targetY){
                    this.y = (this.y + this.vy * duringTime > targetY) ? targetY : (this.y + this.vy * duringTime);
                }
                if(this.x == targetX && this.y == targetY){
                    this.temp ++;
                }
                
                console.log(this.temp,this.x,this.y);
        
            }
        }
    } 
}


function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {    
        for (var row = 0; row < cols; row++) { 
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);


            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}

function onTileClick(tile: editor.Tile) {
    
    var col = (tile.x)/(tile.width);
    var row = (tile.y)/(tile.height);
    
    console.log(row);
    console.log(col);
    console.log(mapData[row][col]);
    var current=0;
    if(mapData[row][col]==0){
       current=1; 
    }
    mapData[row][col] = current;
    tile.setWalkable(current);
   
}
/*
function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    console.log(content);
    
    var obj = JSON.parse(content);
    console.log(obj);
    
    var mapData = obj.map;
    console.log(mapData);
    return mapData;
}*/
var xmlHttp;
function readFile(){
     xmlHttp = new XMLHttpRequest();
     var url="map.json";
     xmlHttp.open("GET",url,true);
     xmlHttp.send(null);
     alert(xmlHttp.responseText);
     alert(readFile);
     return xmlHttp.responseText;
}


//var mapData = readFile();
var mapData = [[0,0,0,0,0],
           [0,1,1,1,0],
           [0,0,1,1,0],
           [0,0,1,0,0],
           [0,0,0,0,0]];
           
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();


/*

var world = new game.WorldMap();
var boyShape = new game.BoyShape();
var body = new game.BoyBody(boyShape);
body.run(world.grid);

renderCore.start(world);

var ticker = new Ticker();
ticker.start([body]);*/

var map = createMapEditor();

var container = new render.DisplayObjectContainer();
container.addChild(map);

container.x = 0;
container.y = 0;

renderCore.start(container);
