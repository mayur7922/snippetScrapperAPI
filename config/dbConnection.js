const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnection = async () => {
    try{
        const connect = await mongoose.connect(process.env.URL);

        const db = mongoose.connection;

        db.on('connected', () => {
            console.log('Mongoose connected to the database');
        });
    }
    catch(err){
        console.log(err);
    }
};

module.exports = dbConnection;