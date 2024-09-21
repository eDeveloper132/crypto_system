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
exports.AuthenticatedUserServices = void 0;
const post_1 = require("../../../Schema/post"); // Adjust the import based on your directory structure
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthenticatedUserServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password }) {
            // Find user
            const user = yield post_1.User.findOne({
                username,
            });
            if (!user) {
                throw new Error("Username or password incorrectly!");
            }
            // Here you should ideally use a hashed password check
            if (user.password !== password) {
                console.log("Password invalid");
                throw new Error("Username or password incorrectly!");
            }
            const token = (0, jsonwebtoken_1.sign)({
                user: {
                    name: user.name,
                    email: user.email,
                    id: user._id.toString(), // Ensure you use _id for Mongoose
                },
            }, process.env.JWT_SECRET, {
                subject: user._id.toString(),
                expiresIn: "1d",
            });
            return { token };
        });
    }
}
exports.AuthenticatedUserServices = AuthenticatedUserServices;
//# sourceMappingURL=AuthenticatedUserServices.js.map