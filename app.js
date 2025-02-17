const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

require('dotenv').config()

require('./helpers/passport')

//set up express
const app = express();

//log requests to the console
if (process.env.DEBUG) {
    app.use(logger('dev'));
}

//secuity
app.use(helmet())

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
//app.use('/api/v1', )

const routes = require('./routes');
/*app.get('*', (req, res) => res.status(200).send({
    message: "Welcome to my API"
}));*/
app.use('/', routes)
app.use(passport.initialize())


module.exports = app;