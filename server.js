const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HAfK5ADrPvZgTNOkXWqWu8tNOGxerM2SkHKft09Ot8x6jDh8RxuYvbquT8HYIkLAAC7drTSRKwCZc4OytzSuG3c00uASLLxQw');

const app = express();
app.use(expressLogger);
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}



app.get('/api/hello', (req, res) => {
  res.status(200).send({ success: "Hello" });
});

app.post('/api/payment', (req, res) => {
  const body = {
    source: 'tok_visa',
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      logger.error('erorr occured'+stripeErr);
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

//https://training-app-a2z.herokuapp.com/
//a2ztechacademy
//a2ztechacademy2000

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});