import { Coins } from "../../../Schema/post"; // Adjust the import path based on your directory structure

export class TakeCoinSpecificServices {
  async execute(id: number) {
    const coin = await Coins.findOne({ id_coin: id }) // Find the coin by id_coin
      .populate({
        path: 'history', // Populate the history field
        options: {
          sort: { date: -1 }, // Sort history by date in descending order
        },
      });

    if (coin) {
      return coin;
    } else {
      throw new Error("Coin does not exist");
    }
  }
}
