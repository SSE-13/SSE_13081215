module game {


}

var humanContainer = new render.DisplayObjectContainer();
// humanContainer.x = 120;
// humanContainer.y = 250;
var bag = new render.DisplayObjectContainer();
bag.x = 120;
bag.y = 250;

var head = new render.Bitmap();
head.x = 50;
var trunk = new render.Bitmap();
trunk.x = 55;
trunk.y = 220;
var left_arm = new render.Bitmap();
left_arm.x = 210;
left_arm.y = 240;
var right_arm = new render.Bitmap();
right_arm.y = 240;
var left_leg = new render.Bitmap();
left_leg.x = 120;
left_leg.y = 420;
var right_leg = new render.Bitmap();
right_leg.x = 30;
right_leg.y = 418;


head.source = "head0.png";
trunk.source = "body0.png";
left_arm.source = "left_arm0.png";
right_arm.source = "right_arm0.png";
left_leg.source = "left_leg0.png";
right_leg.source = "right_leg0.png";

humanContainer.addChild(head);
humanContainer.addChild(trunk);
humanContainer.addChild(left_arm);
humanContainer.addChild(right_arm);
humanContainer.addChild(left_leg);
humanContainer.addChild(right_leg);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head0.png","body0.png","left_arm0.png","right_arm0.png","left_leg0.png","right_leg0.png"]);


class HumanBody extends Body {          //Body类中有一个displayObject属性


    onTicker(duringTime: number) {


        console.log("1");
        this.x += duringTime * this.vx;
        console.log("vx: "+this.vx+"    x: "+ this.x+"    y: "+this.y);
      // this.y += duringTime * this.vy;
       this.rotation += duringTime * 10;
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);       //humanContainer即为基类Body中的那个“displayObject”属性
body.x = 50;



ticker.start([body]);











