function EventEmitter(){
    this._events = {};
}

EventEmitter.prototype.on = function(eventName,callback){
    // if(eventName !== 'newListener'){
    //     this._events['newListener'] ? this._events['newListener'].forEach(fn => fn(eventName)) : void 0
    // }
    if(!this._events){
        // this._events = {};这种方式有原型链
        this._events = Object.create(null);
    }
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
}

EventEmitter.prototype.once = function(eventName,callback){
    function one(){
        callback(...arguments);
        this.off(eventName,one);
    }
    one.link = callback;
    this.on(eventName,one);
}

EventEmitter.prototype.off = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(fn => {
            fn != callback && fn.link != callback //为once做处理
        })    
    }
}

EventEmitter.prototype.emit = function(eventName){
    if(this._events[eventName]){
        this._events[eventName].forEach(fn => {
            fn.call(this,...arguments);
        });
    }
}

module.exports = EventEmitter;