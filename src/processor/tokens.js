// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';

export default (state) => {
  state.tokens = Compromise.text(state.sentence).root().split(' ');

  return (state);
};
