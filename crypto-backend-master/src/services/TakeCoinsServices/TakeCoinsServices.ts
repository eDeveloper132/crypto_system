import { Coins } from "../../../Schema/post"; // Adjust the import path based on your directory structure

export class TakeCoinsServices {
  async execute(start: number) {
    const numberStart = start * 25; // Adjust based on your pagination logic
    const numberTake = 250;

    const result = await Coins.find()
      .skip(numberStart) // Skip the specified number of documents
      .limit(numberTake) // Limit the result to the specified number
      .populate({
        path: 'history', // Populate the history field
        options: {
          sort: { date: -1 }, // Sort history by date in descending order
          limit: 1, // Limit to the most recent history entry
        },
      });

    return result;
  }
}
