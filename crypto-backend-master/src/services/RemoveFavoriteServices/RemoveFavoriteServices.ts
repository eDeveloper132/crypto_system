import { Favorite, Coins } from "../../../Schema/post"; // Adjust the import based on your directory structure

interface RemoveFavoriteProps {
  id_coin: string;
  user_id: string;
}

export class RemoveFavoriteServices {
  async execute({ user_id, id_coin }: RemoveFavoriteProps) {
    try {
      // Remove the coin from the user's favorites
      const result = await Favorite.findOneAndUpdate(
        { user: user_id }, // Find the user's favorite document
        { $pull: { coins: id_coin } }, // Remove the specific coin from the array
        { new: true } // Return the updated document
      );

      // Optionally, if you want to clear favoriteId in the Coins collection
      await Coins.updateOne(
        { id_coin }, // Assuming id_coin is unique
        { $set: { favoriteId: null } } // Clear favoriteId
      );

      return result; // Return the updated favorite document
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw new Error("Oops, something went wrong");
    }
  }
}
