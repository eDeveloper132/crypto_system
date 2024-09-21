"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);

var _RegisterCoinServices = require('../../services/RegisterCoinServices/RegisterCoinServices');

 class RegisterCoinController {
  async handle(req, res) {
    if (!process.env.CRIPTO_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    try {
      // Fetching the list of coins
      const { data } = await _axios2.default.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
          },
        }
      );

      const services = new (0, _RegisterCoinServices.RegisterCoinServices)();
      await services.execute({ data: data.data });

      return res.status(201).json({ create: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Não cadastrado" });
    }
  }
} exports.RegisterCoinController = RegisterCoinController;
