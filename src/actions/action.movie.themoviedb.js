'use strict';

import fetch from 'node-fetch';
import { config, entities, relation } from '../helpers'
// -- Internal
const credentials = config('themoviedb');
const RELATIONS = ['object', 'subject'];

const action = (state) => {
  if (!credentials) return (state);

  return new Promise((resolve, reject) => {
    const ms = new Date()
    const { object, subject } = relation(RELATIONS, state);
    const query = object || subject || state.relations;
    if (state.debug)
      console.log('ActionMovieDB'.bold.yellow, `subject: ${subject}`, `object: ${object}`);

    let url = `${credentials.url}/3/search/multi?api_key=${credentials.apikey}&query=${query}`;
    fetch(url)
      .then(response => response.json())
      .then(body => {
        const data = body.results[0];
        if (data) {
          state.action = _extract(data);
          state.action.ms = (new Date() - ms);
          state.action.engine = 'themoviedb';
          state.action.entity = entities.knowledge;
        }

        resolve(state);
      })
  });
};

const _extract = (data) => {
  let item = {
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
    item.related = data.known_for.map(movie => _extract(movie));
  }

  return item;
}

export default action;
