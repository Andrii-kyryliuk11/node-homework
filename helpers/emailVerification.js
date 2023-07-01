const nodemailer = require("nodemailer");

const { VERIFY_EMAIL_PASS, VERIFY_EMAIL_LOGIN } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: VERIFY_EMAIL_LOGIN,
    pass: VERIFY_EMAIL_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const createEmail = (deliveryAdress, verificationToken) => {
  const email = {
    from: "andriikyryliuk@ukr.net",
    to: deliveryAdress,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click to verify</a>`,
  };
  transport
    .sendMail(email)
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
};

module.exports = createEmail;
