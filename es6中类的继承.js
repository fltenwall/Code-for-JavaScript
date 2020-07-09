class Animal{//es6提供了类，只能new
	//实现抽象类
	constructor(){

		// if(new.target === Animal){
		// 	throw new Error("not new Animal");
		// }

		//实例上的属性和方法
		this._type = "animal";
		this.age = 20;
	}

	//类的原型prototype对象上的方法
	eat(){
		console.log('eat..');
	}

	//静态属性
	static get num(){
		return "num";
	}

}

/*
（1）父类静态属性和静态方法的继承
Tiger.__proto__ = Animal;//改变Tiger的__proto__指向，修改其父类的原型指向，实现静态属性和静态方法的继承
（2）父类原型上的属性和实例方法的继承
Tiger.prototype = Object.create(Animal.prototype);
（3）父类实例属性和实例方法的继承
Animal.call(this);
*/
class Tiger extends Animal{
	constructor(){//使用this之前必须调用super
		//实例属性和实例方法
		super();//Animal.call(this)
	};

	static parentNum(){
		return super.num;//super指向父类自身
	};

	eat(){
		super.eat();//super指向父类的原型
	}
}

let tiger = new Tiger('tiger1');

//调用实例属性
console.log(tiger.age);//20
//调用原型方法
tiger.eat();//eat..
//调用静态方法
console.log(Tiger.parentNum());//num