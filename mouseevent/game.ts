
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
    r:number = 3; 
    
    onTicker(duringTime: number) {
        this.x += duringTime * this.vx;
        this.rotation += duringTime * this.r; 
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);  //humanContainer即为Body类中的displayobject

body.x = 150;
body.y = 300;
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if((localPoint.x >= 0)&&(localPoint.x <= 237)&&(localPoint.y >= 0)&&(localPoint.y <= 237))
        return true;  
    else
        return false;
}
var headOnClick = () => {
    console.log("You clicked head!!!    invert orientation.");
     body.vx *= -1;
     body.r *=-1;
     if(body.r == 0){
         body.vx = 5; 
         body.r = 3;
     }
}

var legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    if((localPoint.x >= 0)&&(localPoint.x <= 115)&&(localPoint.y >= 0)&&(localPoint.y <= 145))
        return true;  
    else
        return false;
}
var legOnClick = () =>{
    console.log("You clicked leg!!!  stand still.");
    body.vx = body.r = 0;
    body.rotation = 0;
}
eventCore.register(head,headHitTest,headOnClick);
eventCore.register(left_leg,legHitTest,legOnClick);
eventCore.register(right_leg,legHitTest,legOnClick);










