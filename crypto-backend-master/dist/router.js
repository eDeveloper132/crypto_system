"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _HistoryRegisterController = require('./controller/HistoryRegisterController.ts/HistoryRegisterController');
var _RegisterCoinController = require('./controller/RegisterCoinController/RegisterCoinController');
var _TakeCoinsController = require('./controller/TakeCoinsController/TakeCoinsController');
var _TakeCoinsFilterController = require('./controller/TakeCoinsFilterController/TakeCoinsFilterController');
var _TakeCoinSpecificController = require('./controller/TakeCoinSpecificController/TakeCoinSpecificController');
var _CreateUserController = require('./controller/CreateUserController/CreateUserController');
var _AuthenticatedUserController = require('./controller/AuthenticatedUserController/AuthenticatedUserController');
var _TakeFavoriteController = require('./controller/TakeFavoriteController/TakeFavoriteController');

var _AddToFavoriteController = require('./controller/AddToFavoriteController/AddToFavoriteController');
var _RemoveFavoriteController = require('./controller/RemoveFavoriteController/RemoveFavoriteController');
var _post = require('../Schema/post'); // Adjust the path as needed

const router = _express.Router.call(void 0, );

router.post('/alertform', async (req, res) => {
  const { price, valume_24h, coinsId } = req.body;
  if (!price || !coinsId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log({ price, valume_24h, coinsId });
  
  try {
    const newAlertData = await _post.AlertData.findOneAndUpdate(
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
router.post("/register/coin", new (0, _RegisterCoinController.RegisterCoinController)().handle);
router.get("/coin/take/all", new (0, _TakeCoinsController.TakeCoinsController)().handle);
router.get("/new/history", new (0, _HistoryRegisterController.HistoryRegisterController)().handle);
router.get("/coin/take/:id", new (0, _TakeCoinSpecificController.TakeCoinSpecificController)().handle);
router.get("/coin/filter/front", new (0, _TakeCoinsFilterController.TakeCoinsFilterController)().handle);
router.post("/create/user", new (0, _CreateUserController.CreateUserController)().handle);
router.post("/authenticated/user", new (0, _AuthenticatedUserController.AuthenticatedUserController)().handle);
router.post("/addtofavorite", new (0, _AddToFavoriteController.AddToFavoriteController)().handle);
router.get("/favorite/user", new (0, _TakeFavoriteController.TakeFavoriteController)().handle);
router.post("/removefavorite", new (0, _RemoveFavoriteController.RemoveFavoriteController)().handle);

exports.router = router;
