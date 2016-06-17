'use strict';

import { compromise, taxonomy, relations, sentiment } from './processors'
import { composeAsync } from '../helpers'

export default async (state) => {
  const time = new Date();
  const factory = composeAsync(compromise, taxonomy, relations, sentiment);

  state.sentence = state.sentence.toLowerCase();
  state.nlp = {};
  await factory(state);
  state.nlp.ms = (new Date() - time);

  return state;
};
