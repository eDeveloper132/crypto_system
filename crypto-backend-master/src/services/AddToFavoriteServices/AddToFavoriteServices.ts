import { Favorite, Coins } from "../../../Schema/post"; // Adjust the import based on your directory structure

interface AddToFavoriteProps {
  id_coin: string;
  user_id: string;
}

export class AddToFavoriteServices {
  async execute({ user_id, id_coin }: AddToFavoriteProps) {
    try {
      // Find the coin and add to favorite
      const coin = await Coins.findById(id_coin);
      if (!coin) {
        throw new Error("Coin not found");
      }

      // Assuming a Favorite can have multiple coins and a user
      const favorite = await Favorite.findOneAndUpdate(
        { user: user_id },
        { $addToSet: { coins: coin._id } }, // Adds the coin ID to the favorites array
        { new: true, upsert: true } // Create a new favorite if it doesn't exist
      );

      return favorite;
    } catch (e) {
      throw new Error("Oops, something went wrong");
    }
  }
}
