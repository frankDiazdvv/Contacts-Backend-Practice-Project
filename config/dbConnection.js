const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected! Host:", connect.connection.host, " Connection Name:", connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;

// Minute 41 LAST OFF