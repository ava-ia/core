'use strict';

import colors from 'colors';
// -- Configuration
import pkg from 'package.json';
// -- Adaptors
import Language from 'adaptors/language'
import NLPAlchemy from 'adaptors/nlp'
import TranslatorGoogle from 'adaptors/translator'
import ClassifierBayes from 'adaptors/classifier'
// -- Core
import metadata from './metadata'
import output from './output'
const LANGUAGE = 'en';
const isFunction = (value) => (typeof(value) === 'function')

export default class Ava {
  static version = pkg.version;

  props = undefined;
  metadata = metadata;
  output = output;
  intents = [];

  constructor(props = {}) {
    this.props = props;
    this.intents = [];
    if (!this.props.translator) this.props.translator = TranslatorGoogle;
    if (!this.props.nlp) this.props.nlp = NLPAlchemy;
    if (!this.props.classifier) this.props.classifier = ClassifierBayes;
    this.output(`Welcome to Ava ${Ava.version}`);
    if (props.query) this.analize(props.query);

    return this;
  }

  intent(scripts, actions) {
    if (isFunction(scripts)) scripts = [scripts];
    if (isFunction(actions)) actions = [actions];

    if (Array.isArray(scripts) && Array.isArray(actions)) {
      scripts.map((script) => {
        if (isFunction(script)) {
          actions.map((action) => isFunction(action) ? this.intents.push({script: script, action: action}) : null);
        }
      })
    }

    return this;
  }

  catch(callback) {
    this.handleError = callback;

    return this;
  }

  async analize(text) {
    this.output('Analyzing');
    try {
      let request = { raw: text, phrase: text };

      request.language = await Language(request.phrase, this);
      if (request.language.iso !== LANGUAGE) {
        request.language = await this.props.translator(request.phrase, request.language.iso, this);
        request.phrase = request.language.phrase;
        delete request.language.phrase;
      }
      request.classifier = await this.props.classifier.categorize(request.phrase, request.language.iso);
      request.nlp = await this.props.nlp(request.phrase, this);
      if (request.nlp.taxonomy && request.classifier !== request.nlp.taxonomy.label) {
        this.props.classifier.learn(request.raw, request.language.iso, request.nlp.taxonomy.label);
      }

      this.metadata(request);

    } catch (error) {
      if (this.handleError) {
        this.handleError.call(this, error);
      } else {
        this.output(`Oops! something wrong: ${error.toString().red}`);
      }
    }
  }

  step() {
    this.output('.', false);
  }
}
