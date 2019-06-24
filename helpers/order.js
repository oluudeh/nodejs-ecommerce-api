const mailer = require('./mailer')
const db = require('../models')
const Customer = db.sequelize.models.Customer
const Order = db.sequelize.models.Order
const OrderDetail = db.sequelize.models.OrderDetail

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
                <p>The details of your order are as follows</p>
                <p>Order ID: [ORDER_ID]</p>
                <p>Total Amount: [TOTAL_AMOUNT]</p>
                <div>[ORDER_DETAILS]</div>
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

    async sendOrderMail (email, orderId) {
        console.log('orderId ', orderId)
        let html = orderMails['new_order']
        html = html.replace('[ORDER_ID]', orderId.orderId)
        let table = `<table>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
            </tr>`
        let total = 0.0
        const details = await OrderDetail.findAll({
            where: { order_id: orderId.orderId }
        })
        details.forEach(order => {
            total += (order.quantity * order.unit_cost)
            table += `<tr>
                        <td>${order.product_name}</td>
                        <td>${order.quantity}</td>
                        <td>${order.unit_cost}</td>
                        <td>${order.quantity * order.unit_cost}</td>
                    </tr>`
        })
        table += '</table>'

        html = html.replace('[ORDER_DETAILS]', table)
        html = html.replace('[TOTAL_AMOUNT]', total.toFixed(2))
        console.log('MAIL  ', html)
        mailer.sendMail(email, subjects['new_order'], html)
    },

    createAudit (order_id, message) {

    }
}

module.exports = OrderHelper