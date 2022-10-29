const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.DB_URL;

module.exports = () => {
    mongoose.connect(URL);

    mongoose.connection.on("connected", () => {
        console.log("successfully connected to database");
    })

    mongoose.connection.on("error", (error) => {
        console.log("There was a problem connecting to mongoDB");
        console.log(error);
    })
}
