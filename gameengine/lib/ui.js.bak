var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var eventCore = events.EventCore.getInstance();
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(text) {
            var _this = this;
            _super.call(this);
            this._text = "label";
            this.background = new render.Rect();
            this.background.width = this.width;
            this.background.height = this.height;
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.textAlign = "center";
            this.label.text = text;
            this.addChild(this.background);
            this.addChild(this.label);
            eventCore.register(this, events.displayObjectRectHitTest, function () {
                if (_this.onClick) {
                    _this.onClick(_this);
                }
            });
        }
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                this.label.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.background.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.background.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.setColor = function (color) {
            this.background.color = color;
        };
        return Button;
    }(render.DisplayObjectContainer));
    ui.Button = Button;
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(text) {
            _super.call(this, text);
            this.checked = false;
        }
        RadioButton.prototype.IsChecked = function () {
            return this.checked;
        };
        return RadioButton;
    }(Button));
    ui.RadioButton = RadioButton;
    var Radio = (function (_super) {
        __extends(Radio, _super);
        function Radio(num, materials) {
            _super.call(this);
            this.radiobuttons = [];
            //this.offsetx=0;
            this.offsety = 10;
            this.num = num;
            for (var i = 0; i < this.num; i++) {
                this.radiobuttons.push(new RadioButton("NONAME"));
                this.radiobuttons[i].height = 50;
                //this.radiobuttons[i].x=(this.radiobuttons[i].width+this.offsetx)*i;
                this.radiobuttons[i].y = (this.radiobuttons[i].height + this.offsety) * i;
                this.addChild(this.radiobuttons[i]);
            }
        }
        Radio.prototype.Check = function (radiobutton) {
            this.radiobuttons.forEach(function (element) {
                if (element == radiobutton) {
                    element.checked = true;
                    element.setColor("#CC9999");
                }
                else {
                    element.checked = false;
                    element.setColor("#FF0000");
                }
            });
        };
        return Radio;
    }(render.DisplayObjectContainer));
    ui.Radio = Radio;
    var MaterialRadio = (function (_super) {
        __extends(MaterialRadio, _super);
        function MaterialRadio(materials) {
            var _this = this;
            _super.call(this, materials.length, materials);
            this.Check(this.radiobuttons[0]);
            this.setMaterial = materials[0];
            for (var i = 0; i < this.num; i++) {
                this.radiobuttons[i].onClick = function (evt) {
                    //alert(this.radiobuttons.indexOf(evt));
                    _this.setMaterial = materials[_this.radiobuttons.indexOf(evt)];
                    _this.Check(evt);
                };
            }
        }
        return MaterialRadio;
    }(Radio));
    ui.MaterialRadio = MaterialRadio;
    var WalkableRadio = (function (_super) {
        __extends(WalkableRadio, _super);
        function WalkableRadio(materials) {
            var _this = this;
            _super.call(this, 2, materials);
            this.Check(this.radiobuttons[0]);
            this.walkable = 0;
            this.radiobuttons[0].onClick = function (evt) {
                _this.walkable = 0;
                _this.Check(evt);
            };
            this.radiobuttons[1].onClick = function (evt) {
                _this.walkable = 1;
                _this.Check(evt);
            };
        }
        return WalkableRadio;
    }(Radio));
    ui.WalkableRadio = WalkableRadio;
    var Information = (function (_super) {
        __extends(Information, _super);
        function Information() {
            _super.call(this);
            this.informations = [];
            for (var i = 0; i < 4; i++) {
                this.informations.push(new render.TextField());
                this.informations[i].height = 30;
                this.informations[i].y = (this.informations[i].height + 5) * i;
                this.informations[i].textAlign = "left";
                this.addChild(this.informations[i]);
            }
            this.informations[0].text = "行:--";
            this.informations[1].text = "列:--";
            this.informations[2].text = "可走性:--";
            this.informations[3].text = "素材:--";
        }
        Information.prototype.Update = function (tile) {
            this.informations[0].text = "行:" + (tile.ownedRow + 1);
            this.informations[1].text = "列:" + (tile.ownedCol + 1);
            this.informations[2].text = "可走性:" + (tile.walkable == 0 ? "可走" : "不可走");
            this.informations[3].text = "素材:" + tile.material.material.name;
        };
        return Information;
    }(render.DisplayObjectContainer));
    ui.Information = Information;
})(ui || (ui = {}));
