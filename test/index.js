const { chai } = require('./util')

describe('/ (Index route)', () => {
    it('It should display a welcome message', done => {
        chai.request('http://localhost:8000')
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            done();
        })
    })
})