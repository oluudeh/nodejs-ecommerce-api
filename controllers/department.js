const db = require('../models')
const Department = db.sequelize.models.Department

/**
 * Handles departments API requests
 */
const DepartmentController = {

    /**
     * Fetches list of departments
     * @param {*} req 
     * @param {*} res 
     */
    async getDepartments(req, res) {
        try {
            const depts = await Department.findAll()
            return res.status(200).send(depts)
        } catch(e) {
            console.log('getDepartments ', e)
            return res.status(400).send(e)
        }
    },


    /**
     * Fetches details of a specific department
     * @param {*} req 
     * @param {*} res 
     */
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