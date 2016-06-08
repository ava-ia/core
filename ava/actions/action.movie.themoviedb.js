'use strict';

import fetch from 'node-fetch';
// -- modules
import { relation } from 'ava/actions/modules'
import { Constants } from 'ava'
// -- Internal
const CREDENTIALS = require('credentials/action.movie.themoviedb.json');
const API = `https://api.themoviedb.org/`
const RELATIONS = ['object'];

const action = (state) => {
  return new Promise((resolve, reject) => {
    const ms = new Date()
    const { object } = relation(RELATIONS, state.nlp.relations) || state.nlp.concepts;
    console.log('ActionMovideDB'.bold.yellow, `object: ${object}`);

    let url = `${API}/3/search/multi?api_key=${CREDENTIALS.apikey}&query=${object}`;
    fetch(url)
      .then(response => response.text())
      .then(body => {
        const data = JSON.parse(body).results[0];

        if (data) {
          let action = _extract(data);
          action.ms = (new Date() - ms);
          action.engine = 'themoviedb';
          action.type = Constants.action.type.rich;
          state.actions.push(action);
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
    item.entity = Constants.entity.person;
    item.embed = data.known_for.map(movie => _extract(movie));
  }

  return item;
}

export default action;
