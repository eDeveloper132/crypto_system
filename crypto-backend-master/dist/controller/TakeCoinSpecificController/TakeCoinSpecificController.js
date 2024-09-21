"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _TakeCoinSpecificServices = require('../../services/TakeCoinSpecificServices/TakeCoinSpecificServices');

 class TakeCoinSpecificController {
  async handle(req, res) {
    const { id: idString } = req.params;

    const id = Number(idString);

    // Validate the id parameter
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid coin ID" });
    }

    try {
      const service = new (0, _TakeCoinSpecificServices.TakeCoinSpecificServices)();
      const coin = await service.execute(id);
      return res.json(coin);
    } catch (e) {
      // Log the error for debugging
      console.error(e);
      return res.status(404).json({ error: "Coin not found" });
    }
  }
} exports.TakeCoinSpecificController = TakeCoinSpecificController;
