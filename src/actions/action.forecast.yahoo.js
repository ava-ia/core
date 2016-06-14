'use strict';

import fetch from 'node-fetch';
import moment from 'moment';
import constants from '../constants'
import { relation } from '../helpers'

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
        const condition = _extractCondition(item.condition, item.forecast, when);

        state.actions.push({
          ms: (new Date() - ms),
          engine: 'yahoo',
          type: constants.action.type.rich,
          title: item.title,
          url: item.link.split('*')[1],
          condition,
          // extra: item.forecast,
        });

        resolve(state);
      }).catch(function(error) {
        reject(error);
      });
  });
};

const _extractCondition = (condition = {}, forecast = [], when) => {
  let value = {
    code: condition.code,
    condition: condition.text,
    temperature: condition.temp,
    date: moment(condition.date, 'ddd, DD MMM YYYY hh:mm A ZZ').format(),
  };

  forecast.map( (condition) => {
    const date = moment(condition.date, 'DD MMM YYYY');

    if (date.isSame(when, 'day')) {
      return value = {
        code: condition.code,
        condition: condition.text,
        temperature: [condition.low, condition.high],
        date: date.format(),
      };
    }
  });

  return value;
};
