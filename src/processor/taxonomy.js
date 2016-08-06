import AlchemyAPI from 'alchemy-api'
import { config } from '../helpers'
// -- Internal
const credentials = config('alchemy')
let processor
if (credentials) processor = new AlchemyAPI(credentials.apikey)

export default (state) => {
  if (!credentials) return (state)

  return new Promise((resolve) => {
    processor.taxonomies(state.sentence, {}, (error, response) => {
      if (error || !response.taxonomy) return resolve(state)

      const taxonomy = response.taxonomy[0]
      if (taxonomy) {
        state.taxonomy = (taxonomy.label.charAt(0) === '/') ? taxonomy.label.slice(1) : taxonomy.label
      }

      resolve(state)
    })
  })
}
