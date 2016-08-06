import pkg from '../package.json'
// -- Functions
import intent from './intent'
import listen from './listen'

export default (props = {}) => {
  const state = {
    version: pkg.version,
    intents: [],
    debug: props.debug || false
  }

  return Object.assign(
    {},
    intent(state),
    listen(state),
  )
}
