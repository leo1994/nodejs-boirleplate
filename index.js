const morgan = require("morgan");

const app = require("./src/app");

if (process.env.NODE_ENV !== "production") app.use(morgan("combined"));

app.listen(process.env.APP_PORT || 3000);
