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
exports.TakeFavoriteServices = void 0;
const post_1 = require("../../../Schema/post"); // Adjust the import path based on your directory structure
class TakeFavoriteServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            const result = yield post_1.User.findById(user_id)
                .populate({
                path: 'favorite', // Adjust based on your Favorite model field
                populate: {
                    path: 'coins', // Populate the coins field
                    populate: {
                        path: 'history', // Populate the history field
                        options: {
                            sort: { date: -1 }, // Sort history by date in descending order
                            limit: 1, // Limit to the most recent history entry
                        },
                    },
                },
            });
            if (!result) {
                throw new Error("Internal error, user not found");
            }
            return result;
        });
    }
}
exports.TakeFavoriteServices = TakeFavoriteServices;
//# sourceMappingURL=TakeFavoriteServices.js.map