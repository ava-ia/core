// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Hope from 'hope';
import Compromise from 'nlp_compromise';

export default (request) => {
  let promise = new Hope.Promise();

  promise.done(null, request);

  return promise;
};
