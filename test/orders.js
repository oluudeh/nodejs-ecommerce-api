const { chai } = require('./util')
const db = require('../models')
const Customer = db.sequelize.models.Customer

describe('Order tests', () => {
    let cartId;
    let authToken;
    let orderId;

    const data = {
        name: 'John Doe',
        email: 'odumramon@gmail.com',
        password: 'abc123(){}'
    }

    after(() => {
        console.log('Deleting test objects')
        Customer.destroy({
            where: { email: data.email }
        })
    })

    describe('POST /customers', () => {
        it('Register a customer', done => {
        
            chai.request('http://localhost:8000')
            .post('/customers')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.customer.schema.email.should.be.eql(data.email)
                res.body.accessToken.should.be.a('string')
                authToken = res.body.accessToken
                done();
            })
        })
    })

    describe('GET /shoppingcart/generateUniqueId', () => {
        it('Generate shopping cart unique id', done => {
            chai.request('http://localhost:8000')
            .get('/shoppingcart/generateUniqueId')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.cart_id.should.be.a('string')
                cartId = res.body.cart_id
                done();
            })
        })
    })
    
    describe('POST /shoppingcart/add', () => {
        it('Add a product to the cart', done => {
            const product = {
                cart_id: cartId,
                product_id: 1,
                attributes: 'sample attributes'
            }
    
            chai.request('http://localhost:8000')
            .post('/shoppingcart/add')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1)
                done();
            })
        })
    })
    
    
    describe('POST /orders', () => {
        it('Create an order', done => {
            const data = {
                cart_id: cartId,
                shipping_id: '1',
                tax_id: '1'
            }
            chai.request('http://localhost:8000')
            .post('/orders')
            .set('USER-KEY', authToken)
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.orderId.should.be.gt(0)
                orderId = res.body.orderId
                done();
            })
        })
    })
    
    describe('GET /orders/{order_id}', () => {
        it('Get order details', done => {
            chai.request('http://localhost:8000')
            .get(`/orders/${orderId}`)
            .set('USER-KEY', authToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.order_id.should.be.eql(orderId)
                done();
            })
        })
    })
    
    
    describe('GET /orders/inCustomer', () => {
        it('Get orders by customer', done => {
            chai.request('http://localhost:8000')
            .get('/orders/inCustomer')
            .set('USER-KEY', authToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1)
    
                done();
            })
        })
    })
    
    
    describe('GET /orders/shortDetail/{order_id}', () => {
        it('Get info about an order', done => {
            chai.request('http://localhost:8000')
            .get(`/orders/shortDetail/${orderId}`)
            .set('USER-KEY', authToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.order_id.should.be.eql(orderId)
    
                done();
            })
        })
    })
})
