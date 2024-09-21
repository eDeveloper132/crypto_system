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
exports.RegisterCoinController = void 0;
const axios_1 = __importDefault(require("axios"));
const RegisterCoinServices_1 = require("../../services/RegisterCoinServices/RegisterCoinServices");
class RegisterCoinController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.CRIPTO_KEY) {
                return res.status(500).json({ error: "API key not configured" });
            }
            try {
                // Fetching the list of coins
                const { data } = yield axios_1.default.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map", {
                    headers: {
                        "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
                    },
                });
                const services = new RegisterCoinServices_1.RegisterCoinServices();
                yield services.execute({ data: data.data });
                return res.status(201).json({ create: true });
            }
            catch (e) {
                console.error(e);
                return res.status(500).json({ error: "Não cadastrado" });
            }
        });
    }
}
exports.RegisterCoinController = RegisterCoinController;
//# sourceMappingURL=RegisterCoinController.js.map