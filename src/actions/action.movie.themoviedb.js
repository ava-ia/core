'use strict';

import fetch from 'node-fetch';
import constants from '../constants'
import { credentials, relation } from '../helpers'
// -- Internal
const config = credentials('themoviedb');
const RELATIONS = ['object'];

const action = (state) => {
  if (!config) return (state);

  return new Promise((resolve, reject) => {
    const ms = new Date()
    const { object } = relation(RELATIONS, state.nlp.relations) || state.nlp.concepts;
    console.log('ActionMovieDB'.bold.yellow, `object: ${object}`);

    let url = `${config.url}/3/search/multi?api_key=${config.apikey}&query=${object}`;
    fetch(url)
      .then(response => response.text())
      .then(body => {
        const data = JSON.parse(body).results[0];
        if (data) {
          state.action = _extract(data);
          state.action.ms = (new Date() - ms);
          state.action.engine = 'themoviedb';
          state.action.type = constants.action.type.rich;
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
    item.entity = constants.entity.person;
    item.embed = data.known_for.map(movie => _extract(movie));
  }

  return item;
}

export default action;
