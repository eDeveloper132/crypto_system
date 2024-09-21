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
exports.AddToFavoriteServices = void 0;
const post_1 = require("../../../Schema/post"); // Adjust the import based on your directory structure
class AddToFavoriteServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, id_coin }) {
            try {
                // Find the coin and add to favorite
                const coin = yield post_1.Coins.findById(id_coin);
                if (!coin) {
                    throw new Error("Coin not found");
                }
                // Assuming a Favorite can have multiple coins and a user
                const favorite = yield post_1.Favorite.findOneAndUpdate({ user: user_id }, { $addToSet: { coins: coin._id } }, // Adds the coin ID to the favorites array
                { new: true, upsert: true } // Create a new favorite if it doesn't exist
                );
                return favorite;
            }
            catch (e) {
                throw new Error("Oops, something went wrong");
            }
        });
    }
}
exports.AddToFavoriteServices = AddToFavoriteServices;
//# sourceMappingURL=AddToFavoriteServices.js.map