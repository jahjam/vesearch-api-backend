const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const Template = require('../views/email/emailTemplates');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.username = user.username;
    this.url = url;
    this.from = `VESearch <${process.env.EMAIL}>`;
  }

  transporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      logger: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = new Template(template, {
      username: this.username,
      url: this.url,
      subject,
    }).render();

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    await this.transporter().sendMail(mailOptions);
  }

  async sendPasswordResetLink() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendWelcome() {
    await this.send('welcomeMessage', 'Welcome, from the VESearch Team!');
  }

  async sendGoodbye() {
    await this.send(
      'deletionMessage',
      "We're very sorry to see you're leaving us!"
    );
  }
};
