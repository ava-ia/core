import fetch from 'node-fetch'
import { config, entities, relation } from '../helpers'
// -- Internal
const credentials = config('themoviedb')
const RELATIONS = ['object', 'subject']

const extract = (data) => {
  const item = {
    date: data.release_date || data.first_air_date,
    image: `http://image.tmdb.org/t/p/w320${data.poster_path || data.profile_path}`,
    text: data.overview,
    title: data.title || data.name,
    value: {
      id: data.id,
      popularity: data.popularity,
      vote_average: data.vote_average
    }
  }

  if (data.media_type === 'person') {
    item.entity = entities.person
    item.related = data.known_for.map(movie => extract(movie))
  }

  return item
}

export default (state) => {
  if (!credentials) return (state)

  return new Promise((resolve) => {
    const ms = new Date()
    const { object, subject } = relation(RELATIONS, state)
    const query = object || subject || state.relations
    if (state.debug) {
      console.log('ActionMovieDB'.bold.yellow, `subject: ${subject}`, `object: ${object}`)
    }

    fetch(`${credentials.url}/3/search/multi?api_key=${credentials.apikey}&query=${query}`)
      .then(response => response.json())
      .then(body => {
        const data = body.results[0]
        if (data) {
          state.action = extract(data)
          state.action.ms = (new Date() - ms)
          state.action.engine = 'themoviedb'
          state.action.entity = entities.knowledge
        }

        resolve(state)
      })
  })
}
