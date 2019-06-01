const dept = require('../controllers/department')
const cache = require('apicache').middleware

module.exports = (router) => {
    router.get('/departments', cache('1 hour'), dept.getDepartments)
    router.get('/departments/:department_id', cache('1 hour'), dept.getDepartment)
}