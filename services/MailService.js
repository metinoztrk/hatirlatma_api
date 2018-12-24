const nodemailer = require("nodemailer");
const ErrorMessage=require('../error/ErrorMessage');
const MailService = {};

MailService.sendMail = (userInstance) => {
  return new Promise((resolve, reject) => {
    let user = 'qheredeneme@gmail.com';
    let pass = 'MetYi2018';
    let to = userInstance.email;
    let subject = "Hatırlatma";

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass
      }
    });

    let mailOptions = {
      from: user,
      to: to,
      subject: subject,
      html: userInstance.message
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return reject(ErrorMessage.MailFailed());
      } else {
        return resolve(info);
      }
    });
  });
};

module.exports = MailService;