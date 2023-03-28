const mongoose = require("mongoose");

const getConnection = async () => {
  await mongoose.connect(
    "mongodb+srv://vkgoldy:vkgoldy@realestate.1mpbsvt.mongodb.net/real-estate?retryWrites=true&w=majority"
    
  );
  console.log("Connected to database successfully...!");
};

module.exports = getConnection;
