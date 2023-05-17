import appDataSource from "../../typeorm/database";
import { Activity } from "../../typeorm/entities/activity.entity";
import { Iactivity } from "../../types/activity.types";
import { EventEmitter } from "events";
import eventLogger from "../../utils/eventLogger.utils";

export const activityEmitter = new EventEmitter();

class fetchData {
  public static async fetchEventData(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const events: any[] = data.events;
      for (const event of events) {
        if (event.event.kind === "new-order") {
          const { contract, maker, validFrom, validUntil, createdAt } =
            event.order;
          const tokenId = event.order.criteria.data.token.tokenId;
          const price = event.order.price.amount.native;

          const isExist = await appDataSource
            .getRepository(Activity)
            .findOne({ where: { token_index: tokenId } });
          if (!isExist) {
            const activities: Iactivity = {
              contract_address: contract,
              token_index: Number(tokenId),
              listing_price: Number(price),
              maker: maker,
              listing_to: new Date(validUntil),
              listing_from: new Date(validFrom),
              event_timestamp: createdAt ? new Date(createdAt) : new Date(),
            };
            const activityDetails = appDataSource
              .getRepository(Activity)
              .create({
                ...activities,
              });
            const activity = await appDataSource
              .getRepository(Activity)
              .save(activityDetails);
            activityEmitter.emit("newActivity", activity);
          }
        }
      }
      if (data.continuation) {
        fetchData.fetchEventData(
          `https://api.reservoir.tools/events/asks/v3?limit=1000&continuation${data.continuation}`
        );
      }
    } catch (error: any) {
      eventLogger.logError(error)
    }
  }
}

export default fetchData;
