const Product = require('../models/product.model');

async function addCartItem(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.body.productId);
    } catch(error) {
        next(error);
        return;
    }
    const cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart;
    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity,
    });
}

function getCart(req, res, next) {
    res.render('customer/cart/cart');
}

module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
}