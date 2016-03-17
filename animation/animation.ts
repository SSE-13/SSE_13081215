/**
 * 重力加速度
 */
const GRAVITY = 9.8;

const BOUNDS_BOTTOM = 400;

const BOUNDS_LEFT = 0;

const BOUNDS_RIGHT = 400;

const BOUNCE = 0.95;

const Friction = 8.2;


/**
 * 计时器系统
 */
class Ticker {

    bodyQueue = [];

    lastTime;

    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    start(bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    }

    onTicker() {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function(body) {
            body.onTicker(duringTime / 100)
        });
    }
}


class Body {

    vx = 0;
    vy = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    displayObject;

    constructor(displayObject: DisplayObject) {
        this.displayObject = displayObject;
    }

    public onTicker(duringTime) {

        this.vy += duringTime * GRAVITY;
        this.x += duringTime * this.vx;
        this.y += duringTime * this.vy;

        //反弹
        if(this.y + this.height > BOUNDS_BOTTOM){
            this.vy = -BOUNCE * this.vy;
            if((this.vy < 0)&&(this.y +this.height +duringTime * this.vy > BOUNDS_BOTTOM)){//下边界的下一次预计值
                this.y = BOUNDS_BOTTOM - this.height;
            }
        }
        
        //水平面滑行
        
        if((Math.abs(this.vy) < 0.1)){
           if((this.vx >0)){
               if((this.vx)*(this.vx- Friction * duringTime) > 0){
                   this.vx = this.vx- Friction * duringTime;
               }
               else{
                   this.vx = 0;
               }
           }
           if(this .vx <0){
               if((this.vx)*(this.vx +Friction * duringTime) >0){
                   this.vx = this.vx +Friction * duringTime;
               }
               else{
                   this.vx = 0;
               }
           }
        }
        
        
        //TODO： 左右越界反弹
 
        if((this.x + this.width > BOUNDS_RIGHT)||(this.x < BOUNDS_LEFT) ){
            this.vx = -BOUNCE * this.vx;
        }



        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;

    }
}


var rect = new Rect();
rect.width = 150;
rect.height = 100;
rect.color = '#FF0000';



var rect2 = new Rect();
rect2.width =50;
rect2.height = 50;
rect2.color = "#000066";


/**
 * 创建一个物体，其显示内容为一个长方形，受重力做平抛运动
 */


var body = new Body(rect);
body.width = rect.width;
body.height = rect.height;
body.vx = 5;//需要保证 vx 在 0-50的范围内行为正常.
body.vy = 0;//需要保证 vy 在 0-50的范围内行为正常.

var body2 = new Body(rect2);
body2.width = rect2.width;
body2.height = rect2.height;
body2.vx = 10;
body2.vy = 0;


var renderCore = new RenderCore();
var ticker = new Ticker();

renderCore.start([rect,rect2]);
ticker.start([body,body2]);


