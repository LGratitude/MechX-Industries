const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/submit_quote', (req, res) => {
  const { name, email, cellNumber, company, category, message } = req.body;

  // Validate form data (optional)

  // Create a transporter using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lg.hlatshwayo@gmail.com', // Your Gmail address
      pass: 'welcome1' // Your Gmail password or App password
    }
  });

  // Setup email data
  let mailOptions = {
    from: '', // Sender address
    to: 'lg.hlatshwayo@gmail.com', // List of recipients
    subject: 'Quote Request', // Subject line
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Cell Number:</strong> ${cellNumber}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
