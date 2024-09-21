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
const post_1 = require("../../../Schema/post"); // Adjust the import based on your directory structure
class TakeCoinsFilterServices {
    execute(start) {
        return __awaiter(this, void 0, void 0, function* () {
            const numberStart = start * 50; // Assuming each page shows 50 coins
            const numberTake = 50; // Adjusting to take only 50 coins per request
            const result = yield post_1.Coins.find({})
                .sort({ name: 1 }) // Sort by name in ascending order
                .skip(numberStart) // Skip the number of coins based on the start parameter
                .limit(numberTake) // Limit the number of results
                .populate({
                path: 'history',
                options: {
                    sort: { date: -1 }, // Sort history by date in descending order
                    limit: 1, // Take only the latest history entry
                },
            })
                .populate('alert_data'); // Populate alert_data
            return { filter: result };
        });
    }
}
exports.default = TakeCoinsFilterServices;
//# sourceMappingURL=TakeCoinsFilterServices.js.map