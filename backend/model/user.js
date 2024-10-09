const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: String,
  role: String,
  profilepic: String,
  phonenumber: Number,
  image: String,
},
{
  timestamps: true,
}
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;