import { Router } from "express";
import { HistoryRegisterController } from "./controller/HistoryRegisterController.ts/HistoryRegisterController";
import { RegisterCoinController } from "./controller/RegisterCoinController/RegisterCoinController";
import { TakeCoinsController } from "./controller/TakeCoinsController/TakeCoinsController";
import { TakeCoinsFilterController } from "./controller/TakeCoinsFilterController/TakeCoinsFilterController";
import { TakeCoinSpecificController } from "./controller/TakeCoinSpecificController/TakeCoinSpecificController";
import { CreateUserController } from "./controller/CreateUserController/CreateUserController";
import { AuthenticatedUserController } from "./controller/AuthenticatedUserController/AuthenticatedUserController";
import { TakeFavoriteController } from "./controller/TakeFavoriteController/TakeFavoriteController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AddToFavoriteController } from "./controller/AddToFavoriteController/AddToFavoriteController";
import { RemoveFavoriteController } from "./controller/RemoveFavoriteController/RemoveFavoriteController";
import { AlertData, Coins } from '../Schema/post'; // Adjust the path as needed

const router = Router();

router.post('/alertform', async (req, res) => {
  const { price, valume_24h, coinsId } = req.body;
  if (!price || !coinsId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log({ price, valume_24h, coinsId });
  
  try {
    const newAlertData = await AlertData.findOneAndUpdate(
      { coins: coinsId }, // Assuming coins is an ObjectId
      { price, valume_24h },
      { new: true, upsert: true } // Create if it doesn't exist
    );

    res.status(201).json(newAlertData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Other routes remain unchanged
router.post("/register/coin", new RegisterCoinController().handle);
router.get("/coin/take/all", new TakeCoinsController().handle);
router.get("/new/history", new HistoryRegisterController().handle);
router.get("/coin/take/:id", new TakeCoinSpecificController().handle);
router.get("/coin/filter/front", new TakeCoinsFilterController().handle);
router.post("/create/user", new CreateUserController().handle);
router.post("/authenticated/user", new AuthenticatedUserController().handle);
router.post("/addtofavorite", new AddToFavoriteController().handle);
router.get("/favorite/user", new TakeFavoriteController().handle);
router.post("/removefavorite", new RemoveFavoriteController().handle);

export { router };
