"use strict";

var weather = require('weather-js');

// -- Intents & Actions
import {IntentWeather} from 'intents'
import {ActionForecastYahoo} from 'actions'


// -- Classic ES5 --------------------------------------------------------------
function Greeter (name) {
  this.name = name || 'John Doe';
}

Greeter.prototype.hello = function hello () {
  return 'Hello, my name is ' + this.name;
}

var george = new Greeter('George');
// console.log(george.hello());

// -- Composer
const barker = (state) => ({
  bark: () => console.log('Woof, I am ' + state.name)
})
const driver = (state) => ({
  drive: () => state.position = state.position + state.speed
})

const murderRobotDog = (name)  => {
  let state = {
    name,
    speed: 100,
    position: 0
  }
  return Object.assign(
        {},
        barker(state),
        driver(state),
    )
}

const bruno =  murderRobotDog('bruno')
// bruno.bark() // "Woof, I am Bruno"

const b = new barker({name: 'j'});
// console.log(barker.bark, b.bark, bruno)


// -- Classic ES5 --------------------------------------------------------------
// const listen = (state) => ({
//   listen: () => {
//     console.log('listening');
//   }
// })


import AVA from 'modules/ava'

const ava = new AVA({name: 'Javi'});

ava
  .intent(IntentWeather, [ActionForecastYahoo])
  .intent();

ava
  .listen('hola')
  .then(message => console.log(message));


// const dog = () => {
//   const sound = 'woof';
//
//   const talk = function() {
//     console.log(sound)
//     return this;
//   };
//
//   return {
//     talk: talk
//   }
// }
// const sniffles = dog()
// sniffles.talk().talk() // Outputs: "woof"

// let city = 'Bangkok';
// const ms = new Date()
// weather.find({search: city, degreeType: 'C'}, (error, response) => {
//   if (error) console.log(error);
//   console.log('ms', (new Date() - ms));
//   // console.log(response[0].location);
//   console.log(response[0].current);
//   // console.log(response[0].forecast);
// });
