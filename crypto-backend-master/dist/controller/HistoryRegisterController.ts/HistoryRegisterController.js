"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);

var _HistoryRegisterServices = require('../../services/HistoryRegisterServices/HistoryRegisterServices');

 class HistoryRegisterController {
  async handle(req, res) {
    const { key } = req.query;

    if (key !== process.env.KEY) {
      return res.status(401).json({ error: "Not allowed" });
    }

    try {
      // Validate environment variable
      if (!process.env.CRIPTO_KEY) {
        return res.status(500).json({ error: "API key not configured" });
      }

      // Fetching the latest cryptocurrency updates
      const fetchHistoryData = async (start, limit) => {
        const { data } = await _axios2.default.get(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
          {
            params: { start: start.toString(), limit: limit.toString() },
            headers: {
              "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
            },
          }
        );
        return data.data;
      };

      const history1 = await fetchHistoryData(1, 4998);
      const history2 = await fetchHistoryData(4999, 5000);

      const newHistory = [...history1, ...history2];

      const service = new (0, _HistoryRegisterServices.HistoryRegisterServices)();
      // Sending the array for processing
      await service.execute({ data: newHistory });

      res.json({ register: true });
    } catch (e) {
      // Handle errors and respond appropriately
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
} exports.HistoryRegisterController = HistoryRegisterController;
