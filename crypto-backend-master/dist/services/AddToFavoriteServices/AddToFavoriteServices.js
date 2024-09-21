"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _post = require('../../../Schema/post'); // Adjust the import based on your directory structure






 class AddToFavoriteServices {
  async execute({ user_id, id_coin }) {
    try {
      // Find the coin and add to favorite
      const coin = await _post.Coins.findById(id_coin);
      if (!coin) {
        throw new Error("Coin not found");
      }

      // Assuming a Favorite can have multiple coins and a user
      const favorite = await _post.Favorite.findOneAndUpdate(
        { user: user_id },
        { $addToSet: { coins: coin._id } }, // Adds the coin ID to the favorites array
        { new: true, upsert: true } // Create a new favorite if it doesn't exist
      );

      return favorite;
    } catch (e) {
      throw new Error("Oops, something went wrong");
    }
  }
} exports.AddToFavoriteServices = AddToFavoriteServices;
