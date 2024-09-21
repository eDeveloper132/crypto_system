"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _post = require('../../../Schema/post'); // Adjust the import based on your directory structure
var _jsonwebtoken = require('jsonwebtoken');






 class AuthenticatedUserServices {
  async execute({ username, password }) {
    // Find user
    const user = await _post.User.findOne({
      username,
    });

    if (!user) {
      throw new Error("Username or password incorrectly!");
    }

    // Here you should ideally use a hashed password check
    if (user.password !== password) {
      console.log("Password invalid");
      throw new Error("Username or password incorrectly!");
    }

    const token = _jsonwebtoken.sign.call(void 0, 
      {
        user: {
          name: user.name,
          email: user.email,
          id: user._id.toString(), // Ensure you use _id for Mongoose
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user._id.toString(),
        expiresIn: "1d",
      }
    );

    return { token };
  }
} exports.AuthenticatedUserServices = AuthenticatedUserServices;
