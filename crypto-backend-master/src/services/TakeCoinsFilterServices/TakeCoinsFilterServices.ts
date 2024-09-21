import { Coins } from "../../../Schema/post"; // Adjust the import based on your directory structure

export default class TakeCoinsFilterServices {
  async execute(start: number) {
    const numberStart = start * 50; // Assuming each page shows 50 coins
    const numberTake = 50; // Adjusting to take only 50 coins per request

    const result = await Coins.find({})
      .sort({ name: 1 }) // Sort by name in ascending order
      .skip(numberStart) // Skip the number of coins based on the start parameter
      .limit(numberTake) // Limit the number of results
      .populate({
        path: 'history',
        options: {
          sort: { date: -1 }, // Sort history by date in descending order
          limit: 1, // Take only the latest history entry
        },
      })
      .populate('alert_data'); // Populate alert_data

    return { filter: result };
  }
}
