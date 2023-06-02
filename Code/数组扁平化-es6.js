function flatten(arr){
	while(arr.some(item => Array.isArray(item))){
		arr = [].concat(...arr);
	}
	return arr;
}

let oldArr = [1,[2,3],[3,4,5]]
let newArr = flatten(oldArr);
console.log(newArr)