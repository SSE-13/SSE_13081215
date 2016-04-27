var fs = require("fs");
var data;
(function (data_1) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function () {
            var map_path = __dirname + "/map.json";
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        };
        Storage.prototype.writeFile = function (data) {
            var map_path = __dirname + "/mapsave.json";
            var obj = JSON.stringify(data);
            fs.writeFileSync(map_path, obj, "utf-8");
        };
        Storage.prototype.saveFile = function (worldmap) {
            var rows = mapData.length;
            var cols = mapData[0].length;
            var children = worldmap;
            var Savemapdata = new Array();
            for (var col = 0; col < rows; col++) {
                Savemapdata[col] = new Array();
                for (var row = 0; row < cols; row++) {
                    var child = children.getChild(col, row);
                    Savemapdata[col].push(new editor.Mapdata(child.material.material.source, child.walkable));
                }
            }
            this.writeFile(Savemapdata);
        };
        return Storage;
    }());
    data_1.Storage = Storage;
})(data || (data = {}));
