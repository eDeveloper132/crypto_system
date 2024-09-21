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
exports.RegisterCoinServices = void 0;
const post_1 = require("../../../Schema/post"); // Adjust the import based on your directory structure
class RegisterCoinServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            try {
                // Create multiple coins
                const response = yield post_1.Coins.insertMany(data.map((element) => ({
                    name: element.name,
                    id_coin: element.id,
                    symbol: element.symbol,
                    rank: element.rank,
                })));
                if (response.length > 0) {
                    console.log("Coins successfully registered.");
                }
                return { success: true };
            }
            catch (error) {
                console.error("Error registering coins:", error);
                throw new Error("Failed to register coins.");
            }
        });
    }
}
exports.RegisterCoinServices = RegisterCoinServices;
//# sourceMappingURL=RegisterCoinServices.js.map