const db = require('../models')
const Attribute = db.sequelize.models.Attribute

/**
 * Handles attributes API requests
 */
const AttributeController = {

    /**
     * Fetches list of attributes 
     * @param {*} req 
     * @param {*} res 
     */
    async getAttributes(req, res) {

        try {
            const attributes = await Attribute.findAll()
            return res.status(200).send(attributes)
        } catch(e) {
            console.log('getAttributes ', e)
            return res.status(400).send(e)
        }
    },

    /**
     * Fetches a specific attribute
     * @param {*} req 
     * @param {*} res 
     */
    async getAttribute(req, res) {
        try {
            const attribute = await Attribute.findOne({
                where: { attribute_id: req.params.attribute_id }
            })
            return res.send(attribute)
        } catch(e) {
            console.log('getAttributes ', e)
            return res.status(400).send(e)
        }
    },

    /**
     * Fetches a list of attributes attached to a specific product
     * @param {*} req 
     * @param {*} res 
     */
    async getInProductAttributes (req, res) {
        try {
            const attributes = await db.sequelize.query(
                "CALL catalog_get_product_attributes (:inProductId)", 
                {
                    replacements: { inProductId: req.params.product_id }
                })
            return res.send(attributes)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches attribute values 
     * @param {*} req 
     * @param {*} res 
     */
    async getAttributeValues (req, res) {
        try {
            const attributes = await db.sequelize.query(
                "CALL catalog_get_attribute_values (:inAttributeId)", 
                {
                    replacements: { inAttributeId: req.params.attribute_id }
                })
            return res.send(attributes)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }

}

module.exports = AttributeController