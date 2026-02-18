const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

class EmailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  init() {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      }
    });
  }

  async sendContactNotification(contact) {
    const mailOptions = {
      from: emailConfig.from,
      to: emailConfig.to,
      subject: `Nueva consulta de: ${contact.name}`,
      html: `
        <h2>Nueva consulta recibida</h2>
        <p><strong>Nombre:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        ${contact.phone ? `<p><strong>Teléfono:</strong> ${contact.phone}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${contact.message}</p>
        <hr>
        <p><small>Enviado el ${new Date(contact.createdAt).toLocaleString('es-AR')}</small></p>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendConfirmationEmail(contact) {
    const mailOptions = {
      from: emailConfig.from,
      to: contact.email,
      subject: 'Confirmación de consulta - Estudio Contable JY',
      html: `
        <h2>Gracias por contactarnos, ${contact.name}</h2>
        <p>Hemos recibido tu consulta y te responderemos a la brevedad.</p>
        <p><strong>Tu mensaje:</strong></p>
        <p>${contact.message}</p>
        <hr>
        <p>Estudio Contable JY</p>
        <p>
          <a href="https://wa.me/+5491121729306">WhatsApp</a> | 
          <a href="https://www.facebook.com/contable.jy">Facebook</a>
        </p>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();
