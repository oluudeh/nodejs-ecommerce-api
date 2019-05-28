const { chai } = require('./util')

describe('PUT /customer', () => {
    it('update a customer', done => {
        const profile = {

        }

        chai.request('http://localhost:8000')
        .put('/customer')
        .send(profile)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /customer', () => {
    it('Get a customer profile', done => {
        chai.request('http://localhost:8000')
        .get('/customer')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})


describe('POST /customers', () => {
    it('Register a customer', done => {
        const data = {

        }
        chai.request('http://localhost:8000')
        .post('/customers')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('POST /customers/login', () => {
    it('User login', done => {
        const data = {

        }
        chai.request('http://localhost:8000')
        .post('/customers/login')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


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
})


describe('PUT /customers/address', () => {
    it('Update customer address', done => {
        const data = {

        }
        chai.request('http://localhost:8000')
        .put('/customers/address')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('PUT /customers/creditCard', () => {
    it('Update user credit card', done => {
        const data = {

        }
        chai.request('http://localhost:8000')
        .put('/customers/creditCard')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})