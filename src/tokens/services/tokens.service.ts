import { IsNull } from "typeorm";
import { activityEmitter } from "../../activity/services/fetchData.service";
import appDataSource from "../../typeorm/database";
import { Activity } from "../../typeorm/entities/activity.entity";
import { Tokens } from "../../typeorm/entities/token.entity";

export const addToken = async () => {
  activityEmitter.on("newActivity", async (activity: Activity) => {
    const contract = activity.contract_address;
    const index = activity.token_index;
    const current_price = activity.listing_price;

    const token = await appDataSource
      .getRepository(Tokens)
      .findOne({ where: { index: index } });
    if (token) {
      const currentTime = new Date();
      if (activity.listing_to < currentTime) {
        token.current_price = null;
        await appDataSource.getRepository(Tokens).save(token);
      }
      const similarToken = await appDataSource
        .getRepository(Tokens)
        .findOne({ where: { index: index, contract_address: contract } });
      if (similarToken) {
        if (similarToken.current_price) {
          if (similarToken.current_price > current_price) {
            similarToken.current_price = current_price;
            await appDataSource.getRepository(Tokens).save(similarToken);
          }
        }
      }
    } else {
      const tokenDetails = appDataSource.getRepository(Tokens).create({
        index,
        contract_address: contract,
        current_price,
      });
      await appDataSource.getRepository(Tokens).save(tokenDetails);
    }
  });
};
