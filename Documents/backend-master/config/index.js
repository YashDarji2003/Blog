require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI,
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
}; 