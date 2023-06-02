function Animal(){
	//成员属性
	this.type = "animal";
	//成员方法
	this.say = function(){
		console.log('say');
	}
	console.log('c');
};

let animal = new Animal();

//prototype上的方法（公共方法）
//每一个类上都有一个原型->对象
Animal.prototype.cat = function(){
	console.log('a');
}

//prototype上的属性（公共属性）
Animal.prototype.num1 = 1;
console.log(animal.type);
console.log(animal.hasOwnProperty('type'));

//每一个对象都有一个__proto__属性，指向父类的prototype
console.log(animal.__proto__ === Animal.prototype);//true

//每个类的prototype都有一个constructor属性，指向该类
console.log(animal.constructor);//[Function:Animal]
console.log(animal.__proto__.constructor === animal.constructor );//true

console.log(animal.__proto__.__proto__.__proto__ === null);//true
console.log(animal.__proto__.__proto__ === Object.prototype);//true
console.log(Animal.prototype.__proto__ === Object.prototype);//true
console.log(Object.prototype.__proto__);//null

animal.cat();//a
animal.say();//say

animal.cat = function(){
	console.log('cat..');
}
animal.cat();//cat..

let animal2 = new Animal();
animal2.cat();//a

console.log(animal.num1);//1

Animal();//构造函数作为普通函数调用

/*

1.类
静态属性和静态方法
（1）静态属性和静态方法能够被实例对象继承，但不能被修改

2.原型（prototype）
（1）类中的prototype属性指向自己的原型对象（独立空间）
（2）类的实例对象通过__proto__属性指向类的原型对象，可以通过原型链向上访问原型上的属性和方法，但不能修改原型上的属性和方法

3.实例
成员属性和成员方法

*/