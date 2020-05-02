function debouce<T>(fn: Function, wait: number) {
  let timer: any;
  return (...args: T[]) => {
    timer ? clearTimeout(timer) : null;
    timer = setTimeout(() => {
      fn(args);
    }, wait);
  };
}

function throttle<T>(fn: Function, wait: number) {
  let timer: any = null;
  return (...args: T[]) => {
    if (!timer) {
      fn(args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };
}

export { debouce, throttle };
