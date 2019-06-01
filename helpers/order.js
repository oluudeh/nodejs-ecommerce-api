const mailer = require('./mailer')
const db = require('../models')
const Customer = db.sequelize.models.Customer
const Order = db.sequelize.models.Order

const orderMails = {
    new_order: `
        <html>
            <head>
                <title>New Order</title>
            </head>
            <body>
                <p><b>Hi There</b></p>
                <br/>
                <p>This is to confirm that we have received your order</p>
                <br/>
                <p>Best wishes</p>
                <p>Turing Test</p>
            </body>
        </html>
    ` ,
    payment_received: `
        <html>
            <head>
                <title>Payment Received</title>
            </head>
            <body>
                <p><b>Hi There</b></p>
                <br/>
                <p>This is to confirm that we have received your payment.</p>
                <p>Thank you for your patronage.</p>
                <br/>
                <p>Best wishes</p>
                <p>Turing Test</p>
            </body>
        </html>
        `
}

const subjects = {
    new_order: 'New Order',
    payment_received: 'Payment Received'
}

/**
 * Order Helper
 */
const OrderHelper = {
    updateOrderStatus (order_id, status) {
        Order.update({ status: status }, {
            where: { order_id: order_id }
        })
    },

    sendMail (email, mail_type) {
        mailer.sendMail(email, subjects[mail_type], orderMails[mail_type])
    },

    createAudit (order_id, message) {

    }
}

module.exports = OrderHelper