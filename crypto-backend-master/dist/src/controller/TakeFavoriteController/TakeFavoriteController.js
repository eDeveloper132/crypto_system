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
exports.TakeFavoriteController = void 0;
const TakeFavoriteServices_1 = require("../../services/TakeFavoriteServices/TakeFavoriteServices");
class TakeFavoriteController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = request;
            try {
                const service = new TakeFavoriteServices_1.TakeFavoriteServices();
                const result = yield service.execute({ user_id });
                if (!result) {
                    return response.status(404).json({ error: "No favorites found for this user." });
                }
                return response.json(result);
            }
            catch (e) {
                // Log the error for debugging
                console.error(e);
                return response.status(500).json({ error: "Internal server error." });
            }
        });
    }
}
exports.TakeFavoriteController = TakeFavoriteController;
//# sourceMappingURL=TakeFavoriteController.js.map