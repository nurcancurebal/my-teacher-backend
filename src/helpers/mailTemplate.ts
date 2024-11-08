export const forgotPasswordMailTemplate = function (details: { otp: string }) {
  const content = `Hey! <br/>
  Şifrenizi kaybettiğinizi duyduk. Peki, lütfen şifrenizi sıfırlamak için OTP olarak ${details.otp}' i kullanın. OTP 10 dakika geçerli olacaktır.`;
  return mailTemplate(content, "Forgot Password");
};

export const passwordResetConfirmation = function () {
  const content =
    "Hi! This is to confirm that your password has been reset successfully. In case it wasn't you, contact our customer support immediately!";
  return mailTemplate(content, "Password Reset Confirmation!");
};

export const mailTemplate = function (content: string, title: string) {
  return `<html>
              <head>
                  <title>${title}</title>
              </head>
              <body>${content}</body>
          </html>`;
};
