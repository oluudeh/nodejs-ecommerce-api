const db = require('../models')
const Customer = db.sequelize.models.Customer
const jwt = require('jsonwebtoken')
const passport = require('passport')
const bcrypt = require('bcrypt')

const validator = require('../validations/customer')

const saltRounds = 10


const CustomerController = {
    async updateCustomer (req, res) {
        
        const { isValid, error } = await validator.validateUpdate(req.body, req.user)
        if (!isValid) {
            return res.status(400).json({error})
        }

        try {
            const user = req.user

            const values = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, saltRounds),
                day_phone: req.body.day_phone,
                eve_phone: req.body.eve_phone,
                mob_phone: req.body.mob_phone
            }

            await Customer.update( values, { where: { customer_id: user.customer_id } })
            
            return CustomerController.getCustomer(req, res)    
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    async getCustomer (req, res) {
        try {
            const customer = await Customer.findOne({
                where: { customer_id: req.user.customer_id }
            })
            customer.password = undefined
            return res.status(200).send(customer)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    async register (req, res, next) {
        //validate
        const { isValid, error } = await validator.validateRegister(req.body)
        
        if (!isValid) {
           return res.status(400).json({error})
        }

        try {        
            const body = req.body
            const hashed = await bcrypt.hash(body.password, saltRounds)
            const data = {
                name: body.name,
                email: body.email,
                password: hashed
            }
            const user = await Customer.create(data)
            return __signin(req, res, next)
        } catch(e) {
            console.log(e)
            return res.status(500).send(e)
        }
    },

    async apiLogin (req, res, next) {
        const { isValid, error } = validator.validateLogin(req.body)
        if (!isValid) {
            return res.json({error})
        }

        return __signin(req, res, next)
    },

    async facebookLogin (req, res) {

    },

    async updateAddress (req, res) {
        
        const { isValid, error } = validator.validateAddress(req.body)
        if (!isValid) {
            return res.status(400).json({error})
        }

        try {
            const user = req.user

            const values = {
                address_1: req.body.address_1,
                address_2: req.body.address_2,
                city: req.body.city,
                region: req.body.region,
                postal_code: req.body.postal_code,
                country: req.body.country,
                shipping_region_id: req.body.shipping_region_id
            }

            await Customer.update( values, { where: { customer_id: user.customer_id } })
            
            return CustomerController.getCustomer(req, res)    
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    async updateCreditCard (req, res) {
        
        const { isValid, error } = validator.validateCC(req.body)
        if (!isValid) {
            return res.status(400).json({error})
        }

        try {
            const user = req.user

            const values = {
                credit_card: req.body.credit_card
            }

            await Customer.update( values, { where: { customer_id: user.customer_id } })
            
            return CustomerController.getCustomer(req, res)    
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

}

async function __signin (req, res, next) {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occured')
                return next(error)
            }

            req.login(user, { session: false}, async (error) => {
                if (error) return next (error)

                const body = { customer_id: user.customer_id, email: user.email }
                req.user = body
                const token = jwt.sign({ user: body }, 'jwt-secret', { expiresIn: '24h' })
                user.password = undefined
                const payload = {
                    customer: {
                        schema: user
                    },
                    accessToken: `Bearer ${token}`,
                    expires_in: '24h'
                }
                return res.json(payload)
            })
        } catch (error) {
            return next(error)
        }

    })(req, res, next)
}


module.exports = CustomerController