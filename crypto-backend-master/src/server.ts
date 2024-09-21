import express from "express";
import cors from "cors";
import { router } from "./router";
import axios from "axios";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import connection from '../DB/db';
import 'dotenv/config'
import { User, Coins, AlertData as AlertDataModel, ICoins, IAlertData } from '../Schema/post'; // Adjust the path as necessary

interface AlertData {
  _id: mongoose.Types.ObjectId;
  price: string;
  valume_24h: string;
  date_sent?: string;
}

interface IUser {
  email?: string;
}

const app = express();
app.use(cors());
app.use(express.urlencoded({ limit: "460mb", extended: true }));
app.use(express.json({ limit: "460mb" }));
connection();
app.use(router);

// Mongoose connection
mongoose.connect(process.env.DATABASE_URL, {
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
  const { status } = await axios.get(`${process.env.URL_BACKEND}/new/history`, {
    params: { key: process.env.KEY },
  });

  if (status === 200) {
    return;
  } else {
    console.log("Error updating history");
  }
}

async function getUserEmails() { 
  const users: IUser[] = await User.find({}).select('email').exec();
  return users.map((user) => user.email).filter((email) => email !== null) as string[]; 
}

async function sendEmailsToUsers(matchingCoins: any[]) {
  if (matchingCoins.length) {
    const userEmails = await getUserEmails();
    console.log("Users Email", userEmails);
    let emailContent = '';
    for (const coin of matchingCoins) {
      const recentHistory = coin.history[0];
      const updatedAlertData = await AlertDataModel.findByIdAndUpdate(
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

    let transporter = nodemailer.createTransport({
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
  const coins: (ICoins & { alert_data: IAlertData | null })[] = await Coins.find({ alert_data: { $ne: null } })
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
          new Date(alertData?.date_sent!).toDateString() !== new Date().toDateString() &&
          (recentHistory?.price >= parseFloat(alertData.price) || recentHistory?.valume_24h >= parseFloat(alertData.valume_24h))
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
