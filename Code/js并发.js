const tasks = [
  () => new Promise((resolve) => setTimeout(resolve,1000)),
  () => Promise.resolve('foo'),
  () => Promise.reject(new Error('aaa')),
  () => 'bar',
  () => new Promise((resolve) => setTimeout(resolve,1000)),
  () => Promise.resolve('eoo'),
  () => Promise.reject(new Error('bbb')),
  () => 'far',
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

/*

执行完了： [Function (anonymous)]
执行完了： [Function (anonymous)]
执行完了： [Function (anonymous)]
执行完了： [Function (anonymous)]
执行完了： [Function (anonymous)]
执行完了： [Function (anonymous)]
runTime [
  Promise { <pending> },
  Promise { undefined },
  Promise { undefined },
  Promise { undefined },
  Promise { <pending> },
  Promise { undefined },
  Promise { undefined },
  Promise { undefined }
]
执行完了： [Function (anonymous)]
执行完了： [Function (anonymous)]

res {
  resolved: [ 'foo', 'bar', 'eoo', 'far', undefined, undefined ],
  rejected: [Error: aaa, Error: bbb]
}
*/