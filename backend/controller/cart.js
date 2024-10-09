const Cart = require('../model/cart');

const addtocart = async (req, res) => {
  try {
    const {name, description, category, image, quantity,price, _id} = req.body;
    console.log('req.body', req.body);
    const user = req?.user?._id;
    console.log('userID', user);
    const payload = {
      name,
      description,
      price,
      category,
      image,
      quantity,
      userID: user,
      productID: _id,
    };
    console.log('payload', payload);

    const existingCartItem = await Cart.findOne({userID: user, productID: _id});

    console.log('existingCartItem', existingCartItem);

    if (existingCartItem == null) {
      const cartData = new Cart(payload);
      newCart = await cartData.save();
      console.log('a');
    } else {
      console.log('b');
      existingCartItem.quantity += quantity;
      newCart = await existingCartItem.save();
    }

    res.status(200).json({
      data: newCart,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
      error: true,
    });
  }
};

const cartcount = async (req, res) => {
  try {
    const user = req?.user?._id;
  
    const count = await Cart.countDocuments({userID: user});
    res.status(200).json({
      data: count,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
      error: true,
    });
  }
};

const cart = async (req, res) => {
const user = req?.user?._id;
  try {
    const cart = await Cart.find({userID: user});
   
    if(cart){
      cart: cart
    }else{
      cart: []
    }
    res.status(200).json({
      data: cart,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
      error: true,
    });
  }
};

const updatecart = async (req, res) => {
  try {
const user = req.body;
console.log('user', user);
    const CartItem = await Cart.findOneAndUpdate(
      {_id:req.body._id},
      {$set: req.body},
      {new: true}
    );
    console.log('CartItem', CartItem);
    res.status(200).json({
      data: CartItem,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  }             
}

const deletecart = async (req, res) => {
  try {
const user = req.body;
console.log('user', user);
    const CartItem = await Cart.findOneAndDelete(
      {_id:req.body._id},
    );
    console.log('CartItem', CartItem);
    res.status(200).json({
      data: CartItem,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  }             
}

module.exports = {addtocart, cartcount, cart, updatecart, deletecart};
