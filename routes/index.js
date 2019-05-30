const express = require('express')
const router = express.Router()

const taxRoutes = require('./tax')
const deptRoutes = require('./department')
const orderRoutes = require('./order')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const customerRoutes = require('./customer')
const shippingRoutes = require('./shipping')
const attributeRoutes = require('./attribute')

taxRoutes(router)
deptRoutes(router)
orderRoutes(router)
productRoutes(router)
categoryRoutes(router)
customerRoutes(router)
shippingRoutes(router)
attributeRoutes(router)

module.exports = router