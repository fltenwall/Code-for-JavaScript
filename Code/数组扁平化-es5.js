function flatten(arr){
	let result = [];
	for(let i=0,len=arr.length;i<len;i++){
		if(Array.isArray(arr[i])){
			result = result.concat(flatten(arr[i]))
		}else{
			result.push(arr[i])
		}
	}
	return result;
}

let oldArr = [1,2,[4,5],[3,4,5]]
let newArr = flatten(oldArr)
console.log(newArr)