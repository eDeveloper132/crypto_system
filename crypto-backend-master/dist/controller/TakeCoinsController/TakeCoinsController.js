"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _TakeCoinsServices = require('../../services/TakeCoinsServices/TakeCoinsServices');





 class TakeCoinsController {
  async handle(req, res) {
    const { start } = req.query;

    // Validate the start parameter
    if (typeof start !== "number" || start < 0) {
      return res.status(400).json({ error: "Invalid start parameter" });
    }

    try {
      const services = new (0, _TakeCoinsServices.TakeCoinsServices)();
      const result = await services.execute(start);

      return res.json(result);
    } catch (e) {
      console.error(e); // Log the error for debugging
      return res.status(500).json({ error: "Failed to retrieve coins" });
    }
  }
} exports.TakeCoinsController = TakeCoinsController;
