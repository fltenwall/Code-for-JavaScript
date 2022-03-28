function * fabonacciSequence(){
    let [x, y] = [0, 1];
    for(;;){
        yield y;
        [x,y] = [y,x+y];
    }
};
function fibonacci(n){
    for(let f of fabonacciSequence()){
        if(n-- <= 0) return f;
    }
};
fibonacci(20); // 10946

function * take(n, iterable){
    let it = iterable[Symbol.iterator]();
    while(n-- > 0){
        let next = it.next();
        if(next.done) return;
        else yield next.value;
    }
};
[...take(5, fabonacciSequence())] // [1, 1, 2, 3, 5]
