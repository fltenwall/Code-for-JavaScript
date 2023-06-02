
//代码
const convert = (list) => {
    const map = list.reduce((res,v)=>{
        res[v.id] = v;
        return res;
    },{})

    const res = [];
    for(let item of list){
        if(item.parent === null){
            res.push(item);
            continue;
        }
        if(item.parent in map){
            const parent = map[item.parent];
            parent.children = parent.children || [];
            parent.children.push(item);
        }
    }
    return res;
}

//目标数组
var arr = [
    {'id' : 3,'parent' : 2},
    {'id' : 1,'parent' : null},
    {'id' : 2,'parent' : 1}
]

//期望结果
var obj = {
    id : 1,
    parent : null,
    child : {
        id : 2,
        parent : 1,
        child : {
            id : 3,
            parent : 2
        }
    }
}

convert(arr)