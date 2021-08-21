const mongoose = require('mongoose');

const URI = "mongodb+srv://dbJelly:QiEfQpJVPKDnv5jL@jellycluster.5sfgr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, { useUnifiedTopology: true,  useNewUrlParser: true})
    console.log(`DB connection sucessfully!`);
}

module.exports = connectDB;