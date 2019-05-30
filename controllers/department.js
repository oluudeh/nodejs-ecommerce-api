const db = require('../models')
const Department = db.sequelize.models.Department

const DepartmentController = {

    async getDepartments(req, res) {
        try {
            const page = req.query.page || 1
            const itemsPerPage = req.headers.itemsPerPage || 10
            const offset = (page * itemsPerPage) - itemsPerPage
            const depts = await Department.findAll({ offset: offset, limit: itemsPerPage })
            return res.status(200).send(depts)
        } catch(e) {
            console.log('getDepartments ', e)
            return res.status(400).send(e)
        }
    },

    async getDepartment(req, res) {
        try {
            const dept = await Department.findOne({
                where: { department_id: req.params.department_id }
            })
            return res.send(dept)
        } catch(e) {
            console.log('getDepartments ', e)
            return res.status(400).send(e)
        }
    }

}

module.exports = DepartmentController