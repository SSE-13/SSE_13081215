var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 6;
    var NUM_COLS = 6;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if (mapData[i][j] == 0) {
                        grid.setWalkable(j, i, false);
                    }
                    else {
                        grid.setWalkable(j, i, true);
                    }
                }
            }
        }
        WorldMap.prototype.render = function (context) {
            context.strokeStyle = '#AAAAAA';
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    context.beginPath();
                    if (this.grid.getNode(i, j).walkable == false) {
                        console.log("ffffff");
                        context.fillStyle = '#000000';
                    }
                    else {
                        context.fillStyle = '#0000FF';
                    }
                    context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    context.fill();
                    context.stroke();
                    context.closePath();
                }
            }
        };
        return WorldMap;
    }(render.DisplayObject));
    game.WorldMap = WorldMap;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(render.DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.temp = 0;
        }
        BoyBody.prototype.run = function (grid, sPoint, ePoint) {
            this.temp = 0;
            grid.setStartNode(sPoint.x, sPoint.y);
            grid.setEndNode(ePoint.x, ePoint.y);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.euclidian);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            this.b_path = path;
            this.x = GRID_PIXEL_WIDTH * path[0].x;
            this.y = GRID_PIXEL_HEIGHT * path[0].y;
            console.log(path);
            console.log(grid.toString());
            alert("\nUse <euclidian> Method to find path:\n\n" + grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            if (this.temp < this.b_path.length) {
                var targetX = this.b_path[this.temp].x * GRID_PIXEL_WIDTH;
                var targetY = this.b_path[this.temp].y * GRID_PIXEL_HEIGHT;
                if (this.x < targetX) {
                    this.x = (this.x + this.vx * duringTime > targetX) ? targetX : (this.x + this.vx * duringTime);
                }
                if (this.y < targetY) {
                    this.y = (this.y + this.vy * duringTime > targetY) ? targetY : (this.y + this.vy * duringTime);
                }
                if (this.x > targetX) {
                    this.x = (this.x - this.vx * duringTime < targetX) ? targetX : (this.x - this.vx * duringTime);
                }
                if (this.y > targetY) {
                    this.y = (this.y - this.vy * duringTime < targetY) ? targetY : (this.y - this.vy * duringTime);
                }
                if (this.x == targetX && this.y == targetY) {
                    this.temp++;
                }
                console.log(this.temp, this.x, this.y);
            }
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    game.Point = Point;
})(game || (game = {}));
function createMapEditor(storage_data, isBackgroundOrProp) {
    var world = new editor.WorldMap();
    var rows = storage_data.length;
    var cols = storage_data[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            if (isBackgroundOrProp) {
                tile.setWalkable(storage.s_layer1[row][col]);
            }
            else {
                tile.setProp(storage.s_layer0[row][col]);
            }
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
function onTileClick(tile) {
    var col = (tile.x) / (tile.width); //第几列
    var row = (tile.y) / (tile.height); //第几排
    console.log(tile);
    if (mapData[row][col] == 1) {
        gridMap = new game.WorldMap();
        var x = Math.round(body.y / 50);
        var y = Math.round(body.x / 50);
        console.log("target： " + x + "," + y);
        var p1 = new game.Point(y, x);
        var p2 = new game.Point(col, row);
        body.run(gridMap.grid, p1, p2);
    }
}
var mapData = [[1, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1]];
var background;
var prop;
var storage = data.Storage.getInstance();
var onLoadScene = function () {
    mapData = storage.s_layer1;
    console.log(mapData);
    background = createMapEditor(storage.s_layer1, true);
    prop = createMapEditor(storage.s_layer0, false);
    container.addChild(background);
    container.addChild(prop);
    container.addChild(boyShape);
};
storage.GetJson(onLoadScene);
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var start = new game.Point(3, 3);
var end = new game.Point(5, 3);
var gridMap = new game.WorldMap();
var boyShape = new game.BoyShape();
var body = new game.BoyBody(boyShape);
body.run(gridMap.grid, start, end);
var container = new render.DisplayObjectContainer();
container.addChild(boyShape);
container.x = 50;
container.y = 0;
renderCore.start(container, ["0.jpg", "1.jpg", "2.png", "3.png"]); //"0.jpg":grass   "1.jpg":wall         "2.png":transparent   "3.png":zombie
var ticker = new Ticker();
ticker.start([body]);
