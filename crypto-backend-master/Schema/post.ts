import mongoose, { Schema, Document, Model } from 'mongoose';

// User Interface
interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email?: string;
  created_at: Date;
  favorite?: mongoose.Types.ObjectId;
}

// User Schema
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String },
  created_at: { type: Date, default: Date.now },
  favorite: { type: Schema.Types.ObjectId, ref: 'Favorite' }
}, { collection: 'users' });

// AlertData Interface
interface IAlertData extends Document {
  price: string;
  date_sent?: string;
  valume_24h: string;
  coinsId: number;
  coins: mongoose.Types.ObjectId;
}

// AlertData Schema
const alertDataSchema: Schema<IAlertData> = new Schema({
  price: { type: String, required: true },
  date_sent: { type: String },
  valume_24h: { type: String, required: true },
  coinsId: { type: Number, unique: true, required: true },
  coins: { type: Schema.Types.ObjectId, ref: 'Coins' }
}, { collection: 'alert_data' });

// Favorite Interface
interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  coins: mongoose.Types.ObjectId[];
}

// Favorite Schema
const favoriteSchema: Schema<IFavorite> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  coins: [{ type: Schema.Types.ObjectId, ref: 'Coins' }]
}, { collection: 'favorite' });

// Coins Interface
interface ICoins extends Document {
  id_coin: number;
  name: string;
  symbol: string;
  rank: number;
  history: IHistory[]; // This should be an array of IHistory
  alert_data: IAlertData | null; // Ensure this is the correct type
  favoriteId?: mongoose.Types.ObjectId;
}

// Coins Schema
const coinsSchema: Schema<ICoins> = new Schema({
  id_coin: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  symbol: { type: String, unique: true, required: true },
  rank: { type: Number, required: true },
  history: [{ type: Schema.Types.ObjectId, ref: 'History' }],
  alert_data: { type: Schema.Types.ObjectId, ref: 'AlertData' },
  favoriteId: { type: Schema.Types.ObjectId, ref: 'Favorite' }
}, { collection: 'coins' });

// History Interface
interface IHistory extends Document {
  price: number;
  valume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  date: Date;
  circulating_supply: number;
  total_supply: number;
  max_supply?: number;
  coinsId: number;
  coins: mongoose.Types.ObjectId;
}

// History Schema
const historySchema: Schema<IHistory> = new Schema({
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
  coins: { type: Schema.Types.ObjectId, ref: 'Coins' }
}, { collection: 'history' });

// Registering models
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
const AlertData: Model<IAlertData> = mongoose.model<IAlertData>('AlertData', alertDataSchema);
const Favorite: Model<IFavorite> = mongoose.model<IFavorite>('Favorite', favoriteSchema);
const Coins: Model<ICoins> = mongoose.model<ICoins>('Coins', coinsSchema);
const History: Model<IHistory> = mongoose.model<IHistory>('History', historySchema);

export {
  User,
  AlertData,
  Favorite,
  Coins,
  History,
  ICoins,
  IAlertData
};
