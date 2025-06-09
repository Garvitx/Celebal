import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendPasswordResetEmail = ({ to, token, frontendUrl }) => {
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
  const html = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: 'Password Reset',
    html,
  };

  // callback-based
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending reset email:', err);
      throw err;
    }
    console.log('Reset email sent:', info.response);
  });
};
