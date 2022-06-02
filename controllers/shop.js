//컨트롤러의 역할 1 -> 뷰를 렌디링하는 걸 적어주는 공간!!
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    //const products = adminData.products;
    Product.fetchAll().then(([rows,fieldData])=>{
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products', 
        path: '/products', 
        });
    }).catch(err => {console.log(err)});
    
  }
  exports.getProduct = (req,res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(([product]) => {
      console.log(product[0])
      res.render('shop/product-detail', { 
        
        product: product[0],
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch(err => console.log(err))
    //res.redirect('/') -------------> 위에 res.render있는데 왜 안지웠지 ㅋㅋ
  }

exports.getIndex = (req,res,next) => {

  Product.fetchAll().then( ([rows, filedata]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop', 
      path: '/', 
     
      //layout:false 를 적으면 기본레이아웃을 사용하지 않고 이 설정이 없으면 사용!! 그냥 없애라
      });
  }).catch();

}
exports.getCart = (req,res,next) => {

  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for(let product of products) {

        const cartProductData = cart.products.find(prod => prod.id === product.id )
        if(cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty } )

        }
      }
      res.render( 'shop/cart', {
        path: '/cart',
        pageTitle: "Your Cart",
        products: cartProducts
      })
    })
  })
 
}
exports.postCart = (req,res,next) => {
  const prodId = req.body.productId 
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
  
}
exports.getOrders = (req,res,next) => {
  res.render( 'shop/orders', {
    path: '/orders',
    pageTitle: "Your Orders"
  })
}

exports.getCheckout = (req,res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}