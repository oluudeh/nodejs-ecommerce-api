const cart = require('../controllers/shoppingcart')

module.exports = (router) => {
    router.get('/shoppingcart/generateUniqueId', cart.generateId)
    router.post('/shoppingcart/add', cart.addToCart)
    router.get('/shoppingcart/:cart_id', cart.getCartProducts)
    router.put('/shoppingcart/update/:item_id', cart.updateCart)
    router.delete('/shoppingcart/empty/:cart_id', cart.clearCart)
    router.get('/shoppingcart/moveToCart/:item_id', cart.moveToCart)
    router.get('/shoppingcart/totalAmount/:cart_id', cart.getCartTotal)
    router.get('/shoppingcart/saveForLater/:item_id', cart.saveForLater)
    router.get('/shoppingcart/getSaved/:cart_id', cart.getSavedItems)
    router.delete('/shoppingcart/removeProduct/:item_id', cart.removeFromCart)
}