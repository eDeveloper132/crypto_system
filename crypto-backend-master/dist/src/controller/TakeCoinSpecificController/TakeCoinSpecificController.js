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
exports.TakeCoinSpecificController = void 0;
const TakeCoinSpecificServices_1 = require("../../services/TakeCoinSpecificServices/TakeCoinSpecificServices");
class TakeCoinSpecificController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: idString } = req.params;
            const id = Number(idString);
            // Validate the id parameter
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ error: "Invalid coin ID" });
            }
            try {
                const service = new TakeCoinSpecificServices_1.TakeCoinSpecificServices();
                const coin = yield service.execute(id);
                return res.json(coin);
            }
            catch (e) {
                // Log the error for debugging
                console.error(e);
                return res.status(404).json({ error: "Coin not found" });
            }
        });
    }
}
exports.TakeCoinSpecificController = TakeCoinSpecificController;
//# sourceMappingURL=TakeCoinSpecificController.js.map