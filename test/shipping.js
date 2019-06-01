const { chai } = require('./util')

describe('GET /shipping/regions', () => {
    it('Get shipping regions', done => {
        chai.request('http://localhost:8000')
        .get('/shipping/regions')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');

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

            done();
        })
    })
})

