const { chai } = require('./util')

describe('GET /shoppingcart/generateUniqueId', () => {
    it('Generate shopping cart unique id', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/generateUniqueId')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

describe('POST /shoppingcart/add', () => {
    it('Add a product to the cart', done => {
        const product = {

        }

        chai.request('http://localhost:8000')
        .post('/shoppingcart/add')
        .send(product)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})


describe('GET /shoppingcart/{cart_id}', () => {
    it('Get list of products in a shopping cart', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/{my-cart-id}')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('PUT /shoppingcart/update/{item_id}', () => {
    it('Update an item in the cart', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/update/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})



describe('DELETE /shoppingcart/empty/{cart_id}', () => {
    it('Empty the cart', done => {
        chai.request('http://localhost:8000')
        .delete('/shoppingcart/empty/{my-cart-id}')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('GET /shoppingcart/moveToCart/{item_id}', () => {
    it('Move a product to cart', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/moveToCart/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})



describe('GET /shoppingcart/totalAmount/{cart_id}', () => {
    it('Return a total amount from the cart', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/totalAmount/{my-cart-id}')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('GET /shoppingcart/saveForLater/{item_id}', () => {
    it('Save a product for later', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/saveForLater/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})

//some may be wrong in the endpoint
//some about saving product
//products are saved with item_id and retrieved using cart_id
//how is that possible, find out
describe('GET /shoppingcart/getSaved/{cart-id}', () => {
    it('Get a product saved for later', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/generateUniqueId')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})


describe('DELETE /shoppingcart/removeProduct/{item_id}', () => {
    it('Remove a product from the cart', done => {
        chai.request('http://localhost:8000')
        .delete('/shoppingcart/removeProduct/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)

            done();
        })
    })
})



