"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = exports.Coins = exports.Favorite = exports.AlertData = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// User Schema
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String },
    created_at: { type: Date, default: Date.now },
    favorite: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Favorite' }
}, { collection: 'users' });
// AlertData Schema
const alertDataSchema = new mongoose_1.Schema({
    price: { type: String, required: true },
    date_sent: { type: String },
    valume_24h: { type: String, required: true },
    coinsId: { type: Number, unique: true, required: true },
    coins: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Coins' }
}, { collection: 'alert_data' });
// Favorite Schema
const favoriteSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    coins: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Coins' }]
}, { collection: 'favorite' });
// Coins Schema
const coinsSchema = new mongoose_1.Schema({
    id_coin: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    symbol: { type: String, unique: true, required: true },
    rank: { type: Number, required: true },
    history: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'History' }],
    alert_data: { type: mongoose_1.Schema.Types.ObjectId, ref: 'AlertData' },
    favoriteId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Favorite' }
}, { collection: 'coins' });
// History Schema
const historySchema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    valume_24h: { type: Number, required: true },
    volume_change_24h: { type: Number, required: true },
    percent_change_1h: { type: Number, required: true },
    percent_change_24h: { type: Number, required: true },
    percent_change_7d: { type: Number, required: true },
    percent_change_30d: { type: Number, required: true },
    percent_change_60d: { type: Number, required: true },
    percent_change_90d: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    market_cap_dominance: { type: Number, required: true },
    date: { type: Date, required: true },
    circulating_supply: { type: Number, required: true },
    total_supply: { type: Number, required: true },
    max_supply: { type: Number },
    coinsId: { type: Number, required: true },
    coins: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Coins' }
}, { collection: 'history' });
// Registering models
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const AlertData = mongoose_1.default.model('AlertData', alertDataSchema);
exports.AlertData = AlertData;
const Favorite = mongoose_1.default.model('Favorite', favoriteSchema);
exports.Favorite = Favorite;
const Coins = mongoose_1.default.model('Coins', coinsSchema);
exports.Coins = Coins;
const History = mongoose_1.default.model('History', historySchema);
exports.History = History;
//# sourceMappingURL=post.js.map