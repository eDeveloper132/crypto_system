"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _CreateUserServices = require('../../services/CreateUserServices/CreateUserServices'); var _CreateUserServices2 = _interopRequireDefault(_CreateUserServices);

 class CreateUserController {
  async handle(req, res) {
    const { username, password, email, name } = req.body;

    // Input validation
    if (!username || !password || !name) {
      return res.status(400).json({ error: "Username, password, and name are required" });
    }

    try {
      const service = new (0, _CreateUserServices2.default)();
      const result = await service.execute({ username, password, email, name });

      res.status(201).json({ user: result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
} exports.CreateUserController = CreateUserController;
