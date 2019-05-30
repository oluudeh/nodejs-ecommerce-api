const validator = require('validator')
const codes = require('../helpers/error_codes').paging
const helper = require('../helpers/validators')


const CategoryValidator = {

    validateFilter (params) {

        if (params.order && ['category_id', 'name'].indexOf(params.order) == -1) {
            return helper.error({
                ...codes.order_not_allowed,
                field: 'order'
            })
        }

        if (params.page && !validator.isInt(params.page)) {
            return helper.error({
                ...codes.page_not_number,
                field: 'page'
            })
        }

        if (params.limit && !validator.isInt(params.limit)) {
            return helper.error({
                ...codes.limit_not_number,
                field: 'limit'
            })
        }

        return helper.success()
    }

}

module.exports = CategoryValidator