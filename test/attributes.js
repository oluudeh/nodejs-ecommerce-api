const { chai } = require('./util')

describe('GET /attributes', () => {
    it('Get attribute list', done => {
        chai.request('http://localhost:8000')
        .get('/attributes')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /attributes/{attribute_id}', () => {
    it('Get an attribute', done => {
        chai.request('http://localhost:8000')
        .get('/attributes/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})


describe('GET /attributes/values/{attribute_id}', () => {
    it('Get values attribute from attribute', done => {
        chai.request('http://localhost:8000')
        .get('/attributes/values/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('GET /attributes/inProduct/{product_id}', () => {
    it('Get all attributes with product id', done => {
        chai.request('http://localhost:8000')
        .get('/attributes/inProduct/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})