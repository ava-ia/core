import fetch from 'node-fetch';
import moment from 'moment';
import { entities, relation, request, trace } from '../helpers';

// -- Internal
const API = 'http://query.yahooapis.com/v1/public/yql?q=';
const RELATIONS = ['when', 'location'];
const QUERY = 'select item from weather.forecast where woeid in (select woeid from geo.places';

const determineCondition = (condition = {}, forecast = [], when) => {
  let value = {
    code: condition.code,
    condition: condition.text,
    temperature: condition.temp,
    date: moment(condition.date, 'ddd, DD MMM YYYY hh:mm A ZZ').format(),
  };

  if (when) {
    const day = forecast.find(item => moment(item.date, 'DD MMM YYYY').isSame(when, 'day'));
    if (day) {
      value = {
        code: condition.code,
        condition: condition.text,
        temperature: [condition.low, condition.high],
        date: moment(day.date, 'DD MMM YYYY').format(),
      };
    }
  }

  return value;
};

export default (state) => {
  const { location, when } = relation(RELATIONS, state);
  const ms = new Date();
  const query = escape(`${QUERY} where text='${location}') and u='c' | truncate(count=1)`);

  return new Promise((resolve, reject) => {
    trace('ActionForecastYahoo', { location, when }, state);
    if (!location) return resolve(request(state, { relation: ['location'] }));

    return fetch(`${API}${query}&format=json`)
      .then(response => response.json())
      .then((body) => {
        const item = body.query.results.channel.item;
        const condition = determineCondition(item.condition, item.forecast, when);
        state.action = {
          ms: (new Date() - ms),
          engine: 'yahoo',
          entity: entities.knowledge,
          title: item.title,
          url: item.link.split('*')[1],
          value: condition,
        };
        if (!when) state.action.related = item.forecast;

        resolve(state);
      })
      .catch(reject);
  });
};
