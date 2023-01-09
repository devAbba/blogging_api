const mongoose = require('mongoose');
const logger = require('../logging/logger')


module.exports = (url) => {
    mongoose.connect(url || 'mongodb://localhost:27017');

    mongoose.connection.on("connected", () => {
        console.log("successfully connected to database");
        logger.info("connected to mongodb")
    });

    mongoose.connection.on("error", (error) => {
        console.log("There was a problem connecting to mongoDB");
        console.log(error);
        logger.error(error)
    });
}
