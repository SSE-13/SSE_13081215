var fs = require("fs");

module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }


        public readFile() {
            var map_path = __dirname + "/map.json"
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        }
        public writeFile(data){
                var map_path = __dirname + "/mapsave.json"

                var obj = JSON.stringify(data);
                fs.writeFileSync(map_path, obj, "utf-8");
            
        }
        

        
        public saveFile(worldmap:editor.WorldMap){
            var rows = mapData.length;
            var cols = mapData[0].length;
            var children=worldmap;
            var Savemapdata=new Array();
             for (var col = 0; col < rows; col++) {
                Savemapdata[col]=new Array();
             for (var row = 0; row < cols; row++) {
                 var child=<editor.Tile>children.getChild(col,row);
                Savemapdata[col].push(new editor.Mapdata( child.material.material.source,child.walkable));
             }
           
            
        }
        this.writeFile(Savemapdata);
        }
        
        public mapData;

    }



}