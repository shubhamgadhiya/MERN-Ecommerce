const mongoose = require("mongoose");

async function connect() {
    try {
       connect = await mongoose.connect(process.env.MONGODB_URI);
       return connect;
    } catch(error){
        console.log("Error connecting to database");
    }
}
module.exports = {connect};
