var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        Tile.prototype.setWalkable = function (value) {
            this.color = value ? "#0000FF" : "#FF0000";
        };
        return Tile;
    }(render.Rect));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel(mapData, mapEditor) {
            _super.call(this);
            var row = new render.TextField;
            row.text = "行：";
            //row.width = 100;
            //row.height = 30;
            row.x = 0;
            row.y = 100;
            this.addChild(row);
            var col = new render.TextField;
            col.text = "列: ";
            //col.width = 100;
            //col.height = 30;
            col.x = 0;
            col.y = 200;
            this.addChild(col);
            var isWalk = new render.TextField;
            isWalk.text = "是否可以走: ";
            //isWalk.width = 100;
            //isWalk.height = 30;
            isWalk.x = 0;
            isWalk.y = 300;
            this.addChild(isWalk);
            var xtext = new render.TextField;
            var ytext = new render.TextField;
            xtext.x = 30;
            xtext.y = 0;
            ytext.x = 30;
            ytext.y = 100;
            this.addChild(xtext);
            this.addChild(ytext);
            var button = new ui.Button();
            button.text = " ";
            button.width = 100;
            button.height = 30;
            button.x = 0;
            button.y = 320;
            this.addChild(button);
            /*button.onClick = ()=> {
                if(button.background.color = "#0000FF"){
                    button.background.color = "#FF0000";
                }
                else{
                    button.background.color = "#0000FF";
                }
                }
                */
            var source = new render.TextField;
            source.text = "网格素材: ";
            //source.width = 100;
            //source.height = 30;
            source.x = 0;
            source.y = 400;
            this.addChild(source);
            var sourcebutton = new ui.Button;
            sourcebutton.width = 100;
            sourcebutton.height = 30;
            sourcebutton.x = 0;
            sourcebutton.y = 420;
            this.addChild(sourcebutton);
            /* sourcebutton.onClick = () =>{
                 if(sourcebutton.background.color = "#0000FF"){
                     sourcebutton.background.color = "FF0000";
                     //sourcebutton.judge = false;
                 }
                 else{
                 sourcebutton.background.color = "#0000FF";
                 sourcebutton.judge = true;
                 }
                 */
            var save = new render.Bitmap();
            save.x = 0;
            save.y = 450;
            this.addChild(save);
            var undo = new render.Bitmap();
            undo.x = 0;
            undo.y = 500;
            this.addChild(undo);
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
