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
exports.TakeCoinsController = void 0;
const TakeCoinsServices_1 = require("../../services/TakeCoinsServices/TakeCoinsServices");
class TakeCoinsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start } = req.query;
            // Validate the start parameter
            if (typeof start !== "number" || start < 0) {
                return res.status(400).json({ error: "Invalid start parameter" });
            }
            try {
                const services = new TakeCoinsServices_1.TakeCoinsServices();
                const result = yield services.execute(start);
                return res.json(result);
            }
            catch (e) {
                console.error(e); // Log the error for debugging
                return res.status(500).json({ error: "Failed to retrieve coins" });
            }
        });
    }
}
exports.TakeCoinsController = TakeCoinsController;
//# sourceMappingURL=TakeCoinsController.js.map