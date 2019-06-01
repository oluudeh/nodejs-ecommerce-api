const { chai } = require('./util')

let cartId;
let itemId;
let price;

describe('GET /shoppingcart/generateUniqueId', () => {
    it('Generate shopping cart unique id', done => {
        chai.request('http://localhost:8000')
        .get('/shoppingcart/generateUniqueId')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.cart_id.should.be.a('string')
            cartId = res.body.cart_id
            done();
        })
    })
})

describe('POST /shoppingcart/add', () => {
    it('Add a product to the cart', done => {
        const product = {
            cart_id: cartId,
            product_id: 1,
            attributes: 'sample attributes'
        }

        chai.request('http://localhost:8000')
        .post('/shoppingcart/add')
        .send(product)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)
            itemId = res.body[0].item_id
            price = parseFloat(res.body[0].price)
            done();
        })
    })
})


describe('GET /shoppingcart/{cart_id}', () => {
    it('Get list of products in a shopping cart', done => {
        chai.request('http://localhost:8000')
        .get(`/shoppingcart/${cartId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})


describe('PUT /shoppingcart/update/{item_id}', () => {
    it('Update an item in the cart', done => {
        const data = {
            item_id: itemId,
            quantity: 4
        }

        chai.request('http://localhost:8000')
        .put(`/shoppingcart/update/${itemId}`)
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)
            res.body[0].quantity.should.be.eql(data.quantity)

            done();
        })
    })
})

describe('GET /shoppingcart/totalAmount/{cart_id}', () => {
    it('Return a total amount from the cart', done => {
        chai.request('http://localhost:8000')
        .get(`/shoppingcart/totalAmount/${cartId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.total_amount.should.be.eql( String(4 * price) )

            done();
        })
    })
})

describe('GET /shoppingcart/saveForLater/{item_id}', () => {
    it('Save a product for later', done => {
        chai.request('http://localhost:8000')
        .get(`/shoppingcart/saveForLater/${itemId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            done();
        })
    })
})

describe('GET /shoppingcart/getSaved/{cart-id}', () => {
    it('Get a product saved for later', done => {
        chai.request('http://localhost:8000')
        .get(`/shoppingcart/getSaved/${cartId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)

            done();
        })
    })
})

describe('GET /shoppingcart/moveToCart/{item_id}', () => {
    it('Move a product to cart', done => {
        chai.request('http://localhost:8000')
        .get(`/shoppingcart/moveToCart/${itemId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            done();
        })
    })
})


describe('DELETE /shoppingcart/removeProduct/{item_id}', () => {
    it('Remove a product from the cart', done => {
        chai.request('http://localhost:8000')
        .delete(`/shoppingcart/removeProduct/${itemId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            done();
        })
    })
})


describe('DELETE /shoppingcart/empty/{cart_id}', () => {
    it('Empty the cart', done => {
        chai.request('http://localhost:8000')
        .delete(`/shoppingcart/empty/${cartId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');

            done();
        })
    })
})

