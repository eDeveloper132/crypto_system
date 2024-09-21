"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _post = require('../../../Schema/post'); // Adjust the import path based on your directory structure





 class TakeFavoriteServices {
  async execute({ user_id }) {
    const result = await _post.User.findById(user_id)
      .populate({
        path: 'favorite', // Adjust based on your Favorite model field
        populate: {
          path: 'coins', // Populate the coins field
          populate: {
            path: 'history', // Populate the history field
            options: {
              sort: { date: -1 }, // Sort history by date in descending order
              limit: 1, // Limit to the most recent history entry
            },
          },
        },
      });

    if (!result) {
      throw new Error("Internal error, user not found");
    }

    return result;
  }
} exports.TakeFavoriteServices = TakeFavoriteServices;
