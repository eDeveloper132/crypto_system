"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _TakeCoinsFilterServices = require('../../services/TakeCoinsFilterServices/TakeCoinsFilterServices'); var _TakeCoinsFilterServices2 = _interopRequireDefault(_TakeCoinsFilterServices);

 class TakeCoinsFilterController {
  async handle(req, res) {
    const { start } = req.query;

    // Validate the start parameter
    const startNumber = Number(start);
    if (isNaN(startNumber) || startNumber < 0) {
      return res.status(400).json({ error: "Invalid start parameter" });
    }

    try {
      const service = new (0, _TakeCoinsFilterServices2.default)();
      const result = await service.execute(startNumber);
      return res.json(result);
    } catch (e) {
      console.error(e); // Log the error for debugging
      return res.status(500).json({ error: "Failed to retrieve coins" });
    }
  }
} exports.TakeCoinsFilterController = TakeCoinsFilterController;
