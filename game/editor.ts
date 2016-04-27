module editor {                       //  class:   WorldMap\Tile


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

        constructor() {
            super();
        }

        public setWalkable(value) {
            this.source = value + ".jpg";
          //  this.color = value ? "#0000FF" : "#FF0000"; //若value为1，则返回前者；若value为0，则返回后者
        }
        
        public setProp(value) {
            this.source = value + ".png";
        }
    }
}
