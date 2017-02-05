// -- More info: https://github.com/typicode/lowdb
import lowdb from 'lowdb';
import path from 'path';
import fs from 'fs';
// -- Internal
const folder = path.resolve('.', 'store');

if (!fs.existsSync(folder)) fs.mkdirSync(folder);

export default (file, defaults = {}) => {
  const store = lowdb(`${folder}/${file}`, { storage: require('lowdb/lib/file-async') });

  if (defaults) store.defaults(defaults).value();

  return store;
};
