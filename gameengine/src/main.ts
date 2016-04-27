

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {

        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
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


var cement = new editor.Material("cement.jpg", "cement", 0);
var water = new editor.Material("water.jpg", "water", 0);
var wood = new editor.Material("wood.jpg", "wood", 0);
var materials = new Array<editor.Material>();
materials.push(cement);
materials.push(water);
materials.push(wood);


var currenttile: editor.Tile;


//读取json配置文件


/*function LoadData(callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", __dirname + "/mapsave.json", true);
    xmlhttp.send(null);
    xmlhttp.onload = onloadComplete
    function onloadComplete() {
        var data = JSON.parse(xmlhttp.responseText);
        callback(data);
    }



}

LoadData(function(data){
    console.log(data[0][0].walkable,data[0][0].material);
})*/ 



function onTileClick(tile: editor.Tile) {


    currenttile = tile;
    if (mapEditor.children[mapEditor.children.length] != mapEditor.stroke) {
        mapEditor.addChild(mapEditor.stroke);
    }
    mapEditor.stroke.x = tile.x;
    mapEditor.stroke.y = tile.y;
    information.Update(tile);
    console.log(tile.toString());
}

var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;





var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();


var mapEditor = createMapEditor();

var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
var information = new ui.Information();
information.x = 300;

var panel = new editor.ControlPanel(materials);
panel.x = 300;
panel.y = 150;
stage.addChild(information);
stage.addChild(panel);


renderCore.start(stage, ["wood.jpg", "water.jpg", "cement.jpg", "Stroke.png"]);
