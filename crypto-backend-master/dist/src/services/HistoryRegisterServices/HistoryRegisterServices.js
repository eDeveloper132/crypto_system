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
exports.HistoryRegisterServices = void 0;
const post_1 = require("../../../Schema/post"); // Adjust the import based on your directory structure
class HistoryRegisterServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            // Clear existing history
            yield post_1.History.deleteMany();
            // Create new history records
            const createMany = yield post_1.History.insertMany(data.map((element) => ({
                coinsId: element.id,
                date: element.last_updated,
                circulating_supply: element.circulating_supply,
                total_supply: element.total_supply,
                max_supply: element.max_supply,
                price: element.quote.USD.price,
                valume_24h: element.quote.USD.volume_24h,
                volume_change_24h: element.quote.USD.volume_change_24h,
                percent_change_1h: element.quote.USD.percent_change_1h,
                percent_change_24h: element.quote.USD.percent_change_24h,
                percent_change_7d: element.quote.USD.percent_change_7d,
                percent_change_30d: element.quote.USD.percent_change_30d,
                percent_change_60d: element.quote.USD.percent_change_60d,
                percent_change_90d: element.quote.USD.percent_change_90d,
                market_cap: element.quote.USD.market_cap,
                market_cap_dominance: element.quote.USD.market_cap_dominance,
            })));
            if (createMany.length > 0) {
                console.log("Records successfully created.");
            }
        });
    }
}
exports.HistoryRegisterServices = HistoryRegisterServices;
//# sourceMappingURL=HistoryRegisterServices.js.map