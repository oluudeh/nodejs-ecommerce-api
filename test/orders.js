const { chai } = require('./util')

describe('POST /orders', () => {
    it('Create an order', done => {
        chai.request('http://localhost:8000')
        .get('/orders')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /orders/{order_id}', () => {
    it('Get order details', done => {
        chai.request('http://localhost:8000')
        .get('/orders/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})


describe('GET /orders/inCustomer', () => {
    it('Get orders by customer', done => {
        chai.request('http://localhost:8000')
        .get('/orders/inCustomer')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('GET /orders/shortDetail/{order_id}', () => {
    it('Get info about an order', done => {
        chai.request('http://localhost:8000')
        .get('/orders/shortDetail/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})