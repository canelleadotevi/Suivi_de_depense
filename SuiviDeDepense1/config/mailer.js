const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "canelleadole@gmail.com",
      pass: "ypewfbccwjnnoaog"
    }
});
module.exports = mailer

/*MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=canelleadole@gmail.com
MAIL_PASSWORD=ypewfbccwjnnoaog
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="canelleadole@gmail.com"
MAIL_FROM_NAME="${APP_NAME}" */