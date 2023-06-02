class ProxySandbox{
	constructor(){
		const rawWindow = window;
		const fakeWindow = {};
		const proxy = new Proxy(fakeWindow,{
			set(target,p,value){
				target[p] = value;
				return true
			},
			get(target,p){
				return target[p] || rawWindow[p];
			}
		})
		this.proxy = proxy;
	}
}

const sandbox1 = new ProxySandbox();
const sandbox2 = new ProxySandbox();
window.a = 1;
( ( window ) => {
	window.a = 'hello';
	console.log(window.a)
} )(sandbox1.proxy)

( ( window ) => {
	window.a = 'hello';
	console.log(window.a)
} )(sandbox2.proxy)