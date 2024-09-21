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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeCoinsFilterController = void 0;
const TakeCoinsFilterServices_1 = __importDefault(require("../../services/TakeCoinsFilterServices/TakeCoinsFilterServices"));
class TakeCoinsFilterController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start } = req.query;
            // Validate the start parameter
            const startNumber = Number(start);
            if (isNaN(startNumber) || startNumber < 0) {
                return res.status(400).json({ error: "Invalid start parameter" });
            }
            try {
                const service = new TakeCoinsFilterServices_1.default();
                const result = yield service.execute(startNumber);
                return res.json(result);
            }
            catch (e) {
                console.error(e); // Log the error for debugging
                return res.status(500).json({ error: "Failed to retrieve coins" });
            }
        });
    }
}
exports.TakeCoinsFilterController = TakeCoinsFilterController;
//# sourceMappingURL=TakeCoinsFilterController.js.map