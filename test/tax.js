const { chai } = require('./util')

describe('GET /taxes', () => {
    it('Get all taxes', done => {
        chai.request('http://localhost:8000')
        .get('/taxes')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /tax/{tax_id}', () => {
    it('Get a tax by id', done => {
        chai.request('http://localhost:8000')
        .get('/tax/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})

