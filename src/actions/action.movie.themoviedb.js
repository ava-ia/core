import fetch from 'node-fetch';
import { config, entities, relation, trace } from '../helpers';
// -- Internal
const credentials = config('themoviedb');
const RELATIONS = ['object', 'subject'];

const extract = (data) => {
  const item = {
    date: data.release_date || data.first_air_date,
    image: `http://image.tmdb.org/t/p/w320${data.poster_path || data.profile_path}`,
    text: data.overview,
    title: data.title || data.name,
    value: {
      id: data.id,
      popularity: data.popularity,
      vote_average: data.vote_average,
    },
  };

  if (data.media_type === 'person') {
    item.entity = entities.person;
    item.related = data.known_for.map(movie => extract(movie));
  }

  return item;
};

export default async(state) => {
  if (!credentials) return state;

  let action;
  const { object, subject } = relation(RELATIONS, state);
  const query = object || subject || state.relations;

  trace('ActionMovieDB', { subject, object }, state);
  const url = `${credentials.url}/3/search/multi?api_key=${credentials.apikey}&query=${query}`;
  const response = await fetch(url).catch(() => state);
  const json = await response.json();

  const data = json.results[0];
  if (data) {
    action = Object.assign(extract(data), {
      engine: 'themoviedb',
      entity: entities.knowledge,
    });
  }

  return action;
};
