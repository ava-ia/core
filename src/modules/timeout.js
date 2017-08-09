export default (state, ms = 60000) => {
  const timeout = setTimeout(() => {
    throw new Error(`Timeout ${ms}ms`);
  }, ms);

  Object.assign(state, { timeout });
};
