var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
// humanContainer.x = 120;
// humanContainer.y = 250;
var bag = new render.DisplayObjectContainer();
bag.x = -0.1;
bag.y = -0.1;
var head = new render.Bitmap();
head.x = -70;
head.y = -200;
var trunk = new render.Bitmap();
trunk.x = 55 - 120;
trunk.y = 270 - 250;
var left_arm = new render.Bitmap();
left_arm.x = 210 - 120;
left_arm.y = 290 - 250;
var right_arm = new render.Bitmap();
right_arm.x = -120;
right_arm.y = 290 - 250;
var left_leg = new render.Bitmap();
left_leg.x = 120 - 120;
left_leg.y = 470 - 250;
var right_leg = new render.Bitmap();
right_leg.x = 30 - 120;
right_leg.y = 468 - 250;
head.source = "head.png";
trunk.source = "body.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";
humanContainer.addChild(bag);
bag.addChild(head);
bag.addChild(trunk);
bag.addChild(left_arm);
bag.addChild(right_arm);
bag.addChild(left_leg);
bag.addChild(right_leg);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "body.png", "left_arm.png", "right_arm.png", "left_leg.png", "right_leg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        //console.log("vx: "+this.vx+" x: "+ this.x+" y: "+this.y);
        this.x += duringTime * this.vx;
        this.rotation += duringTime * 5;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer); //humanContainer即为基类Body中的那个“displayObject”属性
console.log("body: x:" + body.x + "   y:" + body.y);
console.log("humanContainer  x:" + body.displayObject.x + "y:" + body.displayObject.y);
body.vx = 5;
body.y = 400;
ticker.start([body]);
//# sourceMappingURL=game.js.map