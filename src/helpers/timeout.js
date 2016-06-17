'use strict';

import config from './config'
const timeout = config('timeout') || 60000;

export default (reject) =>
  setTimeout( () => {
    reject(new Error(`Timeout after ${timeout} ms`))
  }, timeout);
