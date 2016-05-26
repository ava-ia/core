'use strict';

import Hope from 'hope';
const Wit = require('node-wit').Wit;
// -- Internal
const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    cb(context);
  },
  error(sessionId, context, err) {
    console.log(err.message);
  },
};
const client = new Wit('HTEVYJ3ETY37ECGVLYBCAAQGDPNOLRFK', actions);
client.interactive()

const adaptor = (text) => {
  let promise = new Hope.Promise();

  return promise;
}

export default adaptor;
