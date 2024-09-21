"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _AuthenticatedUserServices = require('../../services/AuthenticatedUserServices/AuthenticatedUserServices');

 class AuthenticatedUserController {
  async handle(request, response) {
    const { username, password } = request.body;

    // Input validation
    if (!username || !password) {
      return response.status(400).json({ error: "Username and password are required" });
    }

    try {
      const services = new (0, _AuthenticatedUserServices.AuthenticatedUserServices)();
      const result = await services.execute({ username, password });

      return response.json({ token: result.token });
    } catch (e) {
      return response.status(401).json({ error: e.message });
    }
  }
} exports.AuthenticatedUserController = AuthenticatedUserController;
