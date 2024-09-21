import { Request, Response } from "express";
import { TakeFavoriteServices } from "../../services/TakeFavoriteServices/TakeFavoriteServices";

export class TakeFavoriteController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const service = new TakeFavoriteServices();
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
}
