export default (state) => {
  const intents = state.intents.map(intent => intent.script(state, intent.actions));

  return Promise.race(intents);
};
