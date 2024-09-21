"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _TakeFavoriteServices = require('../../services/TakeFavoriteServices/TakeFavoriteServices');

 class TakeFavoriteController {
  async handle(request, response) {
    const { user_id } = request;

    try {
      const service = new (0, _TakeFavoriteServices.TakeFavoriteServices)();
      const result = await service.execute({ user_id });

      if (!result) {
        return response.status(404).json({ error: "No favorites found for this user." });
      }

      return response.json(result);
    } catch (e) {
      // Log the error for debugging
      console.error(e);
      return response.status(500).json({ error: "Internal server error." });
    }
  }
} exports.TakeFavoriteController = TakeFavoriteController;
