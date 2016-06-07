'use strict';

import fetch from 'node-fetch';
import moment from 'moment';
// -- modules
import { relation } from 'actions/modules'
// -- Internal
const API = `http://query.yahooapis.com/v1/public/yql?q=`
const RELATIONS = ['when', 'location'];

export default (state) => {

  return new Promise((resolve, reject) => {
    const { location, when } = relation(RELATIONS, state.nlp.relations);
    const ms = new Date()
    const query = escape(`select item from weather.forecast where woeid in (select woeid from geo.places where text='${location}') and u='c' | truncate(count=1)`);
    console.log('ActionForecastYahoo'.bold.yellow, `location: ${location}, when: ${when}`);

    fetch(`${API}${query}&format=json`)
      .then(response => response.text())
      .then(body => {
        const item = JSON.parse(body).query.results.channel.item;

        state.actions.push({
          ms: (new Date() - ms),
          type: 'text',
          value: {
            lat: item.lat,
            long: item.long,
            link: item.link.split('*')[1],
            code: item.condition.code,
            date: item.condition.date,
            temp: item.condition.temp,
            text: item.condition.text,
            // forecast: item.forecast,
          }
        });

        resolve(state);
      }).catch(function(error) {
        reject(error);
      });
  });
};
