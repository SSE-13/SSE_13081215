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
            this.stroke = new render.Bitmap("Stroke.png", "stroke");
        }
        WorldMap.prototype.getChild = function (row, col) {
            var rows = mapData.length;
            var cols = mapData[0].length;
            return this.children[row * cols + col];
        };
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Mapdata = (function () {
        function Mapdata(material, walkable) {
            this.material = material;
            this.walkable = walkable;
        }
        return Mapdata;
    }());
    editor.Mapdata = Mapdata;
    var Material = (function () {
        function Material(source, name, walkable) {
            this.material = new render.Bitmap(source, name);
            this.walkable = walkable;
        }
        Material.prototype.setWalkable = function (walkable) {
            this.walkable = walkable;
        };
        Material.prototype.IsWalkableMaterial = function () {
            return this.walkable;
        };
        return Material;
    }());
    editor.Material = Material;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this, "cement.jpg", "Tile");
        }
        Tile.prototype.setWalkable = function (value) {
            if (value == 0) {
                this.material = new Material("cement.jpg", "cement", value);
            }
            else {
                this.material = new Material("water.jpg", "water", value);
            }
            this.source = this.material.material.source;
            this.name = this.material.material.name;
            this.walkable = value;
        };
        Tile.prototype.setMaterial = function (material) {
            this.material = material;
            this.source = this.material.material.source;
            this.name = this.material.material.name;
            this.walkable = this.material.walkable;
        };
        Tile.prototype.toString = function () {
            if (this.material.material.name) {
                return "row:" + this.ownedRow + "\ncol:" + this.ownedCol + "\nwalkable:" + this.walkable + "\nmaterial:" + this.material.material.name;
            }
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel(materials) {
            var _this = this;
            _super.call(this);
            var materialradio = new ui.MaterialRadio(materials);
            materialradio.radiobuttons[0].text = "wood";
            materialradio.radiobuttons[1].text = "water";
            materialradio.radiobuttons[2].text = "cement";
            var walkableradio = new ui.WalkableRadio(materials);
            walkableradio.radiobuttons[0].text = "可走";
            walkableradio.radiobuttons[1].text = "不可走";
            this.currentmaterial = materialradio.setMaterial;
            var submit = new ui.Button("提交");
            submit.height = 50;
            submit.y = 230;
            var save = new ui.Button("保存");
            save.height = 50;
            save.x = 120;
            save.y = 230;
            submit.onClick = function () {
                if (currenttile) {
                    var rows = mapData.length;
                    var cols = mapData[0].length;
                    _this.currentmaterial = materialradio.setMaterial;
                    _this.currentmaterial.walkable = walkableradio.walkable;
                    var child = mapEditor.getChild(currenttile.ownedCol, currenttile.ownedRow);
                    child.setMaterial(_this.currentmaterial);
                    information.Update(child);
                }
                else
                    alert("请先选择网格");
            };
            save.onClick = function () {
                storage.saveFile(mapEditor);
                alert("保存成功");
            };
            walkableradio.x = 120;
            this.addChild(materialradio);
            this.addChild(walkableradio);
            this.addChild(submit);
            this.addChild(save);
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
