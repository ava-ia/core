import { composeAsync } from '../../helpers';

import language from './language';
import translator from './translator';
import classifier from './classifier';
import compromise from './compromise';
// import taxonomy from './taxonomy';
import tokens from './tokens';
import relations from './relations';
import sentiment from './sentiment';

export default (state) => {
  const composer = composeAsync(language, translator, classifier, compromise, tokens, relations, sentiment);

  return composer(state);
};
