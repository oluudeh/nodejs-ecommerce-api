const { chai } = require('./util')

describe('GET /products', () => {
    it('Get all products', done => {
        chai.request('http://localhost:8000')
        .get('/products')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('GET /products/{product_id}', () => {
    it('Get product details', done => {
        chai.request('http://localhost:8000')
        .get('/products/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})


describe('GET /products/inCategory/{category_id}', () => {
    it('Get a list of products of categories', done => {
        chai.request('http://localhost:8000')
        .get('/products/inCategory/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('GET /products/inDepartment/{department_id}', () => {
    it('Get a list of products in departments', done => {
        chai.request('http://localhost:8000')
        .get('/products/inDepartment/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('GET /products/{product_id}/details', () => {
    it('Get details of a product', done => {
        chai.request('http://localhost:8000')
        .get('/products/1/details')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('GET /products/{product_id}/locations', () => {
    it('Get locations of a product', done => {
        chai.request('http://localhost:8000')
        .get('/products/1/locations')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})



describe('GET /products/{product_id}/reviews', () => {
    it('Get reviews of a product', done => {
        chai.request('http://localhost:8000')
        .get('/products/1/reviews')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})



describe('POST /products/{product_id}/reviews', () => {
    it('Post a product review', done => {
        chai.request('http://localhost:8000')
        .post('/products/1/details')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})