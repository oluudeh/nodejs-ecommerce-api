const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');


//set up express
const app = express();

//log requests to the console
app.use(logger('dev'));

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

/*app.get('*', (req, res) => res.status(200).send({
    message: "Welcome to my API"
}));*/
app.use('/', routes)


module.exports = app;