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
class UserServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, email, name }) {
            // Create a new user
            const newUser = new post_1.User({
                username,
                password, // Consider hashing the password before saving
                name,
                email,
            });
            // Save the user to the database
            const createdUser = yield newUser.save();
            // Create a new favorite associated with the user
            const favorite = new post_1.Favorite({
                user: createdUser._id, // Reference to the newly created user
                coins: ["61e9977a526da74e89d17df9"], // Array of coin IDs
            });
            yield favorite.save();
            return createdUser;
        });
    }
}
exports.default = UserServices;
//# sourceMappingURL=CreateUserServices.js.map