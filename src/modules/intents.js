export default (state) => {
  let availableActions = [];

  state.intents.forEach(({ script, actions }) => {
    if (script(state)) availableActions = Array.concat(availableActions, actions);
  });

  Object.assign(state, { action: undefined, actions: availableActions });
};
