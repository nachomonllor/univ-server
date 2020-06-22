import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

// create reusable smtpTransport object using the default SMTP transport
let smtpTransport = nodemailer.createTransport({
    host: 'main.verdantsolution.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'dev@verdantsolution.com', // generated ethereal user
        pass: 'Development2019' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

var handlebarsOptions = {
    viewEngine: {
        extName: '.html',
        partialsDir: './server/templates/',
        layoutsDir: './server/templates/',
        defaultLayout: 'reset-password-email.html',
    },
    viewPath: path.resolve('./server/templates/'),
    extName: '.html'
  };

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;