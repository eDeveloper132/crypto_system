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
exports.RemoveFavoriteServices = void 0;
const post_1 = require("../../../Schema/post"); // Adjust the import based on your directory structure
class RemoveFavoriteServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, id_coin }) {
            try {
                // Remove the coin from the user's favorites
                const result = yield post_1.Favorite.findOneAndUpdate({ user: user_id }, // Find the user's favorite document
                { $pull: { coins: id_coin } }, // Remove the specific coin from the array
                { new: true } // Return the updated document
                );
                // Optionally, if you want to clear favoriteId in the Coins collection
                yield post_1.Coins.updateOne({ id_coin }, // Assuming id_coin is unique
                { $set: { favoriteId: null } } // Clear favoriteId
                );
                return result; // Return the updated favorite document
            }
            catch (error) {
                console.error("Error removing favorite:", error);
                throw new Error("Oops, something went wrong");
            }
        });
    }
}
exports.RemoveFavoriteServices = RemoveFavoriteServices;
//# sourceMappingURL=RemoveFavoriteServices.js.map