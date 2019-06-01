const express = require('express')
const router = express.Router()

const taxRoutes = require('./tax')
const orderRoutes = require('./order')
const stripeRoutes = require('./stripe')
const deptRoutes = require('./department')
const productRoutes = require('./product')
const cartRoutes = require('./shoppingcart')
const categoryRoutes = require('./category')
const customerRoutes = require('./customer')
const shippingRoutes = require('./shipping')
const attributeRoutes = require('./attribute')

taxRoutes(router)
cartRoutes(router)
deptRoutes(router)
orderRoutes(router)
stripeRoutes(router)
productRoutes(router)
categoryRoutes(router)
customerRoutes(router)
shippingRoutes(router)
attributeRoutes(router)

router.get('/', (req, res) => {
    return res.send({message: 'Welcome to Turing Test API'})
} )

module.exports = router