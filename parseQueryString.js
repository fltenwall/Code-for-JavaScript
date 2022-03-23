// 解析路径参数
const parseQueryString = (string) => {
  if(Object.is(typeof string, 'string')){
    string = String(string);
  }
  if(!string || !string.length) return {};
  const resObj = {};
  const splitArr = str.split('&');
  splitArr.forEach(item => {
    const [key, val] = item.split('=');
    if(resObj[key]){
      if(Array.isArray(resObj[key])){
        resObj[key].push(val);
      }else {
        resObj[key] = [resObj[key], val];
      }
    }else{
      resObj[key] = val;
    }
  })
  return resObj;
}

const str = 'a=1&a=2&a=3&b=2&c=3&d=4';
const res = parseQueryString(str); // {a:['1','2','3'],b:'2',c:'3',d:'4'}
console.log(res);