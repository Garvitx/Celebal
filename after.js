import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Promisify sendMail for direct await usage
export const sendPasswordResetEmail = async ({ to, token, frontendUrl }) => {
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
  const html = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: 'Password Reset',
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Reset email sent:', info.response);
    return info;
  } catch (err) {
    console.error('❌ Error sending reset email:', err);
    // bubble up so caller can handle/report
    throw err;
  }
};
