import axios from "axios";
import { Request, Response } from "express";
import { RegisterCoinServices } from "../../services/RegisterCoinServices/RegisterCoinServices";

export class RegisterCoinController {
  async handle(req: Request, res: Response) {
    if (!process.env.CRIPTO_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    try {
      // Fetching the list of coins
      const { data } = await axios.get<{ data: any[] }>(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
          },
        }
      );

      const services = new RegisterCoinServices();
      await services.execute({ data: data.data });

      return res.status(201).json({ create: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Não cadastrado" });
    }
  }
}
