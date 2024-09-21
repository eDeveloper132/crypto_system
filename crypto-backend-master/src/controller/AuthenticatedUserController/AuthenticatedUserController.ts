import { Request, Response } from "express";
import { AuthenticatedUserServices } from "../../services/AuthenticatedUserServices/AuthenticatedUserServices";

export class AuthenticatedUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    // Input validation
    if (!username || !password) {
      return response.status(400).json({ error: "Username and password are required" });
    }

    try {
      const services = new AuthenticatedUserServices();
      const result = await services.execute({ username, password });

      return response.json({ token: result.token });
    } catch (e) {
      return response.status(401).json({ error: e.message });
    }
  }
}
