export default state => Promise.race(state.actions.map(script => script.call(null, state)));
