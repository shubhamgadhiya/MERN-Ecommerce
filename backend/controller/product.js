const Product = require("../model/product");

const addproduct =async (req,res) =>  {
    try {
        const { name, description, image, price, category } = req.body;
    
        console.log("req.body", req.body);

        if (!name) {
          throw new Error("name not enter");
        }
        if (!description) {
          throw new Error("description not enter");
        }
        if (!image) {
          throw new Error("image not upload");
        }
        if (!price) {
          throw new Error("price not enter");
        }
        if (!category) {
          throw new Error("category not enter");
        }

        const productData = new Product(req.body)
        const product = await productData.save();
    
        res.status(200).json({
          data: product,
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

const product = async (req,res) => {
    try{

        const product = await Product.find()
        res.status(200).json({
            data: product,
            success: true,
            error: false,
        });
    } catch(error){
        console.log("error",error)
        console.log("error.message",error.message)
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            error: true,
        });
    
    }
};

const updateproduct = async (req, res) => {
    try {
      const { _id, name, description, image, price, category } = req.body;

      const product = await Product.findByIdAndUpdate(
        { _id: req.body._id },
        {$set: req.body},
        { new: true }
      );
  
      res.status(200).json({
        data: product,
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
};

const deleteproduct = async (req, res) => {
  try {
 const _id = req.params.id;

    const product = await Product.findByIdAndDelete(
      { _id },
    );

    res.status(200).json({
      data: product,
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
};


module.exports = {addproduct, product, updateproduct, deleteproduct};