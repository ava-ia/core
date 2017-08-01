export default state => new Promise((resolve) => {
  if (state.intents && state.intents.length === 1) resolve(state);
});
