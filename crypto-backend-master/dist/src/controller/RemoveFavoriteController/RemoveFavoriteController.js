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
exports.RemoveFavoriteController = void 0;
const RemoveFavoriteServices_1 = require("../../services/RemoveFavoriteServices/RemoveFavoriteServices");
class RemoveFavoriteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req;
            const { id_coin } = req.body;
            // Input validation
            if (!id_coin) {
                return res.status(400).json({ error: "Coin ID is required" });
            }
            try {
                const services = new RemoveFavoriteServices_1.RemoveFavoriteServices();
                const result = yield services.execute({ user_id, id_coin });
                return res.status(200).json(result);
            }
            catch (e) {
                console.error(e); // Log the error for debugging
                return res.status(500).json({ error: "Failed to remove favorite" });
            }
        });
    }
}
exports.RemoveFavoriteController = RemoveFavoriteController;
//# sourceMappingURL=RemoveFavoriteController.js.map