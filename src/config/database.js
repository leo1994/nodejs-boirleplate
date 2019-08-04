/**
 * Build mongodb URL to connect
 */

let dbName = process.env.DB_NAME || "default";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "27017";

if (process.env.NODE_ENV !== "production") dbName += process.env.NODE_ENV;

/**
 * Verify if auth is set
 */
if (process.env.DB_USER && process.env.DB_PASS) {
  module.exports = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${dbHost}:${dbPort}/${dbName}`;
} else {
  module.exports = `mongodb://${dbHost}:${dbPort}/${dbName}`;
}
