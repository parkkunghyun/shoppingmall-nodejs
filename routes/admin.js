const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');
const { route } = require('express/lib/application');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts)
//router.get('/edit-product')

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct );

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product',adminController.postDeleteProduct);


module.exports = router
//exports.routes = router;
// exports.products = products;


//괄호 안쓰고 적으면 함수에 참조만 전달하는걸로 실행은 안한다!!
// express에 이 함수를 저장하라고 알려주기만 하는거!!
//고로 라우터에 도착할때마다 실행!!