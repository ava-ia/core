export default (state, actions) => {
  const promises = actions.map(action => action.call(null, state));

  return Promise.race(promises);
};
