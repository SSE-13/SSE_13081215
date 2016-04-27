

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;   //map有几行
    var cols = mapData[0].length;   //map有几列

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
            
            tile.xPosition = tile.x/editor.GRID_PIXEL_WIDTH;
            tile.yPosition = tile.y/editor.GRID_PIXEL_HEIGHT;
            
            tile.xtext = tile.xPosition.toString();
            tile.ytext = tile.yPosition.toString();
            
            
            world.addChild(tile);


            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;

}

var rect = new render.Rect;
rect.x = 100;
rect.y = 60;
rect.height = 10;
rect.width = 10;



var xtext = new render.TextField;
var ytext = new render.TextField;

function onTileClick(tile: editor.Tile) {
    console.log(tile);
    
    var button = new ui.Button();
     button.width = 100;
     button.height = 30;
     button.x=100;
     button.y=60;
     button.onClick = ()=> {
      if(button.text=="否"){
        button.text="是";
        this.judge =0;
         button.background.color = "#0000FF"
     }else{
         button.text="否";
            this.judge =1;
         button.background.color = "#FF0000"
     }
   }
}

var pic = [];

var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var picData = storage.picData;

var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();



var stage = new render.DisplayObjectContainer();

var mapEditor = createMapEditor();
stage.addChild(mapEditor);

var panel = new editor.ControlPanel(mapData,mapEditor);
panel.x = 300;
stage.addChild(panel);

renderCore.start(stage);
