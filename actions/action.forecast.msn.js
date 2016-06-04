'use strict';

import weather from 'weather-js';

export default (state, relations) => {

  return new Promise((resolve, reject) => {
    console.log('ActionForecastMSN'.bold.yellow, `location: ${location}, when: ${when}`);

    const { location, when } = relations;
    const ms = new Date()

    console.log(location, when);

    weather.find({search: location, degreeType: 'C'}, (error, response) => {
      console.log(error, response);
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
