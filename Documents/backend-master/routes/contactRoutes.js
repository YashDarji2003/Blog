const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error('Email server not ready:', error);
  } else {
    console.log('Email server is ready to take messages');
  }
}); // Nodemailer transporter setup using config values


const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many contact form submissions from this IP, please try again after 15 minutes',
});

router.post(
  '/',
  contactLimiter,
  [
    // Validation and sanitization middleware
    check('name').trim().notEmpty().withMessage('Name is required').escape(),
    check('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    check('phone').optional().trim().escape(),
    check('topic').optional().trim().escape(),
    check('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 1000 }).withMessage('Message can be at most 1000 characters long').escape(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, topic, message } = req.body;

      const newContact = new Contact({
        name,
        email,
        phone,
        topic,
        message
      });

      await newContact.save();

      // Send confirmation email to the user
      const mailOptions = {
        from: config.emailUser, // Use emailUser from config
        to: email,
        subject: 'Contact Form Submission Confirmation',
        text: `Thank you for contacting us, ${name}!\n\nWe have received your message and will get back to you shortly.\n\nYour message details:\nTopic: ${topic || 'N/A'}\nMessage: ${message}\n\nBest regards,\nThe Contact Us Team`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending confirmation email:', error);
        } else {
          console.log('Confirmation email sent:', info.response);
        }
      });

      res.status(201).json({ message: 'Contact form submitted successfully!', contact: newContact });

    } catch (error) {
      console.error('Error saving contact form:', error);
      res.status(500).json({ message: 'Failed to submit contact form.', error: error.message });
    }
  }
);


router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Failed to retrieve contact messages.', error: error.message });
  }
});

module.exports = router; 