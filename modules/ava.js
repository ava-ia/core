'use strict';

import colors from 'colors';
// -- Configuration
import pkg from 'package.json';
// -- Composers
import NLPAlchemy from 'composers/nlp'
import TranslatorGoogle from 'composers/translator'
import ClassifierBayes from 'composers/classifier'
// -- Core
import analizer from 'modules/analizer'
const isFunction = (value) => (typeof(value) === 'function')

export default class Ava {
  static version = pkg.version;

  props = undefined;
  intents = [];
  handlerCatch = undefined;

  constructor(props = {}) {
    this.props = props;
    if (!this.props.translator) this.props.translator = TranslatorGoogle;
    if (!this.props.classifier) this.props.classifier = ClassifierBayes;
    if (!this.props.nlp) this.props.nlp = NLPAlchemy;

    this.output(`Welcome to Ava ${Ava.version}`);
    if (props.query) this.listen(props.query);

    return this;
  }

  async listen(text) {
    this.output(`... ${text}`);

    try {
      let request = await analizer.call(null, this, text);

      this.intents.map((intent) => {
        intent.script.call(null, this, request, intent.action);
      });
    } catch (error) {
      if (this.handlerCatch) {
        this.handlerCatch.call(this, error);
      } else {
        this.output(`Oops! something wrong: ${error.toString().red}`);
      }
    }
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
    this.handlerCatch = callback;

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
