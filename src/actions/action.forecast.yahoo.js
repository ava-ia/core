import fetch from 'node-fetch';
import moment from 'moment';
import { entities, relation, trace } from '../helpers';

// -- Internal
const URL = 'http://query.yahooapis.com/v1/public/yql?q=';
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

export default async(state) => {
  const { location, when } = relation(RELATIONS, state);
  const query = escape(`${QUERY} where text='${location}') and u='c' | truncate(count=1)`);

  if (!location) return { entity: entities.request, request: { relation: ['location'] } };

  trace('ActionForecastYahoo', { location, when }, state);
  const response = await fetch(`${URL}${query}&format=json`).catch(() => state);
  const json = await response.json();

  const item = json.query.results.channel.item;
  const condition = determineCondition(item.condition, item.forecast, when);
  return {
    engine: 'yahoo',
    entity: entities.knowledge,
    title: item.title,
    url: item.link.split('*')[1],
    value: condition,
    related: !when ? item.forecast : undefined,
  };
};
