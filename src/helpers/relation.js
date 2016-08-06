export default (keys, state) => {
  const relations = state.relations || {}
  const found = {}
  keys.filter((key) => (relations[key] ? found[key] = relations[key].text : null))

  return found
}
