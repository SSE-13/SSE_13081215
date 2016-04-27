module Cmd {

    export class Invoker {
        private _list: Array<any>;

        init() {
            this._list = [];
        }

        canUndo() {
            return this._list.length > 0;
        }

        undo() {
            var command = this._list.pop();
            return command.undo();
        }
        setCommand(command) {
            command.execute();
            this._list.push(command);
            console.log(this._list.length);
        }
    }

    export class Command {

        constructor() {

        }
        getpara() {

        }
        execute() {

        }
        undo() {

        }
    }


    export class CommandTileClick extends Command {
        xtext: string;
        ytext: string;
        buttonColor: string;
        buttonText: string;
        TXsource: string;
        TXwalkable: boolean;
        TXnumber: number;
        sucaiButtonText: string;
        sucaiButtonColor: string;

        private panelXt: render.TextField;
        private panelYt: render.TextField;
        private panelButton: ui.Button;
        private panelTXsource: String[];
        private panelTXwalkable: Boolean[];
        private panelTXnumber: Number[];
        private panelSucaiButton: ui.Button;
        constructor(panelXt, panelYt, panelButton, panelTXsource, panelTXwalkable, panelTXnumber, panelSucaiButton) {
            super();        
            this.panelXt = panelXt;
            this.panelYt = panelYt;
            this.panelButton = panelButton;
            this.panelTXsource = panelTXsource;
            this.panelTXwalkable = panelTXwalkable;
            this.panelTXnumber = panelTXnumber;
            this.panelSucaiButton = panelSucaiButton;
        }
        getPara(xtext, ytext, buttonColor, buttonText, TXsource, TXwalkable, TXnumber, sucaiButtonText, sucaiButtonColor) {
            this.xtext = xtext;
            this.ytext = ytext;
            this.buttonColor = buttonColor;
            this.buttonText = buttonText;
            this.TXsource = TXsource;
            this.TXwalkable = TXwalkable;
            this.TXnumber = TXnumber;
            this.sucaiButtonText = sucaiButtonText;
            this.sucaiButtonColor = sucaiButtonColor;
        }

        undo() {
            this.panelXt.text = this.xtext;
            this.panelYt.text = this.ytext;
            this.panelButton.background.color = this.buttonColor;
            this.panelButton.text = this.buttonText;
            this.panelTXsource[0] = this.TXsource;
            this.panelTXwalkable[0] = this.TXwalkable;
            this.panelTXnumber[0] = this.TXnumber;
            this.panelSucaiButton.text = this.sucaiButtonText;
            this.panelSucaiButton.background.color = this.sucaiButtonColor;
        }

    }

    export class CommandTXClick extends Command {
        TXsource: string;
        TXwalkable: boolean;
        TXnumber: number;
        sucaiButtonText: string;
        sucaiButtonColor: string;

        private panelTXsource: String[];
        private panelTXwalkable: Boolean[];
        private panelTXnumber: Number[];
        private panelSucaiButton: ui.Button;
        constructor(panelTXsource, panelTXwalkable, panelTXnumber, panelSucaiButton) {
            super();
            this.panelTXsource = panelTXsource;
            this.panelTXwalkable = panelTXwalkable;
            this.panelTXnumber = panelTXnumber;
            this.panelSucaiButton = panelSucaiButton;
        }
        getPara(TXsource, TXwalkable, TXnumber, sucaiButtonText, sucaiButtonColor) {
            this.TXsource = TXsource;
            this.TXwalkable = TXwalkable;
            this.TXnumber = TXnumber;
            this.sucaiButtonText = sucaiButtonText;
            this.sucaiButtonColor = sucaiButtonColor;
        }
        undo() {
            this.panelTXsource[0] = this.TXsource;
            this.panelTXwalkable[0] = this.TXwalkable;
            this.panelTXnumber[0] = this.TXnumber;
            this.panelSucaiButton.text = this.sucaiButtonText;
            this.panelSucaiButton.background.color = this.sucaiButtonColor;
        }

    }

    export class CommandButtonClick extends Command {
        x: number;
        y: number;
        TXdata: number;
        MPdata: number;
        buttonColor: string;
        buttonText: string;
        TXsource: string;
        TXwalkable: boolean;
        TXnumber: number;
        sucaiButtonText: string;
        sucaiButtonColor: string;
        tileSource: string;
        tileWalkable: number;

        private panelButton: ui.Button;
        private panelTXsource: String[];
        private panelTXwalkable: Boolean[];
        private panelTXnumber: Number[];
        private panelSucaiButton: ui.Button;
        private tile: editor.Tile;
        constructor(panelButton, panelTXsource, panelTXwalkable, panelTXnumber, panelSucaiButton, tile) {
            super();
            this.panelButton = panelButton;
            this.panelTXsource = panelTXsource;
            this.panelTXwalkable = panelTXwalkable;
            this.panelTXnumber = panelTXnumber;
            this.panelSucaiButton = panelSucaiButton;
            this.tile = tile;
        }
        getPara(x, y, TXdata, MPdata, buttonColor, buttonText, TXsource, TXwalkable, TXnumber, sucaiButtonText, sucaiButtonColor, tileSource, tileWalkable) {
            this.x = x;
            this.y = y;
            this.TXdata = TXdata;
            this.MPdata = MPdata;
            this.buttonColor = buttonColor;
            this.buttonText = buttonText;
            this.TXsource = TXsource;
            this.TXwalkable = TXwalkable;
            this.TXnumber = TXnumber;
            this.sucaiButtonText = sucaiButtonText;
            this.sucaiButtonColor = sucaiButtonColor;
            this.tileSource = tileSource;
            this.tileWalkable = tileWalkable;
        }
        undo() {
            textureData[this.y][this.x] = this.TXdata;
            mapData[this.y][this.x] = this.MPdata;
            this.panelButton.background.color = this.buttonColor;
            this.panelButton.text = this.buttonText;
            this.panelTXsource[0] = this.TXsource;
            this.panelTXwalkable[0] = this.TXwalkable;
            this.panelTXnumber[0] = this.TXnumber;
            this.panelSucaiButton.text = this.sucaiButtonText;
            this.panelSucaiButton.background.color = this.sucaiButtonColor;
            this.tile.source = this.tileSource;
            this.tile.setWalkable(this.tileWalkable);
        }
    }

    export class CommandSucaiButtonClick extends Command {
        x: number;
        y: number;
        TXdata: number;
        MPdata: number;
        sucaiButtonColor: string;
        tileSource: string;
        tileSourceNum: number;

        private panelSucaiButton: ui.Button;
        private tile: editor.Tile;
        constructor(panelSucaiButton, tile) {
            super();
            this.panelSucaiButton = panelSucaiButton;
            this.tile = tile;
        }
        getPara(x, y, TXdata, MPdata, sucaiButtonColor, tileSource, tileSourceNum) {
            this.x = x;
            this.y = y;
            this.TXdata = TXdata;
            this.MPdata = MPdata;
            this.sucaiButtonColor = sucaiButtonColor;
            this.tileSource = tileSource;
            this.tileSourceNum = tileSourceNum;
        }
        undo() {
            textureData[this.y][this.x] = this.TXdata;
            mapData[this.y][this.x] = this.MPdata;
            this.panelSucaiButton.background.color = this.sucaiButtonColor;
            this.tile.source = this.tileSource;
            this.tile.sourceNum = this.tileSourceNum;
        }
    }


}