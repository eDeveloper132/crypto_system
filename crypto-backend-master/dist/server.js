"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _router = require('./router');
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _db = require('../DB/db'); var _db2 = _interopRequireDefault(_db);
var _post = require('../Schema/post'); // Adjust the path as necessary












const app = _express2.default.call(void 0, );
app.use(_cors2.default.call(void 0, ));
app.use(_express2.default.urlencoded({ limit: "460mb", extended: true }));
app.use(_express2.default.json({ limit: "460mb" }));
_db2.default.call(void 0, );
app.use(_router.router);

// Mongoose connection
_mongoose2.default.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome To CryptoLab!');
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

async function addNewHistory() {
  const { status } = await _axios2.default.get(`${process.env.URL_BACKEND}/new/history`, {
    params: { key: process.env.KEY },
  });

  if (status === 200) {
    return;
  } else {
    console.log("Error updating history");
  }
}

async function getUserEmails() { 
  const users = await _post.User.find({}).select('email').exec();
  return users.map((user) => user.email).filter((email) => email !== null) ; 
}

async function sendEmailsToUsers(matchingCoins) {
  if (matchingCoins.length) {
    const userEmails = await getUserEmails();
    console.log("Users Email", userEmails);
    let emailContent = '';
    for (const coin of matchingCoins) {
      const recentHistory = coin.history[0];
      const updatedAlertData = await _post.AlertData.findByIdAndUpdate(
        coin.alert_data._id,
        { date_sent: new Date().toISOString() },
        { new: true }
      );

      emailContent += `
        Coin: ${coin.name}
        Symbol: ${coin.symbol}
        Recent Price: ${recentHistory.price}
        Recent Volume (24h): ${recentHistory.valume_24h}
        ------------------------
      `;
    }

    console.log("Email Content", emailContent);

    let transporter = _nodemailer2.default.createTransport({
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
      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

async function checkAndSendAlerts() {
  const coins = await _post.Coins.find({ alert_data: { $ne: null } })
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
        return (
          new Date(_optionalChain([alertData, 'optionalAccess', _ => _.date_sent])).toDateString() !== new Date().toDateString() &&
          (_optionalChain([recentHistory, 'optionalAccess', _2 => _2.price]) >= parseFloat(alertData.price) || _optionalChain([recentHistory, 'optionalAccess', _3 => _3.valume_24h]) >= parseFloat(alertData.valume_24h))
        );
        
      }
      return false; // If alertData is null, return false
    });

    console.log(matchingCoins);
    await sendEmailsToUsers(matchingCoins);
  } catch (error) {
    console.error("Error checking and sending alerts:", error);
  }
}


 

setInterval(() => {
  addNewHistory();
  checkAndSendAlerts();
  console.log("Interval executed");
}, 60000);
