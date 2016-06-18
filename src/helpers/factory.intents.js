'use strict';

export default async (state) => {
  const intents = state.intents.map( intent => intent.script(state, intent) );
  state.action = undefined;

  return await Promise.race(intents);
}
