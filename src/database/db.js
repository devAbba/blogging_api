const mongoose = require('mongoose');


module.exports = (url) => {
    mongoose.connect(url || 'mongodb://localhost:27017');

    mongoose.connection.on("connected", () => {
        console.log("successfully connected to database");
    });

    mongoose.connection.on("error", (error) => {
        console.log("There was a problem connecting to mongoDB");
        console.log(error);
    });
}
