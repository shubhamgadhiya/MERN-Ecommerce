const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  name: String,
  description:String,
  price: String,
  category:String,
  image:String,
  quantity: Number,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  productID: {
    type: Schema.Types.ObjectId,
    ref: "allproduct",
  },
},
{
  timestamps: true,
}
);

const CartModel = mongoose.model("addtocart", cartSchema);

module.exports = CartModel;