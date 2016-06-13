# <a href='https://github.com/ava-ia/core'><img src='https://dl.dropboxusercontent.com/s/pdoawhkvg295ish/ava.png?dl=0' height='128'></a>

[![npm version](https://img.shields.io/npm/v/ava-ia.svg?style=flat-square)](https://www.npmjs.com/package/ava-ia) [![Build Status](http://img.shields.io/travis/ava-ia/core/master.svg?style=flat-square)](https://travis-ci.org/ava-ia/core) [![NPM Status](http://img.shields.io/npm/dm/ava-ia.svg?style=flat-square)](https://www.npmjs.org/package/ava-ia) [![devDependency Status](https://img.shields.io/david/ava-ia/core.svg?style=flat-square)](https://david-dm.org/ava-ia/core#info=dependencies) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/soyjavi)
[![npm](https://img.shields.io/npm/l/botkit.svg?style=flat-square)](https://spdx.org/licenses/MIT)

The main purpose of AVA (Agnostic Virtual Assistant) is create a clever/fast assistant for any kind of context. This repository concerns the *core* of AVA so feel free for try in your NodeJS projects.

Nowadays we can find a lot of assistants, and more and more in coming years, all of us know that Apps in future will be more *conversational* and less *click/action*. For that reason our approach is create an agnostic and reusable system for help developers to create any kind of virtual assistants.

This is an Open Source project, so any help will be well coming.


## Installation

AVA can be installed as an [npm package](https://www.npmjs.org/package/ava-ia):

```bash
$ npm install --save ava-ia
```


## A little story about language processing...

If you never works with assistants/bots you have to know that we need to analyze a given input and give it a semantic value. To do this often use NLP, *Natural Language Processing*. AVA in its case incorporates its own NLP but as you will see later can use either. For example:

> "I need an appointment with the dentist tomorrow at 2pm in London"

AVA must understand your sentence and creates a *sentence relations scenario* like:
  + **SUBJECT** `I`
  + **VERB** `need`
  + **QUANTITY** `1`
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


## Basic usage

```js
import Ava from `ava-ia`;
import { weather, movie } from `ava-ia/intents`;
import { forecastYahoo, forecastMSN, movieDB } from `ava-ia/actions`;

// 1. New instance
const ava = new Ava();

// 2. Configure the intents
ava
  .intent(weather, [forecastYahoo, forecastMSN])
  .intent(movie, movieDB);

// 3. Chat with Ava
ava.listen('Do you know if tomorrow will rain in Bangkok?')
  .then(state => console.log(state))
  .catch(error => console.log(state))
```


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
