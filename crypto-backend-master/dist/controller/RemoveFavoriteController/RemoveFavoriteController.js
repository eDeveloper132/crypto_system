"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _RemoveFavoriteServices = require('../../services/RemoveFavoriteServices/RemoveFavoriteServices');

 class RemoveFavoriteController {
  async handle(req, res) {
    const { user_id } = req;
    const { id_coin } = req.body;

    // Input validation
    if (!id_coin) {
      return res.status(400).json({ error: "Coin ID is required" });
    }

    try {
      const services = new (0, _RemoveFavoriteServices.RemoveFavoriteServices)();
      const result = await services.execute({ user_id, id_coin });

      return res.status(200).json(result);
    } catch (e) {
      console.error(e); // Log the error for debugging
      return res.status(500).json({ error: "Failed to remove favorite" });
    }
  }
} exports.RemoveFavoriteController = RemoveFavoriteController;
