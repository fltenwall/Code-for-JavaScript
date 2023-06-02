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

	//更改实例属性
	get type(){
		//这里的this指向调用者，即实例对象
		return this._type;
	}

	set type(newType){
		this._type = newType;
	}

	//报错
	// get age(){
	// 	return this.age;
	// }

	//类的原型prototype对象上的方法
	eat(){
		console.log('eat..');
	}

	//类的原型prototype对象上的属性
	get a(){
		return 100;
	}

	//es6中不支持静态属性
	// static a = 10;//报错

	//静态属性
	static get num(){
		return "num";
	}

	//静态方法
	static jump(){
		return "jump.."
	}

	// a = 1;//实例上的属性，es7中的语法，node环境还无法使用
}

let animal = new Animal();

//调用原型上的方法
animal.eat();//eat..

//调用原型上的属性
console.log(animal.a);//100

//调用类的静态属性和静态方法
console.log(Animal.num);//num
console.log(Animal.jump());//jump

//使用get和set修改后的实例属性
animal.type = "dog";
console.log(animal.type);//dog

console.log(animal.age);

// Animal();//直接调用报错

//实现class只能new的类似功能
function Person(){

	if(!(this instanceof Person)){
		throw new Error("not new");
	}

};
// Person();//报错
