var name = 'flten';
var obj = {
    name: '轩灵'
};

function fn(a, b, c) {
    console.log(a + b + c + this.name);
}

Function.prototype.mycall = function(obj){
    //判断是否为null或者undefined,如果是则默认window;如果传递的参数不是对象用Object转为对象
    obj = obj ? Object(obj) : window;
    var args = [];

    for(var i=1,len = arguments.length;i<len;i++){
        args.push("arguments"+"["+i+"]");
    }
    // console.log(args);
    //最重要的一步！说明了两个问题：1.mycall内部的this是指向调用者fn函数（对象的）；2.Obj.func就是fn函数，obj对象调用了fn函数，因此fn函数内部的this指向obj
    obj.fn = this;
    var result = eval("obj.fn("+args+")");
    delete obj.fn;
    return result;
};

//1.函数也是对象，因此这里的fn作为函数对象调用了mycall
//2.this总是指向他的调用者
fn.mycall(obj,"我的", "名字", "是"); // 我的名字是轩灵
