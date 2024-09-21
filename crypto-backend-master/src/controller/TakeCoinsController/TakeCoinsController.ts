import { Request, Response } from "express";
import { TakeCoinsServices } from "../../services/TakeCoinsServices/TakeCoinsServices";

interface QueryProps {
  start: number;
}

export class TakeCoinsController {
  async handle(req: Request<{}, {}, {}, QueryProps>, res: Response) {
    const { start } = req.query;

    // Validate the start parameter
    if (typeof start !== "number" || start < 0) {
      return res.status(400).json({ error: "Invalid start parameter" });
    }

    try {
      const services = new TakeCoinsServices();
      const result = await services.execute(start);

      return res.json(result);
    } catch (e) {
      console.error(e); // Log the error for debugging
      return res.status(500).json({ error: "Failed to retrieve coins" });
    }
  }
}
