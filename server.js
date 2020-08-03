const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const pino = require('pino');
const expressPino = require('express-pino-logger');
//const nodemailer = require('nodemailer'); 
//import transporter JS file
const mail = require('./mails');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   
    user:'a2ztechacademy@gmail.com',
    pass:'A2ztechacademy2000'
  }
});



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
    source: process.env.NODE_ENV === 'production'?'tok_visa':req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
     // logger.error('erorr occured'+stripeErr);
      res.status(500).send({ error: stripeErr });
    } else {
      sendEmail(req.body.schedules,req.body.amount);
      res.status(200).send({ success: stripeRes });
    }
  });
});

function sendMailGmail(){

}
function sendEmail(schedules,amount){
  var html='Dear Student,<BR/><B>You did a schedule booking as follow</B>'
  var email='';
 html+='<Table><tr><th>Course</th><th>Date</th><th>From</th><th>To</th><th>Price(USD)</th></tr>'
  schedules.forEach(function(sc){
    html+='<tr><td>'+sc.course+'</td><td>'+sc.date+'</td><td>'+sc.fromTime+'</td><td>'+sc.toTime+'</td><td>'+sc.price+'</td></tr>';
    email=sc.email;
  });
  html+='</table>'
  html+='<br/><B>Total is:'+amount/100+' USD</B>'
  html+='<br/>Thank You.<br/>A2ZAcademy Team'

  let mailOptions = {
    from: "a2ztechacademy@gmail.com",
    to: email,
    subject: "Your schedule confirmed with A2ZAcademy",
    text: "Hello",
    html: html
}

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    logger.error(error);
  } 
});
}
//https://training-app-a2z.herokuapp.com/
//a2ztechacademy
//a2ztechacademy2000

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});