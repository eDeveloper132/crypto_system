import { Request, Response } from "express";
import TakeCoinsFilterServices from "../../services/TakeCoinsFilterServices/TakeCoinsFilterServices";

export class TakeCoinsFilterController {
  async handle(req: Request, res: Response) {
    const { start } = req.query;

    // Validate the start parameter
    const startNumber = Number(start);
    if (isNaN(startNumber) || startNumber < 0) {
      return res.status(400).json({ error: "Invalid start parameter" });
    }

    try {
      const service = new TakeCoinsFilterServices();
      const result = await service.execute(startNumber);
      return res.json(result);
    } catch (e) {
      console.error(e); // Log the error for debugging
      return res.status(500).json({ error: "Failed to retrieve coins" });
    }
  }
}
