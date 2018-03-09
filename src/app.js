const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const API_TODAY = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const API_YESTERDAY  = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

app.use(bodyParser.json());

let TODAY = {};
let YESTERDAY = {};

fetch(API_TODAY)
  .then(res => res.json())
  .then(json => TODAY = json);


fetch(API_YESTERDAY)
  .then(res => res.json())
  .then(json => YESTERDAY = json);


app.get('/today', (req, res) => {
  let priceToday = TODAY.bpi.USD.rate;
  res.json(priceToday);
});

app.get('/yesterday', (req, res) => {
  let priceYesterday = YESTERDAY.bpi[Object.keys(YESTERDAY.bpi)[0]];
  res.json(priceYesterday);
});

app.get('/diff', (req, res) => {
  let diff = Number(TODAY.bpi.USD.rate.replace(/\,/g, '')) - YESTERDAY.bpi[Object.keys(YESTERDAY.bpi)[0]];
  console.log(diff);
  res.json(diff)
});



app.listen(PORT, err => {
  if (err) {
    console.log(`Error`);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
