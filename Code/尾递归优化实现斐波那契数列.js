// 基础框架
function fib(n) {
  return fibImpl(0, 1, n);
}

// 执行递归
function fibImpl(a, b, n) {
  if (n === 0) {
    return a;
  }
  return fibImpl(b, a + b, n - 1);
}