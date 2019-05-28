const { chai } = require('./util')

describe('POST /stripe/charge', () => {
    it('Receive payment', done => {
        const data = {

        }
        chai.request('http://localhost:8000')
        .post('/stripe/charge')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})
