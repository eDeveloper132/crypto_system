import { Coins } from "../../../Schema/post"; // Adjust the import based on your directory structure

interface CoinProps {
  name: string;
  symbol: string;
  id: number;
  rank: number;
}

interface ExecuteProps {
  data: CoinProps[];
}

export class RegisterCoinServices {
  async execute({ data }: ExecuteProps) {
    try {
      // Create multiple coins
      const response = await Coins.insertMany(
        data.map((element) => ({
          name: element.name,
          id_coin: element.id,
          symbol: element.symbol,
          rank: element.rank,
        }))
      );

      if (response.length > 0) {
        console.log("Coins successfully registered.");
      }

      return { success: true };
    } catch (error) {
      console.error("Error registering coins:", error);
      throw new Error("Failed to register coins.");
    }
  }
}
