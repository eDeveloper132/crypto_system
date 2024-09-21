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
exports.TakeCoinSpecificServices = void 0;
const post_1 = require("../../../Schema/post"); // Adjust the import path based on your directory structure
class TakeCoinSpecificServices {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const coin = yield post_1.Coins.findOne({ id_coin: id }) // Find the coin by id_coin
                .populate({
                path: 'history', // Populate the history field
                options: {
                    sort: { date: -1 }, // Sort history by date in descending order
                },
            });
            if (coin) {
                return coin;
            }
            else {
                throw new Error("Coin does not exist");
            }
        });
    }
}
exports.TakeCoinSpecificServices = TakeCoinSpecificServices;
//# sourceMappingURL=TakeCoinSpecificServices.js.map