'use strict';

import fetch from 'node-fetch';
import moment from 'moment';
// -- modules
import { relation } from 'ava/actions/modules'
import { Constants } from 'ava'

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
          engine: 'yahoo',

          type: Constants.action.type.rich,
          title: item.title,
          url: item.link.split('*')[1],
          value: {
            code: item.condition.code,
            condition: item.condition.text,
            temperature: item.condition.temp,
          },
          date: item.condition.date,
          // extra: item.forecast
        });

        resolve(state);
      }).catch(function(error) {
        reject(error);
      });
  });
};
