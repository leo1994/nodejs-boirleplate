const mongoose = require("mongoose");

const databaseUrl = require("../config/database");

/**
 * Function to connect mongodb
 */
module.exports = async () => {
  try {
    /**
     * Connect to mongodb usign mongoose
     *
     * useNewUrlParser: The MongoDB Node.js driver rewrote the tool it uses to parse MongoDB connection strings.
     * Because this is such a big change, they put the new connection string parser behind a flag.
     *
     * useCreateIndex; When your application starts up, Mongoose automatically calls
     * createIndex for each defined index in your schema.
     *
     * autoIndex: Mongoose will call createIndex for each index sequentially,
     * and emit an 'index' event on the model when all the createIndex calls succeeded or when there was an error.
     * While nice for development, it is recommended this behavior be disabled in production
     * since index creation can cause a significant performance impact.
     * Disable the behavior by setting the autoIndex option of your schema to false,
     * or globally on the connection by setting the option autoIndex to false.
     */

    const autoIndex = process.env.NODE_APP === "production";

    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex
    });

    /**
     * Throw error when unable to connect to database database
     */
    mongoose.connection.on("error", () => {
      throw new Error(`unable to connect to database: ${databaseUrl}`);
    });

    /**
     * Close connection terminal interrupt
     */
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });

    return mongoose;
  } catch (error) {
    throw new Error(error);
  }
};
