//快照沙箱
 class SnapshotSandbox{
 	constructor(){
 		this.proxy = window;
 		this.modifyPropMap = {};
 		this.active();
 	}
 	// 激活
 	active(){
 		this.windowSnapshot = {};
 		for(const prop in window){
 			if(window.hasOwnProperty(prop)){
 				this.windowSnapshot[prop] = window[prop];
 			}
 		}
 		Object.keys(this.windowSnapshot).forEach(p => {
 			window[p] = this.modifyPropMap[p];
 		})
 	}

 	// 失效
 	inactive(){
 		for(const prop in window){
 			if(window.hasOwnProperty(prop)){
 				if(window[prop] !== this.windowSnapshot[prop]){
 					this.modifyPropMap[prop] = window[prop];
 					window[prop] = this.windowSnapshot[prop];
 				}
 			}
 		}
 	}
 }

 let sandbox = new SnapshotSandbox();

 ((window) => {
 	window.a = 1;
 	window.b = 2;
 	console.log(window.a,window.b);
 	sandbox.inactive();
 	console.log(window.a,window.b);
 	 sandbox.active();
 	console.log(window.a,window.b);
 })(sandbox.proxy)