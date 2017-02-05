export default (reject, ms = 60000) =>
  setTimeout(() => {
    reject(new Error(`Timeout after ${ms} ms`));
  }, ms);
