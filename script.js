// JavaScript for hiding and showing the navigation bar on swipe
let lastScrollTop = 0;
const navbar = document.querySelector('header'); // Adjusted selector if 'header' is the correct element

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // User is scrolling down, hide the navbar
        navbar.style.top = '-100px';
    } else {
        // User is scrolling up, show the navbar
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// Express.js server setup for handling contact form submission with SendGrid
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = process.env.PORT || 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'your-receiving-email@example.com',
    from: 'your-verified-sender@example.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
