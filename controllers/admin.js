const Product = require('../models/product');

exports.getAddProduct = (_req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const {
    title, imageURL, description, price,
  } = req.body;

  const product = new Product(title, imageURL, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (_req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Shop',
      path: '/admin/products',
    });
  });
};