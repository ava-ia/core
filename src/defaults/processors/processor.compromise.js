// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';

export default (state) => {

  state.nlp.type = Compromise.sentence(state.sentence).sentence_type();
  state.nlp.topics = Compromise.text(state.sentence).topics();

  return (state);
};
