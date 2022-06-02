const { redirect } = require('express/lib/response')
const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
      pageTitle: 'Add Product', 
      path: '/admin/add-product',
      editing: false
      })
  }

exports.postAddProduct = (req, res, next) => {
    //products.push({ title: req.body.title });
    const title = req.body.title
    const imageURL = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    
    const product = new Product(null, title,imageURL,description,price)
    
    product.save()
    .then(() => { res.redirect('/')})
    .catch(err => console.log(err))
    
  }

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit  // true false로 
    
    if(!editMode) {
      return res.redirect('/')
    }

    const prodId = req.params.productId
    Product.findById(prodId, product => {

      if(!product) {
        return res.redirect('/')
      }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product', 
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
  })
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
}

exports.postEditProduct = (req,res,next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDescription = req.body.description

  const updateProduct = new Product(prodId, updatedTitle, updatedImageUrl,updatedDescription ,updatedPrice)

  updateProduct.save()

  res.redirect('/admin/products')
}

exports.getProducts = (req,res,next) => {
    Product.fetchAll().then(([rows,filedata]) =>{
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products', 
        path: '/admin/products', 
      });
    }).catch(err => console.log(err))
}

exports.postDeleteProduct = (req,res,next) => {
  const prodId =req.body.productId 
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}