"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _post = require('../../../Schema/post'); // Adjust the import based on your directory structure












 class RegisterCoinServices {
  async execute({ data }) {
    try {
      // Create multiple coins
      const response = await _post.Coins.insertMany(
        data.map((element) => ({
          name: element.name,
          id_coin: element.id,
          symbol: element.symbol,
          rank: element.rank,
        }))
      );

      if (response.length > 0) {
        console.log("Coins successfully registered.");
      }

      return { success: true };
    } catch (error) {
      console.error("Error registering coins:", error);
      throw new Error("Failed to register coins.");
    }
  }
} exports.RegisterCoinServices = RegisterCoinServices;
