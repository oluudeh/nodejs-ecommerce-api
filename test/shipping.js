const { chai } = require('./util')

describe('GET /shipping/regions', () => {
    it('Get shipping regions', done => {
        chai.request('http://localhost:8000')
        .get('/shipping/regions')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /shipping/regions/{shipping_region_id}', () => {
    it('Get details of a shipping region', done => {
        chai.request('http://localhost:8000')
        .get('/shipping/regions/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})

