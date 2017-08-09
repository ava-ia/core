import { actions, intents as availableIntents, processor, timeout } from './modules';

export default state => ({
  async listen(sentence, ms = 60000) {
    let action;
    Object.assign(state, { action, rawSentence: sentence, timestamp: new Date() });

    timeout(state, ms);
    await processor(state);
    availableIntents(state);
    action = await actions(state);
    clearTimeout(state.timeout);
    if (!action) throw new Error('Not action');

    return Object.assign(state, { action });
  },
});
