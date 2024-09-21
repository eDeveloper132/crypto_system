"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _post = require('../../../Schema/post'); // Adjust the import based on your directory structure





























 class HistoryRegisterServices {
  async execute({ data }) {
    // Clear existing history
    await _post.History.deleteMany();

    // Create new history records
    const createMany = await _post.History.insertMany(
      data.map((element) => ({
        coinsId: element.id,
        date: element.last_updated,
        circulating_supply: element.circulating_supply,
        total_supply: element.total_supply,
        max_supply: element.max_supply,
        price: element.quote.USD.price,
        valume_24h: element.quote.USD.volume_24h,
        volume_change_24h: element.quote.USD.volume_change_24h,
        percent_change_1h: element.quote.USD.percent_change_1h,
        percent_change_24h: element.quote.USD.percent_change_24h,
        percent_change_7d: element.quote.USD.percent_change_7d,
        percent_change_30d: element.quote.USD.percent_change_30d,
        percent_change_60d: element.quote.USD.percent_change_60d,
        percent_change_90d: element.quote.USD.percent_change_90d,
        market_cap: element.quote.USD.market_cap,
        market_cap_dominance: element.quote.USD.market_cap_dominance,
      }))
    );

    if (createMany.length > 0) {
      console.log("Records successfully created.");
    }
  }
} exports.HistoryRegisterServices = HistoryRegisterServices;
