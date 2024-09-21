"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _post = require('../../../Schema/post'); // Adjust the import based on your directory structure








 class UserServices {
  async execute({ username, password, email, name }) {
    // Create a new user
    const newUser = new (0, _post.User)({
      username,
      password, // Consider hashing the password before saving
      name,
      email,
    });

    // Save the user to the database
    const createdUser = await newUser.save();

    // Create a new favorite associated with the user
    const favorite = new (0, _post.Favorite)({
      user: createdUser._id, // Reference to the newly created user
      coins: ["61e9977a526da74e89d17df9"], // Array of coin IDs
    });

    await favorite.save();

    return createdUser;
  }
} exports.default = UserServices;
