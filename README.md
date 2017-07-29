# <a href='https://github.com/ava-ia/core'><img src='https://dl.dropboxusercontent.com/s/pdoawhkvg295ish/ava.png?dl=0' height='128'></a>

[![npm version](https://img.shields.io/npm/v/ava-ia.svg?style=flat-square)](https://www.npmjs.com/package/ava-ia) [![Build Status](http://img.shields.io/travis/ava-ia/core/master.svg?style=flat-square)](https://travis-ci.org/ava-ia/core) [![NPM Status](http://img.shields.io/npm/dm/ava-ia.svg?style=flat-square)](https://www.npmjs.org/package/ava-ia) [![devDependency Status](https://img.shields.io/david/ava-ia/core.svg?style=flat-square)](https://david-dm.org/ava-ia/core#info=dependencies) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/soyjavi)
[![npm](https://img.shields.io/npm/l/botkit.svg?style=flat-square)](https://spdx.org/licenses/MIT)

The main purpose of AVA (Agnostic Virtual Assistant) is create a clever/fast assistant for any kind of context. This repository concerns the *core* of AVA so feel free for try in your NodeJS projects.

Nowadays we can find a lot of assistants, and more and more in the coming years, all of us know that Apps in the future will be more *conversational* and less *click/action*. For that reason our approach is create an agnostic and reusable system for help developers to create any kind of virtual assistants.

This is an Open Source project, so any help will be welcomed.


## A little story about language processing... *and how Ava works*.

If you have never worked with assistants/bots then you have to know that we need to analyze a given input and give it a semantic value. To do this often use NLP, *Natural Language Processing*. AVA in its case incorporates its own NLP but as you will see later we can use either. For example:

> "I need an appointment with the dentist tomorrow at 2pm in London"

AVA must understand your sentence and creates a *sentence relations scenario* like:
  + **SUBJECT** `I`
  + **ACTION** `need`
  + **VALUE** `1`
  + **OBJECT** `appointment`
  + **ITEM** `the dentist`
  + **WHEN** `Fri Jun 11 2016 14:00:00 GMT+0700 (ICT)`
  + **LOCATION** `London`

Also gives you a *contextual information*:
  + **LANGUAGE** = `en`
  + **TYPE** = `declarative`
  + **SENTIMENT** = `0` (neutral)
  + **CLASSIFIER** = `/travel/transit`
  + **PROFILE** *(If previously user has talked with AVA, returns a history)*

Ava depends on how you set up, but the next step is to process all the intents set. An intent is nothing more than a set of rules for scenarios *sentence relations* and *contextual information*.
  + **has LOCATION?** *yes, London*
  + **is negative SENTIMENT?** *no, is neutral*
  + **know WHEN?** *yes, tomorrow at 2pm*
  +

If any intent is successful, it will be assigned an action (or more) which will be returned to the user in answer mode.
  + Set an appointment in phone's calendar like `${ITEM} in ${LOCATION} on ${DATE}`

And that is, :)


## Installation

AVA can be installed as an [npm package](https://www.npmjs.org/package/ava-ia):

```bash
$ npm install --save ava-ia
```


## Basic usage

```js
import Ava from `ava-ia`;
import { weather, movie } from `ava-ia/lib/intents`;
import { forecastYahoo, forecastMSN, movieDB } from `ava-ia/lib/actions`;

// 1. New instance
const ava = new Ava({
  debug: true // If you want see intents/actions trace log.
});

// 2. Configure the intents
ava
  .intent(weather, [forecastYahoo, forecastMSN])
  .intent(movie, movieDB);

// 3. Chat with Ava
ava.listen('Do you know if tomorrow will rain in Bangkok?')
  .then(state => console.log(state))
  .catch(error => console.log(state))
```


## Instance methods

#### intent()
The purpose of this method is to *teach* Ava about what kinds of things it can *answer* for you. As you read in the introduction the core of ava use *Intents* and *Actions* which are simple functions that receive a state and return it with an internal composition.

The method `intent` is *chainable* that means you can attach all the intents you need, more intents means Ava is more clever 😉. This method takes two parameters:

  - `intent`: the *function* you wanna attach
  - `actions`: an action *function* (or *Array* of functions) those will call if the intent is is satisfactorily resolved.

```js
import { weather } from `ava-ia/lib/intents`;
import { forecastYahoo } from `ava-ia/lib/actions`;

ava.intent(weather, forecastYahoo);
```

If we want attach two *actions* for the same *intent* just write:

```js
import { forecastYahoo, forecastMSN } from `ava-ia/lib/actions`;

ava.intent(weather, [forecastYahoo, forecastMSN]);
```

Ava will wait for the first successful action, that means it's like a race between the *actions* of a determinate *intent* and wins which finish first. If you wanna create a chain of `intents` it's quite easy:

```js
import { weather, movie } from `ava-ia/lib/intents`;
import { forecastYahoo, movieDB } from `ava-ia/lib/actions`;

ava
  .intent(weather, forecastYahoo)
  .intent(movie, movieDB);
```

#### listen()
The purpose of this method is *talk* with Ava. Just receive an `string` parameter and returns a `Promise`:

```js
ava.listen('Do you know if tomorrow will rain in Bangkok?')
  .then(state => console.log(state))
  .catch(error => console.log(state))
```

If the promise is successful it will return a `object` with the state which contains the result of the processor and intents. The attributes of the *state* are:

  - `rawSentence`: contains an *string* with the origin sentence.
  - `language`: contains an *string* ISO code for language (cca2) of the sentence.
  - `sentence`: contains an *string* sentence translated to english
  - `taxonomy`: If `config.json` contains your [AlchemyAPI]() code containing an *array* of taxonomies.
  - `classifier`: contains an array of terms for identify the sense of the sentence.
  - `type`: *declarative*, *interrogative* or *exclamative* sentence.
  - `topics`: contains an *array* of most important terms of the sentence.
  - `tokens`: contains an *array* of rooted terms.
  - `relations`: contains an *object* with the sentence relations:
      + `subject`
      + `adverb`
      + `action`
      + `object`
      + `when`
      + `location`
      + `value`
  - `sentiment`: contains an *number* being `-5` most negative , `0` neutral and `+5` most positive.

The most important attribute of *state* is `action` which contains an *object* with:
  - `engine`: a *string* with the name of the action
  - `ms`: contains the *number* of miliseconds waisted for resolve the action.
  - `entity`: a *string* describing the type of content of the action.
  - `title`: a *string*
  - `text`: a *string* (optional).
  - `value`: a *object* with explicit information about the content (optional).
  - `image`: a *stringURL* (optional).
  - `url`: a *url* with contains more info (optional).
  - `related`: a *object* with extra information (optional).
  - `date`: a *date* (optional).

In the case that Ava can't find a action for our sentence it will return an error that we can capture in the `catch` method.


## Extend Ava with new *Intents* & *Actions*
Extending Ava is quite easy, as you know all predefined *Intents* & *Actions* are stateless functions. So if you respect the input interface you can create your own Ava easily, lets see how.

#### Create a new *Intent*
Remember that when we set an intent in a determinate Ava instance we only need code:

```js
import intentName from './intentName.js';

ava.intent(intentName, action);
```

Ava will process your intent definition and will queue it on intents list to execute. But... what is your intent definition?, well you will receive two parameters:
  - `state`: the actual *object* state.
  - `actions`: a *array* of actions to execute if intent is successful.

Lets see the basic definition of your *intent*:

**intentName.js**
```js
import { resolve } from 'ava-ia/lib/helpers'

export default (state, actions) => {
  resolve(state);
};
```

All intents must be *resolved* with the `state` (like a promise) but maybe your function it isn't a promise (async) for that reason we build the *helper* `resolve`. Just call it and your *intent* will be part of the factory of *intents*. Now we will see a complete example, our *intent* will:
  - check if a list of *terms* are part of `state` attributes `tokens` and `classifier`
  - check if the sentence has a specific syntax

```js
'use strict';

import { factoryActions, intersect, syntax, resolve } from 'ava-ia/lib/helpers'
// -- Internal
const TERMS = [ 'film', 'movie' ];
const RULES = [
  '[Person] want see [Noun]',
];

export default (state, actions) => {
  const tokens = intersect(TERMS, state.tokens);
  const classifiers = intersect(TERMS, state.classifier);
  const match = syntax(state.sentence, RULES);

  if (tokens || classifiers || match) {
    return factoryActions(state, actions);
  } else {
    return resolve(state);
  }
};
```

As you can see, if we have `tokens`, or `classifiers` or `match` fulfilled we will call to our *actions* using the *helper* `factoryActions`. Easy right?

#### Create a new *Action*
Build your own *actions* is quite easy, like *intents* is just create a *stateless* function. Actions functions only receive one parameter:
  - `state`: the actual *object* state.

successful functions have two ways for communicate the action:
  - `return` method for *sync* functions
  - `resolve` *Promise* method  for *async* functions

So the easiest and basic example could be:

```js
export default (state) => {
  state.action = { value: 'Hello world!' };
  return (state);
}
```

As you can see we just create the attribute `action` and return the state to Ava. But life sometimes is more difficult, so now we will create an *async* Action which will request *something* to a external data source:

```js
import { entities } from 'ava-ia/lib/helpers'

export default (state) => {

  return new Promise( async (resolve, reject) => {
    response = await externalDataSource( {tokens: state.tokens} );

    state.action = {
      engine: 'mock',
      type: entities.knowledge,
      value: response.value
    };

    resolve(state);
  });
}
```

In this example we use `resolve` method 'cause we are inside a *Promise*, as you see still being easy create any kind of *actions*.


## Mastering in Ava
If you wanna learn more about Ava *internals* please take a look to our [wiki](https://github.com/ava-ia/core/wiki). Feel free to offer new features, improvements or anything you can think of. This project makes sense with your participation and experience using Ava.

## Support

### Funding

This software is provided to you as open source, free of charge. The time and effort to develop and maintain this project is dedicated by @soyjavi. If you (or your employer) benefit from this project, please consider a financial contribution. Your contribution helps continue the efforts that produce this and other open source software.

Funds are accepted via [PayPal](https://paypal.me/soyjavi), any amount is appreciated.

## License

Copyright (c) 2016 Javier Jimenez Villar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
