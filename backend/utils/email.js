const nodemailer = require('nodemailer');

const transPort = nodemailer.createTransport({
    pool : true,
    maxConnections : 1,
    service: 'naver',
    host: 'smtp.naver.com',
    port: 465,
    secure: false,
    requireTLS : true,
    auth: {
        user: 'kyungheeyj45@naver.com',
        pass: 'Qwer05130513@'
    },
    tls : {
        rejectUnauthorized : false
    }
});

module.exports = {
    transPort
  };