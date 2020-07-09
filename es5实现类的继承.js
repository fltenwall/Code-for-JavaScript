function Animal(){
	this.type = "animal";

	//实现抽象类
	if(new.target === Animal){
		throw new Error("animal不可被实例化");
	}
}

// let animal = new Animal();//报错

Animal.prototype.say = function(){
	console.log("say..");
}

//实现父类与子类的继承
function Tiger(){
	Animal.call(this);//继承了父类的实例属性和方法
}

//继承父类原型上的属性和方法
//（1） Tiger.prototype = Animal.prototype;//指向了同一个原型对象，子类原型的修改会影响到父类原型

/* 
（2）修改子类的__proto__指向父类的prototype
	1)因为Tiger与Animal是两个不同的类，且之间没有new的关系，而且在原型上没有__proto__的指向关系，因此需要手动修改Animal类__proto__指向Animal.prototype
	2)低版本浏览器中可能不识别__proto__
*/

//Es5中的方法,利用了原型链，将Tiger的原型的原型指向Animal.prototype
// Tiger.prototype.__proto__ = Animal.prototype;

//ES6中提供的方法
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype);

/*
（1）使用Object.create()改变子类的prototype
（2）这种方式会导致子类指向一个实例对象，而实例对象自身无constructor属性，向上找到父类prototype上的constructor属性,因此需要手动修改子类prototype上constructor的指向
*/

// Tiger.prototype = Object.create(Animal.prototype); 

//增加constructor指向的参数
// Tiger.prototype = Object.create(Animal.prototype,{"constructor":{value:Tiger}});

//模拟实现Object.create()
function create(parentPrototype){
	let Fn = function(){};
	//构建一个中间类指向父类，Tiger自身的prototype的属性和方法都写在中间类Fn的prototype上
	Fn.prototype = parentPrototype;
	// return new Fn();

	//改进：给实例添加一个constructor的属性，修正constructor的指向
	let fn = new Fn();
	fn.constructor = Tiger;
	return fn;
}

Tiger.prototype = create(Animal.prototype);

let tiger = new Tiger;

console.log(tiger.type);//animal
tiger.say();//say..
console.log(tiger.constructor)//[Function:Animal],修正指向前；[Function:Tiger],修正指向后

//类的静态属性
Tiger.a = 10;
console.log(Tiger.a);//10

//类的静态方法
Tiger.eat = function(){
	console.log('eat..');
}
Tiger.eat();//eat..
