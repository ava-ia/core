'use strict';

import fetch from 'node-fetch';
import moment from 'moment';
// -- Internal
const API = `http://query.yahooapis.com/v1/public/yql?q=`

export default (state, relations) => {

  return new Promise((resolve, reject) => {
    console.log('ActionForecastYahoo'.bold.yellow, `location: ${location}, when: ${when}`);

    const { location, when } = relations;
    const ms = new Date()
    const query = escape(`select item from weather.forecast where woeid in (select woeid from geo.places where text='${location}') and u='c' | truncate(count=1)`);

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
