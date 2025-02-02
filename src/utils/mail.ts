import nodemailer, { SendMailOptions } from "nodemailer";

import config from "../config";

export default { sendOTP, sendMail };

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: parseInt(config.smtp.port),
  secure: true,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function sendOTP(email: string, otp: string) {
  return sendMail({
    to: email,
    html: forgotPasswordMailTemplate({ otp }),
    subject: "OTP Verification",
  });
}

function sendMail(details: {
  to: string;
  subject: string;
  html: string;
  attachments?: SendMailOptions["attachments"];
  cc?: string | string[];
  bcc?: string | string[];
  from?: string;
}): Promise<boolean> {
  const mailOptions: SendMailOptions = {
    to: details.to,
    subject: details.subject,
    html: details.html,
    attachments: details.attachments || [],
    cc: details.cc || undefined,
    bcc: details.bcc || undefined,
    from: details.from || config.smtp.user,
  };

  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function forgotPasswordMailTemplate(details: { otp: string }) {
  const content = `Hey! <br/>
  Şifrenizi kaybettiğinizi duyduk. Peki, lütfen şifrenizi sıfırlamak için OTP olarak ${details.otp}' i kullanın. OTP 10 dakika geçerli olacaktır.`;
  return mailTemplate(content, "Forgot Password");
}

function mailTemplate(content: string, title: string) {
  return `<html>
              <head>
                  <title>${title}</title>
              </head>
              <body>${content}</body>
          </html>`;
}
