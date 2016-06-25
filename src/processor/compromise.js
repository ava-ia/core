// -- More Info: https://github.com/nlp-compromise/nlp_compromise
'use strict';

import Compromise from 'nlp_compromise';

export default (state) => {

  state.type = Compromise.sentence(state.sentence).sentence_type();
  state.topics = Compromise.text(state.sentence).topics().map( topic => topic.text );

  return (state);
};
