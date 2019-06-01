const mailer = require('nodemailer')
require('dotenv').config()

const transport = mailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_PORT == 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

/**
 * Mailer Helper
 */
const Mailer = {

    sendMail (email, subject, message) {
        transport.sendMail({
            from: `"Turing Test" <${process.env.MAIL_USER}>`,
            to: email,
            subject: subject,
            html: message
        }).then(info => {
            console.log('Email sent: ', info.messageId)
        }).catch(err => {
            console.log('Could not send mail ', err)
        })
    }
}

module.exports = Mailer