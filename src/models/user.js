const { Schema, ...mongoose } = require("mongoose");
const mongooseHidden = require("mongoose-hidden");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");

const saltRounds = 10;

/**
 * Define SCHEMA
 */
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 7
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

/**
 * Example VIRTUALS
 */
userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * Ref: https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
 */
userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jsonwebtoken.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

userSchema.plugin(mongooseHidden, { hidden: { password: true } });

module.exports = mongoose.model("user", userSchema);
