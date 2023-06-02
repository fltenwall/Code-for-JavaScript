let Person = {
    name: '轩灵',
    say() {
        console.log(this);
        console.log(`My name is ${this.name}`)
    }
};

let Person1 = {
    name: 'flten'
};

function Say(){
    console.log(this);
    console.log(`My name is ${this.name}`)
}

Function.prototype.mybind = Function.prototype.bind || function bind(thisArg) {
    if(typeof this !== 'function'){
        throw new TypeError(this + ' must be a function');
    }

    //返回一个绑定this的函数，所有需要在此保存this
    let self = this;
    // 可以支持柯里化传参，保存参数
    let args = [...arguments].slice(1);
    // 返回一个函数
    var bound = function(){
        //支持柯里化形式传参，所以需要再次获取存储参数
        let newArg = [...arguments];
        console.log(newArg);
        // 返回函数绑定this，传入两次保存的参数
        let finalArgs = args.concat(newArg);

        //如果将返回的函数bound当做构造函数进行了new操作，则需要模拟new的实现
        if(this instanceof bound){
            //修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数原型中的值
            if(self.prototype){
                function Empty(){}
                Empty.prototype = self.prototype;
                bound.prototype = new Empty();
            }
            var result = self.apply(this, finalArgs);
            var isObject = typeof result === 'object' && result !== null;
            var isFunction = typeof result === 'function';
            if(isObject || isFunction){
                return result;
            }
            return this;
        }
        else{
            //将返回的bound函数直接作为普通函数调用
            return self.apply(thisArg, finalArgs);
        }
    };
    return bound;
};

//将Person对象的say方法绑在对象Person1身上
let fn = Person.say.mybind(Person1);
fn();//{name: "flten"},My name is flten

//将Say函数绑在对象Person1身上
let fn2 = Say.mybind(Person1);
fn2();  //{name: "flten"},My name is flten

//将fn2当做构造函数使用
let demo = new fn2();//Say {},My name is undefined
