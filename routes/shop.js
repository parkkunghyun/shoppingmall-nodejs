const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop')
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts )

// id가 있을때 사용@!  코드는 위에서 아래로 실행!!
router.get('/products/:productId', shopController.getProduct);


router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.post('/cart-delete-item', shopController.postCartDeleteProduct)

router.get('/checkout', shopController.getCheckout)

router.get('/orders',shopController.getOrders )

//router.get('products/delete')


module.exports = router;
