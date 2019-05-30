const db = require('../models')

const ShippingController = {

    async getRegions (req, res) {
        try {
            const regions = await db.sequelize.query("CALL customer_get_shipping_regions()")

            return res.send(regions)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

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