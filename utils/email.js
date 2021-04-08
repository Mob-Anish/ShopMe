// const nodemailer = require('nodemailer'); // medium/package for sending mail

// const sendEmail = async (options) => {
//   // 1) Create a transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     // Activate in your gmail "less secure app" option for gmail service
//   });

//   // 2) Define the email options
//   const emailOptions = {
//     from: `ShopMe <${options.mailFrom}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     //html:
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(emailOptions);
// };

// module.exports = sendEmail;
 