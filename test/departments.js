const { chai } = require('./util')

describe('GET /departments', () => {
    it('Get departments', done => {
        chai.request('http://localhost:8000')
        .get('/departments')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /departments/{department_id}', () => {
    it('Get a department by id', done => {
        chai.request('http://localhost:8000')
        .get('/departments/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})

