var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',//smtp.gmail.com  //in place of service use host...
  secure: false,//true
  port: 25,//465
  auth: {
    user: 'a2ztechacademy@gmail.com',
    pass: 'A2ztechacademy2000'
  }, tls: {
    rejectUnauthorized: false
  }
});

transporter.sendEMail = function (mailRequest) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailRequest, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve("The message was sent!");
      }
    });
  });
}

module.exports = transporter;