'use strict';

import colors from 'colors';
// -- Configuration
import pkg from 'package.json';
// -- Adaptors
import NLPAlchemy from 'adaptors/nlp'
import TranslatorGoogle from 'adaptors/translator'
import ClassifierBayes from 'adaptors/classifier'
// -- Core
import analizer from 'modules/analizer'
const isFunction = (value) => (typeof(value) === 'function')

export default class Ava {
  static version = pkg.version;

  props = undefined;
  intents = [];

  constructor(props = {}) {
    this.props = props;
    this.intents = [];
    if (!this.props.translator) this.props.translator = TranslatorGoogle;
    if (!this.props.nlp) this.props.nlp = NLPAlchemy;
    if (!this.props.classifier) this.props.classifier = ClassifierBayes;
    this.output(`Welcome to Ava ${Ava.version}`);
    if (props.query) this.listen(props.query);

    return this;
  }

  async listen(text) {
    this.output(`... ${text}`);

    let request = await analizer.call(null, this, text);
    this.output(`analizer...OK`)
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

  output(text, newLine = true) {
    if (newLine) text = `${'<AVA>'.magenta} ${text}\n`.bold;
    process.stdout.write(text);
  }

  step() {
    this.output('.', false);
  }
}
