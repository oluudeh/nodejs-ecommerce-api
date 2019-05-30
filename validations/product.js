const validator = require('validator')
const { paging, product } = require('../helpers/error_codes')
const helper = require('../helpers/validators')


const ProductValidator = {

    validateFilter (params) {

        if (params.page && !validator.isInt(params.page)) {
            return helper.error({
                ...paging.page_not_number,
                field: 'page'
            })
        }

        if (params.limit && !validator.isInt(params.limit)) {
            return helper.error({
                ...paging.limit_not_number,
                field: 'limit'
            })
        }

        if (params.description_length && !validator.isInt(params.description_length)) {
            return helper.error({
                ...paging.limit_not_number,
                field: 'description_length'
            })
        }

        return helper.success()
    },

    validateSearch (params) {

        if (!params.query_string || validator.isEmpty(params.query_string)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Search Query'),
                field: 'query_string'
            })
        }

        if (params.all_words && ['on', 'off'].indexOf(params.all_words) == -1) {
            return helper.error({
                ...product.all_words,
                field: 'all_words'
            })
        }

        if (params.page && !validator.isInt(params.page)) {
            return helper.error({
                ...paging.page_not_number,
                field: 'page'
            })
        }

        if (params.limit && !validator.isInt(params.limit)) {
            return helper.error({
                ...paging.limit_not_number,
                field: 'limit'
            })
        }

        if (params.description_length && !validator.isInt(params.description_length)) {
            return helper.error({
                ...paging.limit_not_number,
                field: 'description_length'
            })
        }

        return helper.success()
    },

    validateReview (data) {

        if (!data.review || validator.isEmpty(data.review)) {
            return helper.error({
                code: product.code,
                message: product.message('Review'),
                field: 'review'
            })
        }

        if (!data.rating || validator.isEmpty(data.rating)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Rating'),
                field: 'rating'
            })
        }

        if (!validator.isInt(data.rating)) { 
            return helper.error({
                code: product.field_not_number.code,
                message: product.field_not_number.message('Rating'),
                field: 'rating'
            })
        }

        return helper.success()
    }

}

module.exports = ProductValidator