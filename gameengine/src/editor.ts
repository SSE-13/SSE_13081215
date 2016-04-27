
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


    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;
        
        public xPosition: number;
        public yPosition: number;
        
        public xtext: String;
        public ytext: String;
        


        constructor() {
            super();
        }

        public setWalkable(value) {
            this.color = value ? "#0000FF" : "#FF0000";
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();
            
            
            
            var row = new render.TextField;
            row.text = "行：";
            row.width = 100;
            row.height = 30;
            row.x = 0;
            row.y = 100;
            this.addChild(row);
            
            var col = new render.TextField;
            col.text = "列: ";
            col.width = 100;
            col.height = 30;
            col.x = 0;
            col.y = 200;
            this.addChild(col);
            
            var isWalk = new render.TextField;
            isWalk.text = "是否可以走: ";
            isWalk.width = 100;
            isWalk.height = 30;
            isWalk.x = 0;
            isWalk.y = 300;
            this.addChild(isWalk);
            
            var button = new ui.Button();
            button.text = " ";
            button.width = 100;
            button.height = 30;
            button.x = 0;
            button.y = 300
            this.addChild(button);
            button.onClick = ()=> {
                if(button.background.color = "#0000FF"){
                    button.background.color = "#FF0000";
                }
                else{
                    button.background.color = "#0000FF";
                }
                }
              
                    
            
            var source = new render.TextField;
            source.text = "网格素材: ";
            source.width = 100;
            source.height = 30;
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
                
            }
              //  alert("button cliked");
            }
            
            
            
            
        }
        
    }

