import fetch from 'node-fetch';
import { entities, syntax, trace } from '../helpers';

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
const SYNTAXES = ['[value] [currency] [preposition]? [currency]'];
const URL = 'http://api.fixer.io/latest';
const getCurrency = value => NAMES[value.toLowerCase()] || value.toUpperCase();

export default async(state) => {
  let action;
  const match = syntax(state.sentence, SYNTAXES);
  if (!match) return action;
  // if (!match) throw new Error('Action error');

  const base = getCurrency(match.currency[0]);
  const symbol = getCurrency(match.currency[1]);
  const value = parseFloat(match.value);

  const response = await fetch(`${URL}?base=${base}&symbols=${symbol}`).catch(() => state);
  const json = await response.json();

  if (json && json.rates && Object.keys(json.rates).length > 0) {
    trace('ActionCurrency', { match }, state);
    const conversion = value * json.rates[symbol];
    action = {
      engine: 'fixer.io',
      title: `${value} ${base} are ${conversion.toFixed(3)} ${symbol}`,
      value: conversion,
      entity: entities.number,
    };
  }

  return action;
};
