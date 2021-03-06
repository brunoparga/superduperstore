const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function addToCart(product) {
  const productIndex = this.cart.items
    .findIndex((item) => item.product.toString() === product._id.toString());

  let newQuantity = 1;
  const updatedItems = [...this.cart.items];

  if (productIndex >= 0) {
    newQuantity = this.cart.items[productIndex].quantity + 1;
    updatedItems[productIndex].quantity = newQuantity;
  } else {
    updatedItems.push({
      product,
      quantity: newQuantity,
    });
  }
  this.cart.items = updatedItems;
  return this.save();
};

userSchema.methods.removeFromCart = function removeFromCart(product) {
  this.cart.items = this.cart.items
    .filter((item) => item.product.toString() !== product.toString());
  return this.save();
};

userSchema.methods.clearCart = function clearCart() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
