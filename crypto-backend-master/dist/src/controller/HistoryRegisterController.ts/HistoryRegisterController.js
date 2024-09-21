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
exports.HistoryRegisterController = void 0;
const axios_1 = __importDefault(require("axios"));
const HistoryRegisterServices_1 = require("../../services/HistoryRegisterServices/HistoryRegisterServices");
class HistoryRegisterController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key } = req.query;
            if (key !== process.env.KEY) {
                return res.status(401).json({ error: "Not allowed" });
            }
            try {
                // Validate environment variable
                if (!process.env.CRIPTO_KEY) {
                    return res.status(500).json({ error: "API key not configured" });
                }
                // Fetching the latest cryptocurrency updates
                const fetchHistoryData = (start, limit) => __awaiter(this, void 0, void 0, function* () {
                    const { data } = yield axios_1.default.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
                        params: { start: start.toString(), limit: limit.toString() },
                        headers: {
                            "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
                        },
                    });
                    return data.data;
                });
                const history1 = yield fetchHistoryData(1, 4998);
                const history2 = yield fetchHistoryData(4999, 5000);
                const newHistory = [...history1, ...history2];
                const service = new HistoryRegisterServices_1.HistoryRegisterServices();
                // Sending the array for processing
                yield service.execute({ data: newHistory });
                res.json({ register: true });
            }
            catch (e) {
                // Handle errors and respond appropriately
                console.error(e);
                res.status(500).json({ error: e.message });
            }
        });
    }
}
exports.HistoryRegisterController = HistoryRegisterController;
//# sourceMappingURL=HistoryRegisterController.js.map