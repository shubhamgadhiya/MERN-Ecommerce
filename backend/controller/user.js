const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phonenumber, profilepic, image } = req.body;

    console.log("req.body", req.body);
    const existingUser = await User.findOne({
        $or: [{ email }, { phonenumber }]
      });
  console.log("existingUser",existingUser)
  if (existingUser) {
      if (existingUser.email == email) {
        throw new Error("Email already exists");
      } else{
        throw new Error("phone number already exists");
      }
    }
    if (!firstname) {
      throw new Error("firstname not enter");
    }
    if (!lastname) {
      throw new Error("lastname not enter");
    }
    if (!password) {
      throw new Error("password not enter");
    }
    if (!phonenumber) {
      throw new Error("phonenumber not enter");
    }
    if (!profilepic) {
      throw new Error("profilepic not enter");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password,salt)

    if(!hashPassword){
        throw new Error("password not hash");
    }

    const payload = {
        ...req.body,
        role: "USER",
        password: hashPassword
    }
    console.log("payload", payload);
    const userData = new User(payload)
    const newUser = await userData.save();

    res.status(200).json({
      data: newUser,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("error",error)
    console.log("error.message",error.message)
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

const signin = async(req,res) => {
    try {
        const { email, password } = req.body;
        console.log("req.body", req.body);
        if (!email) {
          throw new Error("email not enter");
        }
        if (!password) {
          throw new Error("password not enter");
        }
        const userData = await User.findOne({email})
        if(!userData){
            throw new Error("User not found");
        }
        console.log("userData",userData)
        const user = {
          _id: userData._id,
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phonenumber: userData.phonenumber,
          role: userData.role,
          image: userData.image,
        }

        const isMatch = await bcrypt.compareSync(password, userData.password);
        console.log("isMatch",isMatch)
        if(!isMatch){
            throw new Error("Password not match");
        }
        const token = jwt.sign( user, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            data: user,
            token:token,
            success: true,
            error: false,
          });
    } catch(error){
        console.log("error",error)
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            error: true,
          });
    }      
};

const update = async (req, res) => {
  try {
    const { _id } = req.body; 
    console.log("req.body", req.body);
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: 'Update successful',
      success: true,
      error: false,
      data: updatedUser,
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
};

const authentication = (req,res) => {
  res.send("protected")
}

const currentuser = async(req, res) => {
  try{

    const {_id} = req.body;
    console.log("req.body",_id)
    const userdetails = await User.findOne({_id: _id});
    console.log("user", userdetails);
    res.status(200).json({
      data: userdetails,
      success: true,
      error: false,
    });
  }catch(error) {
    console.log("error",error)
    console.log("error.message",error.message)
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  
  }

}

const alluser = async(req, res) => {
  try{
    const alluser = await User.find();
    res.status(200).json({
      data: alluser,
      success: true,
      error: false,
    });
  }catch(error) {
    console.log("error",error)
    console.log("error.message",error.message)
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  
  }

}

module.exports = { signup, signin, authentication, update, currentuser, alluser };