"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUserController = void 0;
const AuthenticatedUserServices_1 = require("../../services/AuthenticatedUserServices/AuthenticatedUserServices");
class AuthenticatedUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = request.body;
            // Input validation
            if (!username || !password) {
                return response.status(400).json({ error: "Username and password are required" });
            }
            try {
                const services = new AuthenticatedUserServices_1.AuthenticatedUserServices();
                const result = yield services.execute({ username, password });
                return response.json({ token: result.token });
            }
            catch (e) {
                return response.status(401).json({ error: e.message });
            }
        });
    }
}
exports.AuthenticatedUserController = AuthenticatedUserController;
//# sourceMappingURL=AuthenticatedUserController.js.map