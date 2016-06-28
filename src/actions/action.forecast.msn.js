'use strict';

import moment from 'moment';
import weather from 'weather-js';
import { entities, relation, request } from '../helpers'
// -- Internal
const RELATIONS = ['when', 'location'];

export default (state) => {

  return new Promise((resolve, reject) => {
    const { location, when } = relation(RELATIONS, state);
    const ms = new Date()
    if (state.debug)
      console.log('ActionForecastMSN'.bold.yellow, `location: ${location}, when: ${when}`);

    if (!location) return resolve( request(state, {relation: ['location']}) );

    weather.find({search: location, degreeType: 'C'}, (error, response) => {
      if (!error) {
        const item = response[0];
        const condition = _determineCondition(item.current, item.forecast, when);
        state.action = {
          ms: (new Date() - ms),
          engine: 'msn',
          entity: entities.knowledge,
          title: `Conditions for ${item.location.name} at ${item.current.observationtime}`,
          value: condition
        }
        if (!when) state.action.related = item.forecast;

        resolve(state);
      }
    });
  });
};

const _determineCondition = (condition = {}, forecast = [], when) => {
  let value = {
    code: condition.skycode,
    condition: condition.skytext,
    temperature: condition.temperature,
    humidity: condition.humidity,
    wind: condition.windspeed,
    date: moment(condition.date, 'YYYY-MM-DD').format(),
  };

  forecast.map( (condition) => {
    const date = moment(condition.date, 'YYYY-MM-DD');
    if (date.isSame(when, 'day')) {
      return value = {
        code: condition.skycodeday,
        condition: condition.skytextday,
        temperature: [condition.low, condition.high],
        date: date.format(),
      };
    }
  });

  return value;
};
