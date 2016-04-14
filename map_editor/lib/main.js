"use strict";
const fs = require('fs');
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    console.log(content);
    var obj = JSON.parse(content);
    console.log(obj);
    var mapData = obj.map;
    console.log(mapData);
    return mapData;
}
function writefile() {
    var map_path = __dirname + "/map.json";
    var content = JSON.stringify({ map: mapData });
    fs.writeFileSync(map_path, content, "utf-8");
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
function onTileClick(tile) {
    var col = (tile.x) / (tile.width);
    var row = (tile.y) / (tile.height);
    console.log(row);
    console.log(col);
    console.log(mapData[row][col]);
    var current = 0;
    if (mapData[row][col] == 0) {
        current = 1;
    }
    mapData[row][col] = current;
    writefile();
    mapData = readFile();
}
var mapData = readFile();
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var editor = createMapEditor();
renderCore.start(editor);
