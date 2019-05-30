const express = require('express')
const router = express.Router()

const deptRoutes = require('../routes/department')
const customerRoutes = require('../routes/customer')

deptRoutes(router)
customerRoutes(router)

module.exports = router