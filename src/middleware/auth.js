const jsonwebtoken = require("jsonwebtoken");
const { User } = require("./../models");

/**
 * Ref: https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
 */
const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jsonwebtoken.verify(token, process.env.JWT_KEY);
  try {
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      res.status(404).send({ error: "User not found" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
