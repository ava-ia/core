// -- More info: https://github.com/typicode/lowdb
'use strict';

import lowdb from 'lowdb';

export default (fileRoute, defaults = {}) => {
  const store = lowdb(`store/${fileRoute}`, { storage: require('lowdb/lib/file-async') });

  if (defaults) store.defaults(defaults).value();

  return store;
}
