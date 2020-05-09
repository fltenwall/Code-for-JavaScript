var name = 'flten';
var obj = {
    name: '轩灵'
};

function fn(a, b, c) {
    console.log(a + b + c + this.name);
}

Function.prototype.myApply = function(obj,arr){
    //传的不是对象，强制转为对象；不传，默认window
    var obj = obj ? Object(obj):window;

    if(!arr){
        obj.fn()
    }else{
        var args = [];
        for(var i = 0,len=arr.length;i<len;i++){
            args.push("arr["+i+"]");

        }
        // console.log(args);
        //让obj对象去调用fn
        obj.fn = this;
        var result = eval("obj.fn("+args+")");
        delete obj.fn;
        return result;
    }

};

//fn是函数，也是对象
fn.myApply(obj,["我的", "名字", "是"]); // 我的名字是轩灵
