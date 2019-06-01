# Turing Backend Challenge

>An E-commerce API

# Technology Stack
This API is built on NodeJS and MySQL. Some of the modules used include:
1. Express JS for handling HTTP requests.
2. MySQL database for storing application data.
3. Sequelize.js ORM for mapping database tables to objects.
4. Passport and jsonwebtoken for API Authentication and token generation.
5. Helmet for security.
6. Dotenv to handle configurations.
7. ApiCache to handle caching

# Installation
Follow the following steps to install
1. Clone the repo
2. Move to project directory
3. Run the following to install dependences
    ```
    npm install
    ```
4. Set up database. Modified sql file can be found here. You need to copy the file contents unto a MySQL console.
5. Rename the .env-example file to .env and fill in the correct settings and credentials
6. Run the following code to start up the app
    ```
    npm run start:dev
    ```


# Tests
You can test the app as a whole or test the various modules seperately.

*Note* You need to have mocha installed globally to run tests. run the following command to install mocha globally:
    ```
    npm install -g mocha
    ```
To test the whole app run the following command inside the project directory.
    ```
    npm run test
    ```
To test the various modules seperately, run one of the following commands
    ```
    npm run test:attributes
    ```
    ```
    npm run test:categories
    ```
    ```
    npm run test:customers
    ```
    ```
    npm run test:departments
    ```
    ```
    npm run test:orders
    ```
    ```
    npm run test:products
    ```
    ```
    npm run test:shipping
    ```
    ```
    npm run test:shopping_cart
    ```
    ```
    npm run test:taxes
    ```

# API Documentation

# Change Log
The following changes were made during the course of development
1. Database changes: I changed the length of the password column in the customer table from 50 to 60 in order to accommodate password hashes.

I also modified some stored procedures. The modified procedures include 

    i.   shopping_cart_add_product

    ii.  shopping_cart_update

    iii. shopping_cart_get_products

2. Error message changes: Some error cases (such as invalid phone number, invalid credit card number, etc) were not accounted for in the error document; I created them.

3. Stripe key changes: In the backend challenge document, the Stripe secret key was provided for use, however the publishable key was not provided. Although the pub-key is not required to complete the task, it is required to generate a matching token. So I used the test secret key and pub-key provided on Stripe website to complete the task. 

However, this can be set in the config (.env) file.

4. Authentication header key: The API challenge document says to use 'USER-KEY' as the header while the Swagger documentation uses API-KEY. I used 'USER-KEY' in this application. 

# Advanced Requirements

# About Remote Job Alert
## App Scaling
The following steps can be taken to make the ap scale better.
1. Implement a more robust caching mechanism using Redis.
To add Redis to the current cache mechanism, the following adaptations can be made to the code:
    ```
    const express = require('express')
    const redis = require('redis')
    const apicache = require('apicache')

    const app = express()

    const redisCache = apicache.options({
        redisClient: redis.createClient()
    }).middleware

    //...

    app.get('/route-to-cache', redisCache('1 hour'), (req, res) => {
        res.send({ message: 'I am cached' })
    })
    
    //...

    ```

2. Using a connection pool in MySQL. 
   To support connection pool in the application, the following adaptations can be made to the code:
    ```
    const sequelize = new Sequelize(/* database credentials */, {
        pool: {
            max: 7,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })
    
    //...
    ```

3. To further boost performance, configure enable parallel processing using the cluster module.
    The following code adaptations can be made to configure parallel processing.
    i. Create a file named cluster.js in the root folder and put the following code in the 
    ```
    const cluster = require('cluster')
    const os = require('os)
    const CPUS = os.cpus()

    if (cluster.isMaster) {
        CPUS.forEach(() => {
            cluster.fork()
        })
        cluster.on('listening', (worker) => {
            console.log("Cluster %d connected", worker.process.pid)
        })
        cluster.on('disconnect', (worker) => {
            console.log("Cluster %d connected", worker.process.pid)
        })
        cluster.on('exit', (worker) => {
            console.log("Cluster %d is dead", worker.process.pid)
            //Ensure a new cluster starts when an old one dies
            cluster.fork()
        })
    } else {
        require('./www')
    }
    ```
    ii. Modify the package.json as follows:
    `start:dev": "nodemon ./cluster.js`


4. Aside from code adaptations, the server infrastructures can be scaled.