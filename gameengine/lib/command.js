var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cmd;
(function (Cmd) {
    var Invoker = (function () {
        function Invoker() {
        }
        Invoker.prototype.init = function () {
            this._list = [];
        };
        Invoker.prototype.canUndo = function () {
            return this._list.length > 0;
        };
        Invoker.prototype.undo = function () {
            var command = this._list.pop();
            return command.undo();
        };
        Invoker.prototype.setCommand = function (command) {
            command.execute();
            this._list.push(command);
            console.log(this._list.length);
        };
        return Invoker;
    }());
    Cmd.Invoker = Invoker;
    var Command = (function () {
        function Command() {
        }
        Command.prototype.getpara = function () {
        };
        Command.prototype.execute = function () {
        };
        Command.prototype.undo = function () {
        };
        return Command;
    }());
    Cmd.Command = Command;
    var CommandTileClick = (function (_super) {
        __extends(CommandTileClick, _super);
        function CommandTileClick(panelXt, panelYt, panelButton, panelTXsource, panelTXwalkable, panelTXnumber, panelSucaiButton) {
            _super.call(this);
            this.panelXt = panelXt;
            this.panelYt = panelYt;
            this.panelButton = panelButton;
            this.panelTXsource = panelTXsource;
            this.panelTXwalkable = panelTXwalkable;
            this.panelTXnumber = panelTXnumber;
            this.panelSucaiButton = panelSucaiButton;
        }
        CommandTileClick.prototype.getPara = function (xtext, ytext, buttonColor, buttonText, TXsource, TXwalkable, TXnumber, sucaiButtonText, sucaiButtonColor) {
            this.xtext = xtext;
            this.ytext = ytext;
            this.buttonColor = buttonColor;
            this.buttonText = buttonText;
            this.TXsource = TXsource;
            this.TXwalkable = TXwalkable;
            this.TXnumber = TXnumber;
            this.sucaiButtonText = sucaiButtonText;
            this.sucaiButtonColor = sucaiButtonColor;
        };
        CommandTileClick.prototype.undo = function () {
            this.panelXt.text = this.xtext;
            this.panelYt.text = this.ytext;
            this.panelButton.background.color = this.buttonColor;
            this.panelButton.text = this.buttonText;
            this.panelTXsource[0] = this.TXsource;
            this.panelTXwalkable[0] = this.TXwalkable;
            this.panelTXnumber[0] = this.TXnumber;
            this.panelSucaiButton.text = this.sucaiButtonText;
            this.panelSucaiButton.background.color = this.sucaiButtonColor;
        };
        return CommandTileClick;
    }(Command));
    Cmd.CommandTileClick = CommandTileClick;
    var CommandTXClick = (function (_super) {
        __extends(CommandTXClick, _super);
        function CommandTXClick(panelTXsource, panelTXwalkable, panelTXnumber, panelSucaiButton) {
            _super.call(this);
            this.panelTXsource = panelTXsource;
            this.panelTXwalkable = panelTXwalkable;
            this.panelTXnumber = panelTXnumber;
            this.panelSucaiButton = panelSucaiButton;
        }
        CommandTXClick.prototype.getPara = function (TXsource, TXwalkable, TXnumber, sucaiButtonText, sucaiButtonColor) {
            this.TXsource = TXsource;
            this.TXwalkable = TXwalkable;
            this.TXnumber = TXnumber;
            this.sucaiButtonText = sucaiButtonText;
            this.sucaiButtonColor = sucaiButtonColor;
        };
        CommandTXClick.prototype.undo = function () {
            this.panelTXsource[0] = this.TXsource;
            this.panelTXwalkable[0] = this.TXwalkable;
            this.panelTXnumber[0] = this.TXnumber;
            this.panelSucaiButton.text = this.sucaiButtonText;
            this.panelSucaiButton.background.color = this.sucaiButtonColor;
        };
        return CommandTXClick;
    }(Command));
    Cmd.CommandTXClick = CommandTXClick;
    var CommandButtonClick = (function (_super) {
        __extends(CommandButtonClick, _super);
        function CommandButtonClick(panelButton, panelTXsource, panelTXwalkable, panelTXnumber, panelSucaiButton, tile) {
            _super.call(this);
            this.panelButton = panelButton;
            this.panelTXsource = panelTXsource;
            this.panelTXwalkable = panelTXwalkable;
            this.panelTXnumber = panelTXnumber;
            this.panelSucaiButton = panelSucaiButton;
            this.tile = tile;
        }
        CommandButtonClick.prototype.getPara = function (x, y, TXdata, MPdata, buttonColor, buttonText, TXsource, TXwalkable, TXnumber, sucaiButtonText, sucaiButtonColor, tileSource, tileWalkable) {
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
        };
        CommandButtonClick.prototype.undo = function () {
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
        };
        return CommandButtonClick;
    }(Command));
    Cmd.CommandButtonClick = CommandButtonClick;
    var CommandSucaiButtonClick = (function (_super) {
        __extends(CommandSucaiButtonClick, _super);
        function CommandSucaiButtonClick(panelSucaiButton, tile) {
            _super.call(this);
            this.panelSucaiButton = panelSucaiButton;
            this.tile = tile;
        }
        CommandSucaiButtonClick.prototype.getPara = function (x, y, TXdata, MPdata, sucaiButtonColor, tileSource, tileSourceNum) {
            this.x = x;
            this.y = y;
            this.TXdata = TXdata;
            this.MPdata = MPdata;
            this.sucaiButtonColor = sucaiButtonColor;
            this.tileSource = tileSource;
            this.tileSourceNum = tileSourceNum;
        };
        CommandSucaiButtonClick.prototype.undo = function () {
            textureData[this.y][this.x] = this.TXdata;
            mapData[this.y][this.x] = this.MPdata;
            this.panelSucaiButton.background.color = this.sucaiButtonColor;
            this.tile.source = this.tileSource;
            this.tile.sourceNum = this.tileSourceNum;
        };
        return CommandSucaiButtonClick;
    }(Command));
    Cmd.CommandSucaiButtonClick = CommandSucaiButtonClick;
})(Cmd || (Cmd = {}));
