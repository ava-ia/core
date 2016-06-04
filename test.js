"use strict";

import compose from 'modules/compose';
import composeAsync from 'modules/composeAsync';
// -- Intents & Actions
import {IntentWeather} from 'intents'
import {ActionForecastYahoo, ActionForecastMSN} from 'actions'

// -- Composer Sync ------------------------------------------------------------
const init = (state = {}) => {
  state.intents = [];
  return state;
}

const yahoo = (state) => {
  state.intents.push('yahoo');
  return state;
}

const msn = (state) => {
  state.intents.push('msn');
  return state;
}

const yahooAsync = (state) => {
  return new Promise((resolve, reject) => {
    setTimeout((_ => {
      state.intents.push('yahooAsync');
      resolve(state);
    }), 300)
  })
}

const msnAsync = (state) => {
  return new Promise((resolve, reject) => {
    setTimeout((_ => {
      state.intents.push('msnAsync');
      resolve(state);
    }), 300)
  })
}

const superfn = compose(init, yahoo, msn);
console.log( superfn({ hello: 'world' }));

const superfnAsync = composeAsync(init, yahoo, yahooAsync, msn, msnAsync);
superfnAsync({ hola: 'mundo' }).then(state => console.log(state))


// (() => {
//   console.log('aaaa')
// })()
// console.log(await superfnAsync({ hola: 'mundo' }))



// // -- Composite functions ---------------------------------------------------
// function Greeter (name) {
//   this.name = name || 'John Doe';
// }
//
// Greeter.prototype.hello = function hello () {
//   return 'Hello, my name is ' + this.name;
// }
//
// var george = new Greeter('George');
// // console.log(george.hello());
//
// // -- Composer
// const barker = (state) => ({
//   bark: () => console.log('Woof, I am ' + state.name)
// })
// const driver = (state) => ({
//   drive: () => state.position = state.position + state.speed
// })
//
// const murderRobotDog = (name)  => {
//   let state = {
//     name,
//     speed: 100,
//     position: 0
//   }
//   return Object.assign(
//         {},
//         barker(state),
//         driver(state),
//     )
// }
