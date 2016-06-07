'use strict';

import weather from 'weather-js';
// -- modules
import { relation } from 'actions/modules'
// -- Internal
const RELATIONS = ['when', 'location'];

export default (state) => {

  return new Promise((resolve, reject) => {
    const { location, when } = relation(RELATIONS, state.nlp.relations);
    const ms = new Date()
    console.log('ActionForecastMSN'.bold.yellow, `location: ${location}, when: ${when}`);

    weather.find({search: location, degreeType: 'C'}, (error, response) => {
      if (error) return reject(error);
      const item = response[0];
      state.actions.push({
        ms: (new Date() - ms),
        type: 'text',
        value: {
          location: item.location,
          current: item.current,
          forecast: item.forecast,
        }
      })
      resolve(state);
    });
  });
};
