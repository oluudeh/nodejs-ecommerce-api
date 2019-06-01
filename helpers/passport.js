const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const extractJWT = passportJWT.ExtractJwt

const db = require('../models')
const Customer = db.sequelize.models.Customer


//customer registration middleware
passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await Customer.create({ email, password})
        return done(null, user)
    } catch(err) {
        done(err)
    }
}));


//create a user login middleware
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await Customer.findOne({
            where: { email: email }
        })
        if (!user) {
            return done(null, false, { message: 'User not found'}) 
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return done(null, false, { message: 'Wrong password' })
        }

        //all good
        return done(null, user, { message: 'Logged in successfully'})
    } catch (err) {
        console.log('passport.use ', err)
        return done(err)
    }
}));


const keyExtractor = (req) => {
    //console.log('Headers', req.headers)
    let token = req.headers['user-key']
    if (token) {
        const frags = token.split(' ')
        if (frags.length == 2 && frags[0] === 'Bearer') {
            token = frags[1]
        }
    }
    return token
}

//Handles token verification
passport.use(new JWTStrategy({
    secretOrKey: 'jwt-secret',
    jwtFromRequest: keyExtractor //extractJWT.fromHeader('user-key')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (err) {
        console.log(err)
        return done(err)
    }
}))
