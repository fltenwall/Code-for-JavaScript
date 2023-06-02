function createArray(...element){
	const handler = {
		get(target,propKey,receiver){
			const index = Number(propKey);
			if(index < 0){
				propKey = String(target.length + index)
			}	
			return Reflect.get(target,propKey,receiver)
		}
	}

	let target = [];
	target.push(...element);
	return new Proxy(target,handler)
}

let arr = createArray('a','b','c');
arr[-2]