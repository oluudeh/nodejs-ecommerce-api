const db = require('../models')
const Tax = db.sequelize.models.Tax

const TaxController = {
    async getTaxes (req, res) {
        try {
            const taxes = await Tax.findAll()
            return res.send(taxes)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async getTax (req, res) {
        try {
            const tax = await Tax.findOne({
                where: { tax_id: req.params.tax_id }
            })
            return res.send(tax)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}

module.exports = TaxController