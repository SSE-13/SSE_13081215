var events;
(function (events) {
    var EventCore = (function () {
        function EventCore() {
            var _this = this;
            this.onStageClick = function (e) {
                //获取舞台坐标
                var stageClickedPoint = new math.Point(e.offsetX, e.offsetY);
                for (var i = 0; i < _this.eventInfos.length; i++) {
                    var info = _this.eventInfos[i];
                    var globalMatrix = info.displayObject.globalMatrix;
                    //思考，invert 是什么意思？对应线性代数的什么概念？为什么要做这一步？
                    var invertGlobalMatrix = math.invertMatrix(globalMatrix); //A-¹=A*/A
                    var newPoint = math.pointAppendMatrix(stageClickedPoint, invertGlobalMatrix); //将其转为物体的相对坐标系下的坐标 stageClickedPoint->newPoint
                    //如果检测返回true，则认为点中了
                    if (info.hitTest(newPoint, info.displayObject)) {
                        info.onClick();
                        break;
                    }
                }
            };
        }
        EventCore.prototype.init = function () {
            this.eventInfos = [];
            var canvas = document.getElementById("game");
            canvas.addEventListener("click", this.onStageClick);
        };
        EventCore.prototype.register = function (displayObject, hitTest, onClick) {
            this.eventInfos.push({ displayObject: displayObject, hitTest: hitTest, onClick: onClick });
        };
        return EventCore;
    }());
    events.EventCore = EventCore;
})(events || (events = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sTUFBTSxDQWdEWjtBQWhERCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBY1g7UUFBQTtZQUFBLGlCQWlDQztZQTdCRyxpQkFBWSxHQUFHLFVBQUMsQ0FBYTtnQkFDekIsUUFBUTtnQkFDUixJQUFJLGlCQUFpQixHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM5QyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztvQkFDbkQsdUNBQXVDO29CQUN2QyxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBSSxVQUFVO29CQUN2RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFHLDhDQUE4QztvQkFDOUgsbUJBQW1CO29CQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsS0FBSyxDQUFDO29CQUNWLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsQ0FBQztRQWNOLENBQUM7UUFaRyx3QkFBSSxHQUFKO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBR0QsNEJBQVEsR0FBUixVQUFTLGFBQWtDLEVBQUMsT0FBZ0YsRUFBQyxPQUFtQjtZQUM1SSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLGVBQUEsYUFBYSxFQUFDLFNBQUEsT0FBTyxFQUFDLFNBQUEsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUUxRCxDQUFDO1FBRUwsZ0JBQUM7SUFBRCxDQUFDLEFBakNELElBaUNDO0lBakNZLGdCQUFTLFlBaUNyQixDQUFBO0FBQ0wsQ0FBQyxFQWhETSxNQUFNLEtBQU4sTUFBTSxRQWdEWiJ9