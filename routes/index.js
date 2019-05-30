const express = require('express')
const router = express.Router()

const deptRoutes = require('../routes/department')
const productRoutes = require('../routes/product')
const categoryRoutes = require('../routes/category')
const customerRoutes = require('../routes/customer')
const attributeRoutes = require('../routes/attribute')

deptRoutes(router)
productRoutes(router)
categoryRoutes(router)
customerRoutes(router)
attributeRoutes(router)

module.exports = router