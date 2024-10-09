const {signin, signup,update,currentuser,alluser, authentication} = require('../controller/user');
const express = require('express');
const router = express.Router();
const protected = require('../middleware/protected');
const {product, addproduct, updateproduct, deleteproduct} = require('../controller/product');
const {addtocart, cartcount, cart, updatecart, deletecart} = require('../controller/cart');
router.get('/test', (req, res) => {
  res.send('Hello from the API');
});

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/update/:id', update);
router.post('/currentuser', currentuser);
router.get('/alluser', alluser);

router.post('/addproduct', protected, addproduct);
router.get('/product', product);
router.put('/updateproduct/:id', protected, updateproduct);
router.delete('/deleteproduct/:id', protected, deleteproduct);

router.post('/addtocart', protected, addtocart);
router.get('/cartcount', protected, cartcount);
router.get('/cart', protected, cart);

router.put('/updatecart/:id', protected, updatecart);

router.delete('/deletecart/:id', protected, deletecart);

module.exports = router;
