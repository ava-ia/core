'use strict';

import weather from 'weather-js';
import constants from '../constants'
import { relation } from '../helpers'
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

        type: constants.action.type.rich,
        title: `Conditions for ${item.location.name} at ${item.current.observationtime}`,
        value: {
          code: item.current.skycode,
          condition: item.current.skytext,
          temperature: item.current.temperature,
        },
        date: item.current.date,
        extra: item.forecast
      })
      resolve(state);
    });
  });
};
