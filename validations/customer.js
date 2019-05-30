const validator = require('validator')
const codes = require('../helpers/error_codes').user
const db = require('../models')
const Customer = db.sequelize.models.Customer


const __error = (data) => {
    return {
        isValid: false,
        error: {
            status: 400,
            ...data
        }
    }
}

const __success = () => {
    return { isValid: true, error: null }
}

const __empty = (label, field) => {
    return __error({
        code: codes.required_field.code,
        message: codes.required_field.message(label),
        field: field
    })
}

const CustomerValidator = {

    async validateUpdate (data, user) {
        if (!data.name || validator.isEmpty(data.name)) {
            return __empty('Name', 'name')
        }

        if (!data.email ||  validator.isEmpty(data.email)) {
            return __empty('Email', 'email')
        }

        if (!validator.isEmail(data.email)) {
            return __error({
                ...codes.invalid_email,
                field: 'email'
            })
        }

        const __user = await Customer.findOne({
            where: {email: data.email}
        })
        if (__user && user.email !== data.email) {
            return __error({
                ...codes.existing_email,
                field: 'email'
            })
        }

        if (data.password && !validator.isEmpty(data.password) && data.password.length < 6) {
            return __error({
                ...codes.short_password,
                field: 'password'            
            })
        }

        if (data.day_phone && !validator.isMobilePhone(data.day_phone)) {
            return __error({
                ...codes.invalid_phone_no,
                field: 'day_phone'     
            })
        }

        if (data.eve_phone && !validator.isMobilePhone(data.eve_phone)) {
            return __error({
                ...codes.invalid_phone_no,
                field: 'eve_phone'     
            })
        }

        if (data.mob_phone && !validator.isMobilePhone(data.mob_phone)) {
            return __error({
                ...codes.invalid_phone_no,
                field: 'mob_phone'     
            })
        }

        return __success()
    },

    async validateRegister (data) {
        if (!data.name || validator.isEmpty(data.name)) {
            return __empty('Name', 'name')
        }

        if (!data.email || validator.isEmpty(data.email)) {
            return __empty('Email', 'email')
        }

        if (!validator.isEmail(data.email)) {
            return __error({
                ...codes.invalid_email,
                field: 'email'
            })
        }

        if (!data.password || validator.isEmpty(data.password)) {
            return __empty('Password', 'password')
        }

        if (data.password.length < 6) {
            return __error({
                ...codes.short_password,
                field: 'password'            
            })
        }

        const user = await Customer.findOne({
            where: {email: data.email}
        })
        if (user) {
            return __error({
                ...codes.existing_email,
                field: 'email'
            })
        }

        return __success()
    },

    validateLogin (data) {

        if (!data.email || validator.isEmpty(data.email)) {
            return __empty('Email', 'email')
        }

        if (!validator.isEmail(data.email)) {
            return __error({
                ...codes.invalid_email,
                field: 'email'
            })
        }

        if (!data.password || validator.isEmpty(data.password)) {
            return __empty('Password', 'password')
        }

        return __success()
    },

    validateAddress (data) {
        
        if (!data.address_1 || validator.isEmpty(data.address_1)) {
            return __empty('Address 1', 'address_1')
        }

        if (!data.city || validator.isEmpty(data.city)) {
            return __empty('City', 'city')
        }

        if (!data.region || validator.isEmpty(data.region)) {
            return __empty('Region', 'region')
        }

        if (!data.postal_code || validator.isEmpty(data.postal_code)) {
            return __empty('Postal Code', 'postal_code')
        }

        if (!data.country || validator.isEmpty(data.country)) {
            return __empty('Country', 'country')
        }

        if (!data.shipping_region_id || validator.isEmpty(data.shipping_region_id)) {
            return __empty('Shipping Region', 'shipping_region_id')
        }

        if (!validator.isInt(data.shipping_region_id)) {
           return __error({
               ...codes.shipping_region,
               field: 'shipping_region_id',
           }) 
        }

        return __success()
    },

    validateCC (data) {
        if (!data.credit_card || validator.isEmpty(data.credit_card)) {
            return __empty('Credit Card', 'credit_card')
        }

        if (!validator.isCreditCard(data.credit_card)) {
            return __error({
                ...codes.invalid_credit_card,
                field: 'credit_card'
            })
        }

        return __success()
    }
}


module.exports = CustomerValidator