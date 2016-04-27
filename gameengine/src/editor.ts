
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;
        
        public xPosition: number;
        public yPosition: number;
        
        public xtext: String;
        public ytext: String;
        
        public judge: boolean;
        

        


        constructor() {
            super();
        }

        public setWalkable(value) {
            //this.color = value ? "#0000FF" : "#FF0000";
            this.judge = value ? true:false;
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        picSource:String;
        
        constructor(mapData,mapEditor){
            super();
            
            
            
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
            
            
            button.onClick = ()=> {
                 var x = parseInt(xtext.text) - 1;
                 var y = parseInt(ytext.text) - 1;
                 var tile = new Tile();
                 tile = mapEditor.children[x * mapData[0].length + y];
                 if (tile.judge) {
                    button.background.color = "#FF0000";
                    button.text = "否";
                    mapData[y][x] = 0;
                }
                else {
                    button.background.color = "#0000FF";
                    button.text = "是";
                    mapData[y][x] = 1;
                } 
              
                
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
            
             sourcebutton.onClick = () =>{
                 var a = parseInt(xtext.text) - 1;
                 var b = parseInt(ytext.text) - 1;
                 var tile = new Tile();
                 tile = mapEditor.children[a * mapData[0].length + b];
                 
                
               
                
                var save = new render.Bitmap();
                save.x = 0;
                save.y = 450;
                this.addChild(save);
                
                var undo = new render.Bitmap();
                undo.x = 0;
                undo.y = 500;
                this.addChild(undo);
                
                
            
            }
            }
        }
            
            
            
        }
}

