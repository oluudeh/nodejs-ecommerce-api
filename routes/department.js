const dept = require('../controllers/department')

module.exports = (router) => {
    router.get('/departments', dept.getDepartments)
    router.get('/departments/:department_id', dept.getDepartment)
}