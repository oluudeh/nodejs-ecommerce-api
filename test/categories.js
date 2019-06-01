const { chai } = require('./util')

describe('GET /categories', () => {
    it('Get categories', done => {
        chai.request('http://localhost:8000')
        .get('/categories')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.rows.should.be.a('array')
            //res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /categories/{category_id}', () => {
    it('Get an category', done => {
        chai.request('http://localhost:8000')
        .get('/categories/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.category_id.should.be.eql(1)

            done();
        })
    })
})


describe('GET /categories/inDepartment/{department_id}', () => {
    it('Get categories of a department', done => {
        chai.request('http://localhost:8000')
        .get('/categories/inDepartment/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            //res.body.length.should.be.gt(0)

            done();
        })
    })
})


describe('GET /categories/inProduct/{product_id}', () => {
    it('Get categories of a product', done => {
        chai.request('http://localhost:8000')
        .get('/categories/inProduct/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            //res.body.length.should.be.eql(2)

            done();
        })
    })
})