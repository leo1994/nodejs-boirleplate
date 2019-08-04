require("dotenv").config();

const helmet = require("helmet");
const express = require("express");
const bodyparser = require("body-parser");

const app = express();

/**
 * Parse incoming request bodies in a middleware before your handlers,
 * available under the req.body property.
 *
 * bodyparser.json()
 * Content-Type: application/json
 *
 * bodyparser.urlencoded({ extended: true })
 * Content-Type: application/x-www-form-urlencoded and the extended option
 * allows parsing the URL-encoded data with the qs library
 */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

/**
 * Help secure Express apps with various HTTP headers
 */
app.use(helmet());

module.exports = app;
