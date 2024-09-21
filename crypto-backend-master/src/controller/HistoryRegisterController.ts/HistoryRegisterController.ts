import axios from "axios";
import { Request, Response } from "express";
import { ExecuteProps, HistoryRegisterServices } from "../../services/HistoryRegisterServices/HistoryRegisterServices";

export class HistoryRegisterController {
  async handle(req: Request, res: Response) {
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
      const fetchHistoryData = async (start: number, limit: number) => {
        const { data } = await axios.get<ExecuteProps>(
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

      const history1 = await fetchHistoryData(1, 999);
      // const history2 = await fetchHistoryData(4999, 5000);

      const newHistory = [...history1];

      const service = new HistoryRegisterServices();
      // Sending the array for processing
      await service.execute({ data: newHistory });

      res.json({ register: true });
    } catch (e) {
      // Handle errors and respond appropriately
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
}
