module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();


head.source = "head.png";
trunk.source = "body.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";

humanContainer.addChild(head);
humanContainer.addChild(trunk);
humanContainer.addChild(left_arm);
humanContainer.addChild(right_arm);
humanContainer.addChild(left_leg);
humanContainer.addChild(right_leg);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","body.png","left_arm.png","right_arm.png","left_leg.png","right_leg.png"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {


        console.log("1");
        this.x += duringTime * this.vx; 
      // this.y += duringTime * this.vy;
       this.rotation += duringTime * 10;
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 3;
ticker.start([body]);











