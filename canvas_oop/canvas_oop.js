var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 10;
        this.color = '#FF5566';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = 'hello world';
    }
    TextField.prototype.render = function (context) {
        context.font = "30px 微软雅黑 bold";
        context.fillStyle = '#FFFFFF';
        context.fillText(this.text, 0, 20);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
// var rect = new Rect();
// rect.width = 400;
// rect.height = 100;
// rect.color = '#00FF00'
// var rect2 = new Rect();
// rect2.width = 300;
// rect2.height = 50;
// rect2.x = 200;
// rect2.y = 200;
// rect2.rotation = Math.PI / 8;
// rect2.color = '#00FFFF'
// var text = new TextField();
// text.x = 10;
var bitmap1 = new Bitmap();
bitmap1.source = 'background.png';
var bitmap2 = new Bitmap();
bitmap2.source = '1.png';
bitmap2.x = 180;
bitmap2.y = 60;
var text1 = new TextField();
text1.text = "相信猪会飞";
text1.x = 450;
text1.y = 150;
//button
var rect = new Rect();
rect.x = 400;
rect.y = 600;
rect.width = 200;
rect.height = 50;
var text2 = new TextField();
text2.text = "开始游戏";
text2.x = 450;
text2.y = 610;
//渲染队列
var renderQueue = [bitmap1, bitmap2, text1, rect, text2];
//资源加载列表
var imageList = ['background.png', '1.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
