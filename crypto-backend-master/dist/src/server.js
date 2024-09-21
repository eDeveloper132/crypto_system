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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
const axios_1 = __importDefault(require("axios"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../DB/db"));
const post_1 = require("../Schema/post"); // Adjust the path as necessary
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ limit: "460mb", extended: true }));
app.use(express_1.default.json({ limit: "460mb" }));
(0, db_1.default)();
app.use(router_1.router);
// Mongoose connection
mongoose_1.default.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Welcome To CryptoLab!');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${port}`);
}));
function addNewHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const { status } = yield axios_1.default.get(`${process.env.URL_BACKEND}/new/history`, {
            params: { key: process.env.KEY },
        });
        if (status === 200) {
            return;
        }
        else {
            console.log("Error updating history");
        }
    });
}
function getUserEmails() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield post_1.User.find({}).select('email').exec();
        return users.map((user) => user.email).filter((email) => email !== null);
    });
}
function sendEmailsToUsers(matchingCoins) {
    return __awaiter(this, void 0, void 0, function* () {
        if (matchingCoins.length) {
            const userEmails = yield getUserEmails();
            console.log("Users Email", userEmails);
            let emailContent = '';
            for (const coin of matchingCoins) {
                const recentHistory = coin.history[0];
                const updatedAlertData = yield post_1.AlertData.findByIdAndUpdate(coin.alert_data._id, { date_sent: new Date().toISOString() }, { new: true });
                emailContent += `
        Coin: ${coin.name}
        Symbol: ${coin.symbol}
        Recent Price: ${recentHistory.price}
        Recent Volume (24h): ${recentHistory.valume_24h}
        ------------------------
      `;
            }
            console.log("Email Content", emailContent);
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });
            let mailOptions = {
                from: process.env.GMAIL_USER,
                to: userEmails.join(','),
                subject: 'Matching Coins Alert',
                text: `Here are the coins matching your alert criteria:\n\n${emailContent}`,
            };
            try {
                let info = yield transporter.sendMail(mailOptions);
                console.log("Email sent: " + info.response);
            }
            catch (error) {
                console.error("Error sending email:", error);
            }
        }
    });
}
function checkAndSendAlerts() {
    return __awaiter(this, void 0, void 0, function* () {
        const coins = yield post_1.Coins.find({ alert_data: { $ne: null } })
            .populate('alert_data') // Populate the alert_data field
            .populate({
            path: 'history',
            options: { sort: { date: -1 }, limit: 1 }
        })
            .exec();
        console.log("Coins", coins);
        try {
            const matchingCoins = coins.filter((coin) => {
                const recentHistory = coin.history[0];
                const alertData = coin.alert_data; // This is of type IAlertData | null
                if (alertData) {
                    return (new Date(alertData === null || alertData === void 0 ? void 0 : alertData.date_sent).toDateString() !== new Date().toDateString() &&
                        ((recentHistory === null || recentHistory === void 0 ? void 0 : recentHistory.price) >= parseFloat(alertData.price) || (recentHistory === null || recentHistory === void 0 ? void 0 : recentHistory.valume_24h) >= parseFloat(alertData.valume_24h)));
                }
                return false; // If alertData is null, return false
            });
            console.log(matchingCoins);
            yield sendEmailsToUsers(matchingCoins);
        }
        catch (error) {
            console.error("Error checking and sending alerts:", error);
        }
    });
}
setInterval(() => {
    addNewHistory();
    checkAndSendAlerts();
    console.log("Interval executed");
}, 60000);
//# sourceMappingURL=server.js.map