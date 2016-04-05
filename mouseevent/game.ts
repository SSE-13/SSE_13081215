
var humanContainer = new render.DisplayObjectContainer();
var bag = new render.DisplayObjectContainer();
bag.x = 0;
bag.y = 0;

var head = new render.Bitmap();
head.x = -80;
head.y = -300;
var trunk = new render.Bitmap();
trunk.x = -75;
trunk.y = -80;
var left_arm = new render.Bitmap();
left_arm.x = 80;
left_arm.y = -60;
var right_arm = new render.Bitmap();
right_arm.x = -130;
right_arm.y = -60;
var left_leg = new render.Bitmap();
left_leg.x = -10;
left_leg.y = 120;
var right_leg = new render.Bitmap();
right_leg.x = -100;
right_leg.y = 118;

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
renderCore.start(humanContainer, ["head.png","body.png","left_arm.png","right_arm.png","left_leg.png","right_leg.png"]);


class HumanBody extends Body {
    
    
    vx:number = 5;
    

    onTicker(duringTime: number) {
        this.x += duringTime * this.vx;
        this.rotation += duringTime * 3; 

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);

body.x = 150;
body.y = 300;
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
    body.vx *= -1;
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);










