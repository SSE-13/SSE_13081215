module data {

    export class Storage {

        private static _instance: Storage;
        public s_layer0;       //background  设置可走与不可走
        public s_layer1;       //Prop  添加道具
        
        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }

        public GetJson(callback){
            var s_jsonfile = new XMLHttpRequest();
            s_jsonfile.open("GET","map.json", true);
            
            s_jsonfile.onreadystatechange = function() {
                if (s_jsonfile.readyState == 4 && s_jsonfile.status == 200) {  
             
                      var _Layer = JSON.parse(s_jsonfile.responseText);
                      Storage._instance.s_layer0 = _Layer.layer0;
                      Storage._instance.s_layer1 = _Layer.layer1;
    
                      callback();
                }
            }  
            s_jsonfile.send();
        }

        public saveFile(){
            
        }
    }
}