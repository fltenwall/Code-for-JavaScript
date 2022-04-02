const tasks = [
  () => new Promise(() => setTimeout(()=>{console.log('1000');return 1000},1000)),
  () => Promise.resolve(function fn1(){console.log('foo');return 'foo'}),
  () => Promise.reject(new Error('aaa')),
  () => 'bar',
  () => new Promise(() => setTimeout(()=>{console.log('2000');return 2000},2000)),
  () => new Promise(() => setTimeout(()=>{console.log('1000');return 1000},1000)),
  () => new Promise(() => setTimeout(()=>{console.log('3000');return 3000},3000)),
  () => new Promise(() => setTimeout(()=>{console.log('1000');return 1000},1000)),
  () => Promise.resolve('eoo'),
  () => Promise.reject(new Error('bbb')),
  () => 'far',
  () => 'koa',
  () => 'express',
];

function dispatch(tasks, concurrency, done){
  const tasksList = tasks;
  const result = {
    resolved : [],
    rejected : [],
  }
  const runTime = [];
  let flag = null;

  function resolve(res) {result.resolved.push(res)};
  function rejected(err) {result.rejected.push(err)};

  async function handlePromise(task){
    const runner = Promise.resolve(task()).then(resolve).catch(rejected);
    runTime.push(runner);
    await runner;
    console.log('执行完了：',task);
    walk(1);
  }

  function walk(c) {
    if(tasks.length === 0 && !flag){
      console.log('runTime',runTime);
      return flag = Promise.all(runTime).finally(() => {
        done(result)
      })
    }
    tasksList.splice(0,c).forEach(handlePromise);
  }

  walk(concurrency);
}

function dispatcher(tasks, concurrency) {
  return new Promise(function(resolve,reject){
    dispatch(tasks, concurrency, resolve);
  })
}

dispatcher(tasks,3).then(res => console.log('res',res));