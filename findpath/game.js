var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
        }
        WorldMap.prototype.render = function (context) {
            context.strokeStyle = '#AAAAAA';
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    context.beginPath();
                    if (this.grid.getNode(i, j).walkable == false) {
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
    }(DisplayObject));
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
    }(DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
        }
        BoyBody.prototype.run = function (grid) {
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
            this.displayObject.x = GRID_PIXEL_WIDTH * (path[0].x - 1);
            this.displayObject.y = GRID_PIXEL_HEIGHT * (path[0].y - 1);
            console.log(path);
            console.log(grid.toString());
            alert(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            this.count++;
            //var direction = new Vector2(this.currentpoint.x - this.lastpoint.x ,this.currentpoint.y - this.lastpoint.y);
            var direction;
            // this.displayObject.x += duringTime * this.displayObject.vx;
            // this.displayObject.y += duringTime * this.displayObject.vy;
            if ((this.count / 10 > 0) && (this.count / 10 < 1)) {
                direction = new Vector2(this.b_path[1].x - this.b_path[0].x, this.b_path[1].y - this.b_path[0].y);
                this._dir = direction;
                console.log("1 " + direction);
            }
            if ((this.count / 10 > 1) && (this.count / 10 < 2)) {
                direction = new Vector2(this.b_path[2].x - this.b_path[1].x, this.b_path[2].y - this.b_path[1].y);
                this._dir = direction;
                console.log("2 " + direction);
            }
            if ((this.count / 10 > 2) && (this.count / 10 < 3)) {
                direction = new Vector2(this.b_path[3].x - this.b_path[2].x, this.b_path[3].y - this.b_path[2].y);
                this._dir = direction;
                console.log("3 " + direction);
            }
            if ((this.count / 10 > 3) && (this.count / 10 < 4)) {
                direction = new Vector2(this.b_path[4].x - this.b_path[3].x, this.b_path[4].y - this.b_path[3].y);
                this._dir = direction;
                console.log("4 " + direction);
            }
            if ((this.count / 10 > 4) && (this.count / 10 < 5)) {
                direction = new Vector2(this.b_path[5].x - this.b_path[4].x, this.b_path[5].y - this.b_path[4].y);
                this._dir = direction;
                console.log("5 " + direction);
            }
            if ((this.count / 10 > 5) && (this.count / 10 < 6)) {
                direction = new Vector2(this.b_path[6].x - this.b_path[5].x, this.b_path[6].y - this.b_path[5].y);
                this._dir = direction;
                console.log("6 " + direction);
            }
            if ((this.count / 10 > 6) && (this.count / 10 < 7)) {
                direction = new Vector2(this.b_path[7].x - this.b_path[6].x, this.b_path[7].y - this.b_path[6].y);
                this._dir = direction;
                console.log("7 " + direction);
            }
            if ((this.count / 10 > 7) && (this.count / 10 < 8)) {
                direction = new Vector2(this.b_path[8].x - this.b_path[7].x, this.b_path[8].y - this.b_path[7].y);
                this._dir = direction;
                console.log("8 " + direction);
            }
            if ((this.count / 10 > 8) && (this.count / 10 < 9)) {
                direction = new Vector2(this.b_path[9].x - this.b_path[8].x, this.b_path[9].y - this.b_path[8].y);
                this._dir = direction;
                console.log("9 " + direction);
            }
            if ((this.count / 10 > 9) && (this.count / 10 < 10)) {
                direction = new Vector2(this.b_path[10].x - this.b_path[9].x, this.b_path[10].y - this.b_path[9].y);
                this._dir = direction;
                console.log("10 " + direction);
            }
            if ((this.count / 10 > 10) && (this.count / 10 < 11)) {
                direction = new Vector2(this.b_path[11].x - this.b_path[10].x, this.b_path[11].y - this.b_path[10].y);
                this._dir = direction;
                console.log("11 " + direction);
            }
            //   console.log("SSSSSSSSSSSSSSSSSSS "+direction);
            this.vx = 2.5 * (this._dir.getX());
            this.vy = 2.5 * (this._dir.b);
            this.x += duringTime * this.vx;
            this.y += duringTime * this.vy;
            // switch(this.count/100){
            //     case 1:
            //         this.displayObject.x = GRID_PIXEL_WIDTH * (this.b_path[1].x -1);
            //         this.displayObject.y = GRID_PIXEL_HEIGHT * (this.b_path[1].y -1);
            // }
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
    var Vector2 = (function () {
        function Vector2(a, b) {
            this.a = a;
            this.b = b;
        }
        Vector2.prototype.toString = function () {
            return "(" + this.a + "," + this.b + ")";
        };
        Vector2.prototype.getX = function () {
            return this.a;
        };
        return Vector2;
    }());
    game.Vector2 = Vector2;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
var renderCore = new RenderCore();
renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
