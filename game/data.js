var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.GetJson = function (callback) {
            var s_jsonfile = new XMLHttpRequest();
            s_jsonfile.open("GET", "map.json", true);
            s_jsonfile.onreadystatechange = function () {
                if (s_jsonfile.readyState == 4 && s_jsonfile.status == 200) {
                    var _Layer = JSON.parse(s_jsonfile.responseText);
                    Storage._instance.s_layer0 = _Layer.layer0;
                    Storage._instance.s_layer1 = _Layer.layer1;
                    callback();
                }
            };
            s_jsonfile.send();
        };
        Storage.prototype.saveFile = function () {
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
