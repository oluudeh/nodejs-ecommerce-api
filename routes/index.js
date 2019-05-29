const express = require('express')
const router = express.Router()

//const DepartmentController = require('../controllers/department')


const deptRoutes = require('../routes/department')

deptRoutes(router)
//router.get('/departments', DepartmentController.getDepartments)


module.exports = router