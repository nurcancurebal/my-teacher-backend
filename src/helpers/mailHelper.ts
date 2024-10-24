import nodemailer, { SendMailOptions } from "nodemailer";
import { emailConfig } from "../config/config";
import { forgotPasswordMailTemplate } from "./mailTemplate";

const transporter = nodemailer.createTransport({
  service: emailConfig.emailService,
  auth: {
    user: emailConfig.emailUser,
    pass: emailConfig.emailPassword,
  },
});

export const sendOTP = (email: string, otp: string) => {
  return sendMail({
    to: email,
    html: forgotPasswordMailTemplate({ otp }),
    subject: "OTP Verification",
  });
};

export const sendMail = function (details: {
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
    from: details.from || emailConfig.emailFrom,
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
};
