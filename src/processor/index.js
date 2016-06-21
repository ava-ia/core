'use strict';

import { composeAsync } from '../helpers'

import language from './language';
import translator from './translator';
import classifier from './classifier';
import compromise from './compromise';
import taxonomy from './taxonomy';
import relations from './relations';
import sentiment from './sentiment';

export default (state) => {
  const factory = composeAsync(language, translator, taxonomy, classifier, compromise, relations, sentiment);

  return factory(state);
}
