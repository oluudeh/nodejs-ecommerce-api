const db = require('../models')

/**
 * handles shipping API requests
 */
const ShippingController = {

    /**
     * Fetches a list of shipping regions 
     * @param {*} req 
     * @param {*} res 
     */
    async getRegions (req, res) {
        try {
            const regions = await db.sequelize.query("CALL customer_get_shipping_regions()")

            return res.send(regions)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches a list of shippings based on a specific shipping region
     * @param {*} req 
     * @param {*} res 
     */
    async getShippings (req, res) {
        try {
            const shippings = await db.sequelize.query(
                "CALL orders_get_shipping_info ( :inShippingRegionId )",
                {
                    replacements: { inShippingRegionId: req.params.shipping_region_id }
                } 
            )

            return res.send(shippings)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}

module.exports = ShippingController