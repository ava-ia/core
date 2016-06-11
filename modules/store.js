// -- More info: https://github.com/typicode/lowdb
'use strict';

import lowdb from 'lowdb';

export default (file, defaults = {}) => {
  const store = lowdb(`store/${file}`, { storage: require('lowdb/lib/file-async') });

  if (defaults) store.defaults(defaults).value();

  return store;
}
