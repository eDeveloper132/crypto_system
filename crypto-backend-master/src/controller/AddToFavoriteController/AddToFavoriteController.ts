import { Request, Response } from "express";
import { AddToFavoriteServices } from "../../services/AddToFavoriteServices/AddToFavoriteServices";

export class AddToFavoriteController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const { id_coin } = req.body;

    if (!id_coin) {
      return res.status(400).json({ error: "Coin ID is required" });
    }

    try {
      const services = new AddToFavoriteServices();
      const result = await services.execute({ user_id, id_coin });

      res.status(201).json({ message: "Coin added to favorites", result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
