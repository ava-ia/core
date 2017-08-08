import fetch from 'node-fetch';
import { entities, syntax, trace } from '../helpers';
// -- Internal
const NAMES = {
  lev: 'BGN',
  real: 'BRL',
  franc: 'CHF',
  yuan: 'CNY',
  koruna: 'CZK',
  krone: 'DKK',
  pound: 'GBP',
  euro: 'EUR',
  kuna: 'HRK',
  forint: 'HUF',
  rupiah: 'IDR',
  shekel: 'ILS',
  rupee: 'INR',
  yen: 'JPY',
  won: 'KRW',
  peso: 'MXN',
  ringgit: 'MYR',
  crone: 'NOK',
  zloti: 'PLN',
  leu: 'RON',
  ruble: 'RUB',
  baht: 'THB',
  lira: 'TRY',
  dollar: 'USD',
  rand: 'ZAR',
};
const getCurrency = value => NAMES[value.toLowerCase()] || value.toUpperCase();

export default (state) => {
  const ms = new Date();

  return new Promise((resolve, reject) => {
    const match = syntax(state.sentence, '[value] [currency] [preposition]? [currency]');
    if (!match) return reject();

    const from = getCurrency(match.currency[0]);
    const to = getCurrency(match.currency[1]);
    const value = parseFloat(match.value);

    trace('ActionCurrency', { match }, state);

    return fetch(`http://api.fixer.io/latest?base=${from}&symbols=${to}`)
      .then(response => response.json())
      .then((json) => {
        if (json && json.rates && Object.keys(json.rates).length > 0) {
          const conversion = value * json.rates[to];
          state.action = {
            ms: (new Date() - ms),
            engine: 'fixer.io',
            title: `${value} ${from} are ${conversion.toFixed(3)} ${to}`,
            value: conversion,
            entity: entities.object,
          };
        }
        resolve(state);
      })
      .catch(reject);
  });
};
