module.exports = {
    auth: {
        code_empty: {
            code: 'AUT_01',
            message: 'Authorization code is empty'
        },
        access_denied: {
            code: 'AUT_02',
            message: 'Access Unauthorized'
        }
    },
    paging: {
        order_not_matched: {
            code: 'PAG_01',
            message: `The order is not matched 'field, (DEC|ASC)'`
        },
        order_not_allowed: {
            code: 'PAG_02',
            message: 'The field of order is not allowed'
        },
        page_not_number: {
            code: 'PAG_03',
            message: 'The Page field is not a number'
        },
        limit_not_number: {
            code: 'PAG_03',
            message: 'The Limit field is not a number'
        },
        desc_len_not_number: {
            code: 'PAG_04',
            message: 'The Description Length field is not a number'
        }
    },
    user: {
        invalid_email_password: {
            code: 'USR_01',
            message: 'Email or Password is invalid'
        },
        required_field: {
            code: 'USR_02',
            message: (fields) => {
                if (typeof(fields) === 'string') {
                    return `The ${fields} field is required`
                } else if (Array.isArray(fields)) {
                    return `The ${fields.join(', ')} are required`
                }
            }
        },
        invalid_email: {
            code: 'USR_03',
            message: 'The email is invalid.'
        },
        existing_email: {
            code: 'USR_04',
            message: 'The email already exists.'
        },
        email_not_exists: {
            code: 'USR_05',
            message: 'The email does not exist.'
        },
        invalid_phone_no: {
            code: 'USR_06',
            message: 'This is an invalid phone number'
        },
        field_too_long: {
            code: 'USR_07',
            message: (field) => `The ${field} field is too long.`
        },
        invalid_credit_card: {
            code: 'USR_08',
            message: 'This is an invalid credit card'
        },
        shipping_region: {
            code: 'USR_09',
            message: 'The shipping region Id is not a number'
        },
        short_password: {
            code: 'USR_10',
            message: 'Password must 6 characters or more'
        }
    },
    category: {
        not_exists: {
            code: 'CAT_01',
            message: 'A category with this ID does not exist'
        }
    },
    department: {
        id_not_number: {
            code: 'DEP_01',
            message: 'The department ID is not a number'
        },
        not_exists: {
            code: 'DEP_02',
            message: 'A department with this ID does not exist.'
        }
    },
    product: {
        field_required: {
            code: 'PRD_01',
            message: (field) => `The ${field} field is required.`
        },
        all_words: {
            code: 'PRD_02',
            message: "Only 'on' and 'off' are allowed"
        },
        rating_not_number: {
            code: 'PRD_03',
            message: 'Rating is not a number'
        }
    }
}