const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shaguftak9771@gmail.com',       // ⛔ Change this to your Gmail
    pass: 'rgjqystjvbklbduf',          // ⛔ Paste App Password here
  },
});

app.post('/api/visitor', async (req, res) => {
  const { name, email, host } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: 'shaguftak9771@gmail.com',       // same Gmail as above
    to: `${email}`,
    subject: 'Visitor Verification Code',
    text: `Hello ${name},\n\nYour visit has been submitted. Your verification code is: ${code}\n\nRegards,\nSecurity Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Email failed');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
