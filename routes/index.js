const express = require('express')
const router = express.Router()

const deptRoutes = require('../routes/department')
const categoryRoutes = require('../routes/category')
const customerRoutes = require('../routes/customer')

deptRoutes(router)
categoryRoutes(router)
customerRoutes(router)

module.exports = router