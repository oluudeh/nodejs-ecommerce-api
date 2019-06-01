const { chai } = require('./util')
const db = require('../models')
const Customer = db.sequelize.models.Customer

const data = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: 'abc123(){}'
}

let authToken;

describe ('Customer Tests', () => {
    after(() => {
        console.log('Deleting test user from database')
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
    
                done();
            })
        })
    })
    
    describe('POST /customers/login', () => {
        it('User login', done => {
            chai.request('http://localhost:8000')
            .post('/customers/login')
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
    
    
    describe('PUT /customer', () => {
        it('update a customer', done => {
            const profile = {
                ...data,
                day_phone: '08032164579',
                eve_phone: '08021436597',
                mob_phone: '08031264597'
            }
    
            chai.request('http://localhost:8000')
            .put('/customer')
            .set('USER-KEY', authToken)
            .send(profile)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.day_phone.should.be.eql(profile.day_phone)
                res.body.eve_phone.should.be.eql(profile.eve_phone)
                res.body.mob_phone.should.be.eql(profile.mob_phone)
    
                done();
            })
        })
    })
    
    describe('GET /customer', () => {
        it('Get a customer profile', done => {
            chai.request('http://localhost:8000')
            .get('/customer')
            .set('USER-KEY', authToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.email.should.be.eql(data.email)
                res.body.name.should.be.eql(data.name)
    
                done();
            })
        })
    })
    
    
    /*
    describe('POST /customers/facebook', () => {
        it('User facebook login', done => {
            const data = {
    
            }
            chai.request('http://localhost:8000')
            .post('/customers/facebook')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2)
    
                done();
            })
        })
    }) */
    
    
    describe('PUT /customers/address', () => {
        it('Update customer address', done => {
            const address = {
                address_1: 'Num 1 Address',
                city: 'Test City',
                region: 'Test Region',
                postal_code: '301212',
                country: "Test Country",
                shipping_region_id: '1'
            }
            chai.request('http://localhost:8000')
            .put('/customers/address')
            .set('USER-KEY', authToken)
            .send(address)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.address_1.should.be.eql(address.address_1)
                res.body.region.should.be.eql(address.region)
                res.body.country.should.be.eql(address.country)
    
                done();
            })
        })
    })
    
    
    describe('PUT /customers/creditCard', () => {
        it('Update user credit card', done => {
            const data = {
                credit_card: '4242 4242 4242 4242'
            }
            chai.request('http://localhost:8000')
            .put('/customers/creditCard')
            .set('USER-KEY', authToken)
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.credit_card.should.be.eql(data.credit_card)
    
                done();
            })
        })
    })
})
