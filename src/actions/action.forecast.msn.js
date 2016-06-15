'use strict';

import moment from 'moment';
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
      const condition = _determineCondition(item.current, item.forecast, when);
      state.action = {
        ms: (new Date() - ms),
        engine: 'msn',

        type: constants.action.type.rich,
        title: `Conditions for ${item.location.name} at ${item.current.observationtime}`,
        value: condition
      }
      if (!when) state.action.related = item.forecast;

      resolve(state);
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
