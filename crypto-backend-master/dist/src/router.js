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
exports.router = void 0;
const express_1 = require("express");
const HistoryRegisterController_1 = require("./controller/HistoryRegisterController.ts/HistoryRegisterController");
const RegisterCoinController_1 = require("./controller/RegisterCoinController/RegisterCoinController");
const TakeCoinsController_1 = require("./controller/TakeCoinsController/TakeCoinsController");
const TakeCoinsFilterController_1 = require("./controller/TakeCoinsFilterController/TakeCoinsFilterController");
const TakeCoinSpecificController_1 = require("./controller/TakeCoinSpecificController/TakeCoinSpecificController");
const CreateUserController_1 = require("./controller/CreateUserController/CreateUserController");
const AuthenticatedUserController_1 = require("./controller/AuthenticatedUserController/AuthenticatedUserController");
const TakeFavoriteController_1 = require("./controller/TakeFavoriteController/TakeFavoriteController");
const AddToFavoriteController_1 = require("./controller/AddToFavoriteController/AddToFavoriteController");
const RemoveFavoriteController_1 = require("./controller/RemoveFavoriteController/RemoveFavoriteController");
const post_1 = require("../Schema/post"); // Adjust the path as needed
const router = (0, express_1.Router)();
exports.router = router;
router.post('/alertform', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, valume_24h, coinsId } = req.body;
    if (!price || !coinsId) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    console.log({ price, valume_24h, coinsId });
    try {
        const newAlertData = yield post_1.AlertData.findOneAndUpdate({ coins: coinsId }, // Assuming coins is an ObjectId
        { price, valume_24h }, { new: true, upsert: true } // Create if it doesn't exist
        );
        res.status(201).json(newAlertData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
// Other routes remain unchanged
router.post("/register/coin", new RegisterCoinController_1.RegisterCoinController().handle);
router.get("/coin/take/all", new TakeCoinsController_1.TakeCoinsController().handle);
router.get("/new/history", new HistoryRegisterController_1.HistoryRegisterController().handle);
router.get("/coin/take/:id", new TakeCoinSpecificController_1.TakeCoinSpecificController().handle);
router.get("/coin/filter/front", new TakeCoinsFilterController_1.TakeCoinsFilterController().handle);
router.post("/create/user", new CreateUserController_1.CreateUserController().handle);
router.post("/authenticated/user", new AuthenticatedUserController_1.AuthenticatedUserController().handle);
router.post("/addtofavorite", new AddToFavoriteController_1.AddToFavoriteController().handle);
router.get("/favorite/user", new TakeFavoriteController_1.TakeFavoriteController().handle);
router.post("/removefavorite", new RemoveFavoriteController_1.RemoveFavoriteController().handle);
//# sourceMappingURL=router.js.map